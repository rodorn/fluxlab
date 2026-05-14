/**
 * Cinematic UI sound synthesis — WebAudio API.
 * Hans-Zimmer-inspired: sub-bass + detuned brass-pad + reverb tail.
 * Zero plików audio. Generuje na żywo w przeglądarce.
 *
 * Wszystko sandbox'owane na `typeof window !== "undefined"` żeby
 * SSR nie wybuchało.
 */

type SoundName = "hover" | "click" | "swell" | "success" | "reveal";

let ctx: AudioContext | null = null;
let masterGain: GainNode | null = null;
let reverbNode: ConvolverNode | null = null;
let reverbReady = false;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (ctx) return ctx;

  const Ctor =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext: typeof AudioContext })
      .webkitAudioContext;
  if (!Ctor) return null;

  ctx = new Ctor();
  masterGain = ctx.createGain();
  masterGain.gain.value = 0.25;
  masterGain.connect(ctx.destination);

  // Reverb — algorithmic impulse response (krótki "hall")
  reverbNode = ctx.createConvolver();
  const sampleRate = ctx.sampleRate;
  const length = sampleRate * 1.5; // 1.5s tail
  const impulse = ctx.createBuffer(2, length, sampleRate);
  for (let ch = 0; ch < 2; ch++) {
    const data = impulse.getChannelData(ch);
    for (let i = 0; i < length; i++) {
      // Exponential decay z lekkim szumem (room-like)
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, 2.5);
    }
  }
  reverbNode.buffer = impulse;
  reverbReady = true;

  const reverbGain = ctx.createGain();
  reverbGain.gain.value = 0.35;
  reverbNode.connect(reverbGain);
  reverbGain.connect(masterGain);

  return ctx;
}

function resumeIfSuspended(): void {
  if (ctx && ctx.state === "suspended") {
    void ctx.resume();
  }
}

/** ADSR envelope helper */
function envelope(
  gain: GainNode,
  audioCtx: AudioContext,
  attack: number,
  decay: number,
  sustainLevel: number,
  sustainDuration: number,
  release: number,
  peak = 1,
): number {
  const now = audioCtx.currentTime;
  gain.gain.cancelScheduledValues(now);
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(peak, now + attack);
  gain.gain.exponentialRampToValueAtTime(
    Math.max(0.0001, sustainLevel),
    now + attack + decay,
  );
  const releaseStart = now + attack + decay + sustainDuration;
  gain.gain.setValueAtTime(Math.max(0.0001, sustainLevel), releaseStart);
  gain.gain.exponentialRampToValueAtTime(0.0001, releaseStart + release);
  return releaseStart + release;
}

function connectThroughReverb(node: AudioNode, dryLevel = 0.7): void {
  if (!ctx || !masterGain) return;
  const dry = ctx.createGain();
  dry.gain.value = dryLevel;
  node.connect(dry);
  dry.connect(masterGain);
  if (reverbReady && reverbNode) {
    const wet = ctx.createGain();
    wet.gain.value = 1 - dryLevel;
    node.connect(wet);
    wet.connect(reverbNode);
  }
}

/** Hover — krótki rising whoosh (~250ms) */
function playHover(audioCtx: AudioContext): void {
  const osc = audioCtx.createOscillator();
  osc.type = "sine";
  const now = audioCtx.currentTime;
  osc.frequency.setValueAtTime(440, now);
  osc.frequency.exponentialRampToValueAtTime(880, now + 0.18);

  const filter = audioCtx.createBiquadFilter();
  filter.type = "highpass";
  filter.frequency.value = 300;

  const gain = audioCtx.createGain();
  osc.connect(filter);
  filter.connect(gain);
  connectThroughReverb(gain, 0.85);

  const end = envelope(gain, audioCtx, 0.005, 0.08, 0.001, 0, 0.18, 0.22);
  osc.start(now);
  osc.stop(end + 0.1);
}

/** Click — short percussive thump (~150ms) */
function playClick(audioCtx: AudioContext): void {
  const osc = audioCtx.createOscillator();
  osc.type = "triangle";
  const now = audioCtx.currentTime;
  osc.frequency.setValueAtTime(620, now);
  osc.frequency.exponentialRampToValueAtTime(180, now + 0.12);

  const gain = audioCtx.createGain();
  osc.connect(gain);
  connectThroughReverb(gain, 0.9);

  const end = envelope(gain, audioCtx, 0.002, 0.03, 0.001, 0, 0.1, 0.35);
  osc.start(now);
  osc.stop(end + 0.1);
}

/** Swell — cinematic rise, sub-bass + brass-pad (~600ms) */
function playSwell(audioCtx: AudioContext): void {
  const now = audioCtx.currentTime;

  // Sub-bass — 55Hz sine
  const sub = audioCtx.createOscillator();
  sub.type = "sine";
  sub.frequency.value = 55;
  const subGain = audioCtx.createGain();
  sub.connect(subGain);
  connectThroughReverb(subGain, 0.8);
  envelope(subGain, audioCtx, 0.08, 0.1, 0.4, 0.2, 0.35, 0.45);
  sub.start(now);
  sub.stop(now + 1.0);

  // Brass-pad — 3 detuned sawtooth na C3, E3, G3
  const notes = [130.81, 164.81, 196.0]; // C3, E3, G3
  notes.forEach((freq, i) => {
    const osc1 = audioCtx.createOscillator();
    const osc2 = audioCtx.createOscillator();
    osc1.type = "sawtooth";
    osc2.type = "sawtooth";
    osc1.frequency.value = freq;
    osc2.frequency.value = freq * 1.005; // lekki detune

    const filter = audioCtx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 800;
    filter.Q.value = 1;

    const gain = audioCtx.createGain();
    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    connectThroughReverb(gain, 0.55);

    envelope(gain, audioCtx, 0.12 + i * 0.02, 0.18, 0.15, 0.25, 0.4, 0.18);
    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 1.2);
    osc2.stop(now + 1.2);
  });
}

/** Success — major chord triumph (~1.5s), C major + sub-bass */
function playSuccess(audioCtx: AudioContext): void {
  const now = audioCtx.currentTime;

  // Sub-bass
  const sub = audioCtx.createOscillator();
  sub.type = "sine";
  sub.frequency.value = 65.41; // C2
  const subGain = audioCtx.createGain();
  sub.connect(subGain);
  connectThroughReverb(subGain, 0.7);
  envelope(subGain, audioCtx, 0.05, 0.15, 0.5, 0.6, 0.5, 0.5);
  sub.start(now);
  sub.stop(now + 1.8);

  // Major chord — C, E, G, C oktawa wyżej
  const notes = [261.63, 329.63, 392.0, 523.25];
  notes.forEach((freq, i) => {
    const osc1 = audioCtx.createOscillator();
    const osc2 = audioCtx.createOscillator();
    osc1.type = "sawtooth";
    osc2.type = "triangle";
    osc1.frequency.value = freq;
    osc2.frequency.value = freq * 1.003;

    const filter = audioCtx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 1500;
    filter.Q.value = 0.8;

    const gain = audioCtx.createGain();
    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    connectThroughReverb(gain, 0.45);

    envelope(gain, audioCtx, 0.05 + i * 0.03, 0.2, 0.18, 0.6, 0.5, 0.12);
    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 1.8);
    osc2.stop(now + 1.8);
  });
}

/** Reveal — ambient pad fade-in (~1.5s) */
function playReveal(audioCtx: AudioContext): void {
  const now = audioCtx.currentTime;

  const notes = [110, 165, 220]; // A2, E3, A3 — sparse pad
  notes.forEach((freq, i) => {
    const osc = audioCtx.createOscillator();
    osc.type = "sine";
    osc.frequency.value = freq * (1 + (Math.random() - 0.5) * 0.002);

    const filter = audioCtx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(400, now);
    filter.frequency.exponentialRampToValueAtTime(1200, now + 0.6);

    const gain = audioCtx.createGain();
    osc.connect(filter);
    filter.connect(gain);
    connectThroughReverb(gain, 0.35);

    envelope(gain, audioCtx, 0.3 + i * 0.05, 0.4, 0.15, 0.5, 0.6, 0.1);
    osc.start(now);
    osc.stop(now + 2.0);
  });
}

/**
 * Główne API — wywoływane przez useSound hook.
 * Sprawdza visibility + enabled flag (sterowane przez SoundProvider).
 */
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
