/**
 * Cinematic UI sounds — WebAudio synthesis, layered & widened.
 * Hans-Zimmer-inspired: sub-bass + detuned brass-pad stack + noise transient
 * + algorithmic reverb + master compression.
 */

type SoundName = "hover" | "click" | "swell" | "success" | "reveal";

let ctx: AudioContext | null = null;
let masterGain: GainNode | null = null;
let masterComp: DynamicsCompressorNode | null = null;
let reverbNode: ConvolverNode | null = null;
let reverbReady = false;
let lastHoverTime = 0;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (ctx) return ctx;

  const Ctor =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext: typeof AudioContext })
      .webkitAudioContext;
  if (!Ctor) return null;

  ctx = new Ctor();

  // Master compressor — przytrzymuje peaki, brzmi "produkcyjnie"
  masterComp = ctx.createDynamicsCompressor();
  masterComp.threshold.value = -18;
  masterComp.knee.value = 12;
  masterComp.ratio.value = 4;
  masterComp.attack.value = 0.005;
  masterComp.release.value = 0.15;

  masterGain = ctx.createGain();
  masterGain.gain.value = 0.4;

  masterComp.connect(masterGain);
  masterGain.connect(ctx.destination);

  // Reverb — algorithmic IR (room-like, długi tail)
  reverbNode = ctx.createConvolver();
  const sampleRate = ctx.sampleRate;
  const length = sampleRate * 2.5; // 2.5s tail
  const impulse = ctx.createBuffer(2, length, sampleRate);
  for (let ch = 0; ch < 2; ch++) {
    const data = impulse.getChannelData(ch);
    for (let i = 0; i < length; i++) {
      const t = i / length;
      // Dense early reflections + exponential decay
      const early = Math.random() * 2 - 1;
      const decay = Math.pow(1 - t, 3.2);
      // Stereo decorrelation
      data[i] = early * decay * (ch === 0 ? 1 : 0.92);
    }
  }
  reverbNode.buffer = impulse;
  reverbReady = true;

  const reverbGain = ctx.createGain();
  reverbGain.gain.value = 0.55;
  reverbNode.connect(reverbGain);
  reverbGain.connect(masterComp);

  return ctx;
}

function resumeIfSuspended(): void {
  if (ctx && ctx.state === "suspended") {
    void ctx.resume();
  }
}

function connectThroughReverb(
  node: AudioNode,
  dryLevel: number,
  pan = 0,
): void {
  if (!ctx || !masterComp) return;
  const panner = ctx.createStereoPanner();
  panner.pan.value = pan;
  node.connect(panner);

  const dry = ctx.createGain();
  dry.gain.value = dryLevel;
  panner.connect(dry);
  dry.connect(masterComp);

  if (reverbReady && reverbNode) {
    const wet = ctx.createGain();
    wet.gain.value = 1 - dryLevel;
    panner.connect(wet);
    wet.connect(reverbNode);
  }
}

/** ADSR helper */
function adsr(
  gain: GainNode,
  audioCtx: AudioContext,
  a: number,
  d: number,
  s: number,
  hold: number,
  r: number,
  peak: number,
): number {
  const now = audioCtx.currentTime;
  gain.gain.cancelScheduledValues(now);
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(Math.max(0.0001, peak), now + a);
  gain.gain.exponentialRampToValueAtTime(
    Math.max(0.0001, peak * s),
    now + a + d,
  );
  const releaseStart = now + a + d + hold;
  gain.gain.setValueAtTime(Math.max(0.0001, peak * s), releaseStart);
  gain.gain.exponentialRampToValueAtTime(0.0001, releaseStart + r);
  return releaseStart + r;
}

/** Noise transient — biały szum z high-pass filter dla "riser/swoosh" */
function noiseBurst(
  audioCtx: AudioContext,
  duration: number,
  filterStartFreq: number,
  filterEndFreq: number,
  level: number,
  pan = 0,
): void {
  const bufferSize = audioCtx.sampleRate * duration;
  const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  const source = audioCtx.createBufferSource();
  source.buffer = buffer;

  const filter = audioCtx.createBiquadFilter();
  filter.type = "bandpass";
  filter.Q.value = 0.7;
  const now = audioCtx.currentTime;
  filter.frequency.setValueAtTime(filterStartFreq, now);
  filter.frequency.exponentialRampToValueAtTime(filterEndFreq, now + duration);

  const gain = audioCtx.createGain();
  source.connect(filter);
  filter.connect(gain);
  connectThroughReverb(gain, 0.55, pan);

  adsr(
    gain,
    audioCtx,
    0.01,
    duration * 0.3,
    0.4,
    duration * 0.4,
    duration * 0.3,
    level,
  );
  source.start(now);
  source.stop(now + duration + 0.1);
}

/** Single detuned voice — 2× oscillators + lowpass + gain */
function detunedVoice(
  audioCtx: AudioContext,
  freq: number,
  type: OscillatorType,
  filterFreq: number,
  filterQ: number,
  detuneCents: number,
  pan: number,
  envelopeFn: (gain: GainNode) => void,
  duration: number,
): void {
  const osc1 = audioCtx.createOscillator();
  const osc2 = audioCtx.createOscillator();
  osc1.type = type;
  osc2.type = type;
  osc1.frequency.value = freq;
  osc2.frequency.value = freq;
  osc1.detune.value = -detuneCents;
  osc2.detune.value = detuneCents;

  const filter = audioCtx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = filterFreq;
  filter.Q.value = filterQ;

  const gain = audioCtx.createGain();
  osc1.connect(filter);
  osc2.connect(filter);
  filter.connect(gain);
  connectThroughReverb(gain, 0.5, pan);

  envelopeFn(gain);
  const now = audioCtx.currentTime;
  osc1.start(now);
  osc2.start(now);
  osc1.stop(now + duration);
  osc2.stop(now + duration);
}

/** Hover — krótki shimmer + noise sparkle (~280ms) */
function playHover(audioCtx: AudioContext): void {
  // Throttle hover — max raz na 120ms (kursor po liście kart nie zalewa)
  const now = performance.now();
  if (now - lastHoverTime < 120) return;
  lastHoverTime = now;

  // High shimmer tone — short sine sweep
  const osc = audioCtx.createOscillator();
  osc.type = "sine";
  const t0 = audioCtx.currentTime;
  osc.frequency.setValueAtTime(880, t0);
  osc.frequency.exponentialRampToValueAtTime(1760, t0 + 0.2);

  const gain = audioCtx.createGain();
  osc.connect(gain);
  connectThroughReverb(gain, 0.5, -0.15);
  adsr(gain, audioCtx, 0.005, 0.05, 0.35, 0.08, 0.18, 0.2);
  osc.start(t0);
  osc.stop(t0 + 0.4);

  // Subtle noise sparkle
  noiseBurst(audioCtx, 0.25, 4000, 12000, 0.06, 0.15);
}

/** Click — punchy thump z body (~200ms) */
function playClick(audioCtx: AudioContext): void {
  const t0 = audioCtx.currentTime;

  // Low body
  const body = audioCtx.createOscillator();
  body.type = "triangle";
  body.frequency.setValueAtTime(180, t0);
  body.frequency.exponentialRampToValueAtTime(60, t0 + 0.14);
  const bodyGain = audioCtx.createGain();
  body.connect(bodyGain);
  connectThroughReverb(bodyGain, 0.75);
  adsr(bodyGain, audioCtx, 0.002, 0.04, 0.001, 0, 0.12, 0.45);
  body.start(t0);
  body.stop(t0 + 0.3);

  // High click attack
  const click = audioCtx.createOscillator();
  click.type = "square";
  click.frequency.value = 1200;
  const clickGain = audioCtx.createGain();
  click.connect(clickGain);
  connectThroughReverb(clickGain, 0.85);
  adsr(clickGain, audioCtx, 0.001, 0.02, 0.001, 0, 0.04, 0.18);
  click.start(t0);
  click.stop(t0 + 0.1);

  // Transient noise (snap)
  noiseBurst(audioCtx, 0.06, 2000, 6000, 0.12);
}

/** Swell — cinematic rise: sub + brass-pad layered + noise riser (~900ms) */
function playSwell(audioCtx: AudioContext): void {
  const t0 = audioCtx.currentTime;

  // SUB-BASS (2 oktawy) — 41Hz + 82Hz
  detunedVoice(
    audioCtx,
    41.2,
    "sine",
    400,
    1,
    0,
    0,
    (g) => adsr(g, audioCtx, 0.1, 0.15, 0.5, 0.3, 0.5, 0.55),
    1.5,
  );
  detunedVoice(
    audioCtx,
    82.4,
    "sine",
    400,
    1,
    0,
    0,
    (g) => adsr(g, audioCtx, 0.12, 0.15, 0.4, 0.3, 0.5, 0.35),
    1.5,
  );

  // BRASS-PAD STACK — C minor (C3, Eb3, G3) — bardziej cinematic niż major
  const notes = [
    { freq: 130.81, pan: -0.3 }, // C3
    { freq: 155.56, pan: 0 }, // Eb3
    { freq: 196.0, pan: 0.3 }, // G3
  ];
  notes.forEach(({ freq, pan }, i) => {
    detunedVoice(
      audioCtx,
      freq,
      "sawtooth",
      900 + i * 200,
      1.4,
      8,
      pan,
      (g) => adsr(g, audioCtx, 0.15 + i * 0.03, 0.18, 0.18, 0.35, 0.5, 0.16),
      1.6,
    );
    // Oktawa wyżej — cieńsza warstwa
    detunedVoice(
      audioCtx,
      freq * 2,
      "triangle",
      2200,
      0.8,
      4,
      pan,
      (g) => adsr(g, audioCtx, 0.2 + i * 0.04, 0.2, 0.12, 0.35, 0.45, 0.08),
      1.6,
    );
  });

  // NOISE RISER — sweep z bandpass dla "rising" feel
  noiseBurst(audioCtx, 0.5, 300, 4000, 0.08, 0);

  void t0;
}

/** Success — cinematic resolve, C major dur (~1.8s) */
function playSuccess(audioCtx: AudioContext): void {
  const t0 = audioCtx.currentTime;

  // SUB-BASS 2 oktawy
  detunedVoice(
    audioCtx,
    32.7, // C1
    "sine",
    400,
    1,
    0,
    0,
    (g) => adsr(g, audioCtx, 0.05, 0.2, 0.55, 0.8, 0.6, 0.6),
    2.2,
  );
  detunedVoice(
    audioCtx,
    65.41, // C2
    "sine",
    400,
    1,
    0,
    0,
    (g) => adsr(g, audioCtx, 0.06, 0.2, 0.45, 0.8, 0.6, 0.4),
    2.2,
  );

  // MAJOR CHORD STACK — C, E, G, C oktawa wyżej (4 nuty staggered)
  const notes = [
    { freq: 261.63, pan: -0.35 }, // C4
    { freq: 329.63, pan: -0.12 }, // E4
    { freq: 392.0, pan: 0.12 }, // G4
    { freq: 523.25, pan: 0.35 }, // C5
  ];
  notes.forEach(({ freq, pan }, i) => {
    // Saw layer — body
    detunedVoice(
      audioCtx,
      freq,
      "sawtooth",
      1500,
      0.9,
      6,
      pan,
      (g) => adsr(g, audioCtx, 0.05 + i * 0.04, 0.25, 0.22, 0.85, 0.6, 0.13),
      2.4,
    );
    // Triangle layer — sweetness
    detunedVoice(
      audioCtx,
      freq,
      "triangle",
      3000,
      0.5,
      3,
      pan,
      (g) => adsr(g, audioCtx, 0.07 + i * 0.05, 0.3, 0.18, 0.85, 0.55, 0.1),
      2.4,
    );
  });

  // Cymbal-like high noise dla brilliance
  noiseBurst(audioCtx, 0.8, 4000, 8000, 0.05, 0);

  void t0;
}

/** Reveal — ambient pad fade-in (~2s) */
function playReveal(audioCtx: AudioContext): void {
  const notes = [
    { freq: 110, pan: -0.4 }, // A2
    { freq: 164.81, pan: 0 }, // E3
    { freq: 220, pan: 0.4 }, // A3
  ];
  notes.forEach(({ freq, pan }, i) => {
    detunedVoice(
      audioCtx,
      freq,
      "sine",
      1200,
      0.6,
      5,
      pan,
      (g) => adsr(g, audioCtx, 0.35 + i * 0.08, 0.4, 0.18, 0.6, 0.7, 0.12),
      2.5,
    );
  });
}

export function playSound(name: SoundName): void {
  if (typeof window === "undefined") return;
  if (
    typeof document !== "undefined" &&
    document.visibilityState !== "visible"
  ) {
    return;
  }
  const audioCtx = getCtx();
  if (!audioCtx) return;
  resumeIfSuspended();

  switch (name) {
    case "hover":
      playHover(audioCtx);
      break;
    case "click":
      playClick(audioCtx);
      break;
    case "swell":
      playSwell(audioCtx);
      break;
    case "success":
      playSuccess(audioCtx);
      break;
    case "reveal":
      playReveal(audioCtx);
      break;
  }
}

export type { SoundName };
