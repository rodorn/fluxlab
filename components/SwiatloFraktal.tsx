"use client";

import { useEffect, useRef } from "react";

const VS = "attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}";

const FS = `precision mediump float;
uniform vec2 r;uniform float t;uniform vec2 m;uniform float d;uniform float w;
float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);
return mix(mix(h(i),h(i+vec2(1.,0.)),f.x),mix(h(i+vec2(0.,1.)),h(i+1.),f.x),f.y);}
float fbm(vec2 p){float v=0.,a=.5;mat2 R=mat2(.8,.6,-.6,.8);
for(int i=0;i<5;i++){v+=a*n(p);p=R*p*2.03;a*=.5;}return v;}
void main(){
vec2 p=(gl_FragCoord.xy-.5*r)/r.y*1.7;
float T=t*.035;
vec2 q=vec2(fbm(p+vec2(0.,T)),fbm(p+vec2(5.2,1.3)-T));
vec2 s=vec2(fbm(p+3.2*q+vec2(1.7,9.2)+T*1.4),fbm(p+3.2*q+vec2(8.3,2.8)-T*.8));
float f=fbm(p+3.4*s);
vec2 mp=(m-.5*r)/r.y*1.7;
float l=exp(-2.6*dot(p-mp,p-mp));
vec3 fio=vec3(.42,.33,.96),ind=vec3(.27,.31,.86),cyj=vec3(.16,.72,.93);
vec3 c=mix(ind,fio,clamp(length(q)*1.1,0.,1.));
c=mix(c,cyj,clamp(s.y*s.y*1.6-.15,0.,1.));
float a=smoothstep(.3,.95,f*f*1.7+.25*length(s));
float zyla=pow(1.-abs(f-.62)*5.,8.)*step(abs(f-.62),.2);
c=mix(c,vec3(.1,.06,.4),w*.55);c=mix(c,vec3(1.),zyla*(.45-w*.25));
a=a*(.7+.5*l)+zyla*.25;
float g=mix(mix(.3,.42,d),.34,w);
gl_FragColor=vec4(c*a*g,a*g);
}`;

type Odcien = "hero" | "zasada";

export default function SwiatloFraktal({
  odcien = "hero",
  className = "",
}: {
  odcien?: Odcien;
  className?: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const gl = cv.getContext("webgl", {
      alpha: true,
      antialias: false,
      depth: false,
      powerPreference: "low-power",
    });
    if (!gl) return;

    const sh = (typ: number, src: string) => {
      const s = gl.createShader(typ)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const pr = gl.createProgram()!;
    gl.attachShader(pr, sh(gl.VERTEX_SHADER, VS));
    gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, FS));
    gl.linkProgram(pr);
    if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) return;
    gl.useProgram(pr);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW,
    );
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    const u = (k: string) => gl.getUniformLocation(pr, k);
    const uR = u("r"),
      uT = u("t"),
      uM = u("m"),
      uD = u("d"),
      uW = u("w");
    gl.uniform1f(uW, odcien === "zasada" ? 1 : 0);

    const skala = 0.4;
    const spokoj = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const kursor = matchMedia("(pointer: fine)").matches && !spokoj;
    const html = document.documentElement;
    let ciemny = html.classList.contains("dark") ? 1 : 0;
    const mysz = { x: 0.62, y: 0.42, cx: 0.62, cy: 0.42 };
    let widoczny = false,
      raf = 0,
      ost = 0;
    const t0 = performance.now() - 30000;

    const rozmiar = () => {
      const b = cv.getBoundingClientRect();
      cv.width = Math.max(1, Math.round(b.width * skala));
      cv.height = Math.max(1, Math.round(b.height * skala));
      gl.viewport(0, 0, cv.width, cv.height);
    };

    const rysuj = (teraz: number) => {
      mysz.cx += (mysz.x - mysz.cx) * 0.04;
      mysz.cy += (mysz.y - mysz.cy) * 0.04;
      gl.uniform2f(uR, cv.width, cv.height);
      gl.uniform1f(uT, spokoj ? 40 : (teraz - t0) / 1000);
      gl.uniform2f(uM, mysz.cx * cv.width, (1 - mysz.cy) * cv.height);
      gl.uniform1f(uD, ciemny);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const petla = (teraz: number) => {
      raf = requestAnimationFrame(petla);
      if (teraz - ost < 33) return;
      ost = teraz;
      rysuj(teraz);
    };
    const start = () => {
      if (spokoj) return rysuj(performance.now());
      if (!raf && widoczny && !document.hidden)
        raf = requestAnimationFrame(petla);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    rozmiar();
    const ro = new ResizeObserver(() => {
      rozmiar();
      rysuj(performance.now());
    });
    ro.observe(cv);
    const io = new IntersectionObserver(([e]) => {
      widoczny = e.isIntersecting;
      if (widoczny) start();
      else stop();
    });
    io.observe(cv);
    const mo = new MutationObserver(() => {
      ciemny = html.classList.contains("dark") ? 1 : 0;
      rysuj(performance.now());
    });
    mo.observe(html, { attributes: true, attributeFilter: ["class"] });
    const wid = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", wid);
    const ruch = (e: PointerEvent) => {
      const b = cv.getBoundingClientRect();
      mysz.x = (e.clientX - b.left) / b.width;
      mysz.y = (e.clientY - b.top) / b.height;
    };
    if (kursor) addEventListener("pointermove", ruch, { passive: true });

    rysuj(performance.now());
    cv.dataset.gotowe = "";

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      mo.disconnect();
      document.removeEventListener("visibilitychange", wid);
      removeEventListener("pointermove", ruch);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [odcien]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className={`swiatlo-fraktal pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}
