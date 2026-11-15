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

const FS_NOC = `#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform vec2 r;uniform float t;uniform vec2 m;uniform float w;uniform float s;uniform float zi;
float h(vec2 p){vec3 q=fract(vec3(p.xyx)*.1031);q+=dot(q,q.yzx+33.33);return fract((q.x+q.y)*q.z);}
float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);
return mix(mix(h(i),h(i+vec2(1.,0.)),f.x),mix(h(i+vec2(0.,1.)),h(i+1.),f.x),f.y);}
float fbm(vec2 p){float v=0.,a=.5;mat2 R=mat2(.8,.6,-.6,.8);
for(int i=0;i<4;i++){v+=a*n(p);p=R*p*2.03;a*=.5;}return v;}
vec3 gwiazdy(vec2 px,float gest,float ziarno){
vec3 c=vec3(0.);
vec2 par=(m-.5*r)/s;
for(int k=0;k<3;k++){
float fk=float(k),sz=24.+fk*20.;
vec2 g=(px+par*(.008+fk*.012))/sz+fk*31.7+ziarno;
vec2 id=floor(g),f=fract(g);
float hv=h(id);
float jest=step(1.-gest*(.18+.07*fk),hv);
vec2 o=.2+.6*vec2(h(id+3.7),h(id+9.1));
float dd=length(f-o)*sz;
float rad=.45+fk*.3+h(id+5.3)*.6;
float tw=.55+.45*sin(t*(.6+2.2*h(id+1.9))+hv*60.);
float b=jest*tw*(smoothstep(rad+1.,0.,dd)+.22*exp(-dd*.4));
c+=mix(vec3(.72,.8,1.),vec3(1.,.9,.78),h(id+7.3))*b*(.5+.25*fk);
}
return c;}
vec4 galaktyka(vec2 fc){
float sz=clamp((r.x/s-640.)/600.,0.,1.);
float R=mix(r.x*.78,min(r.x*.36,r.y*.66),sz);
vec2 C=vec2(r.x*mix(.84,.84,sz),r.y*mix(.83,.52,sz))+(m-.5*r)*.015;
vec2 q=(fc-C)/R;
float a0=-.42;q=mat2(cos(a0),sin(a0),-sin(a0),cos(a0))*q;q.y/=.42;
float rr=length(q),th=atan(q.y,q.x),ob=t*.05,lg=log(rr+.001)*4.2;
float ram=pow(.5+.5*sin(2.*(th-ob)+lg),2.5);
float ca=cos(ob),sa=sin(ob);
vec2 qr=mat2(ca,-sa,sa,ca)*q;
float pl=fbm(qr*3.6+7.);
float dysk=exp(-rr*2.6)*smoothstep(1.3,.55,rr);
float jadro=exp(-rr*rr*24.);
float pas=pow(.5+.5*sin(2.*(th-ob)+lg-.9),10.)*smoothstep(.08,.35,rr);
float j=dysk*(.2+1.0*ram)*(.5+.9*pl)*(1.-.55*pas)+jadro*.75;
vec3 kol=mix(vec3(.47,.42,1.),vec3(.36,.82,1.),clamp(rr*1.3*pl,0.,1.));
kol=mix(kol,vec3(.92,.88,.86),clamp(jadro*1.1+exp(-rr*7.)*.3,0.,1.));
vec2 g=qr*R/(s*6.),id=floor(g),f=fract(g)-.5;
vec2 o=(vec2(h(id+2.1),h(id+8.3))-.5)*.6;
vec2 dq=mat2(ca,sa,-sa,ca)*((f-o)*6.*s/R);
float dpx=length(vec2(dq.x,dq.y*.42))*R/s;
float pg=clamp(j*1.5,0.,1.);
float gw=step(1.-pg*.4,h(id+4.4))*smoothstep(1.4,0.,dpx)*(.6+.4*sin(t*1.7+h(id)*50.));
float al=clamp(j*.4+gw*.55,0.,1.);
return vec4(kol*j*.4+vec3(.95,.96,1.)*gw*.55,al);}
vec3 lot(vec2 uv){
vec3 c=vec3(0.);
for(int i=0;i<5;i++){
float fi=float(i);
float z=fract(fi*.2+t*.0045);
float sc=mix(30.,1.4,z*z);
float zn=smoothstep(0.,.4,z)*smoothstep(1.,.8,z);
vec2 g=uv*sc+fi*17.3;
vec2 id=floor(g),f=fract(g)-.5;
float jest=step(.8,h(id+fi*3.1));
vec2 o=(vec2(h(id+1.3),h(id+4.7))-.5)*.7;
float dpx=length(f-o)*r.y/(sc*s);
float rad=.5+1.3*z;
c+=mix(vec3(.75,.82,1.),vec3(1.,.93,.84),h(id+6.1))*jest*zn*smoothstep(rad+.9,0.,dpx)*.55;
}
return c;}
void main(){
vec2 fc=gl_FragCoord.xy,px=fc/s;
vec3 c=gwiazdy(px,.8,zi*97.)*.8+lot((fc-.5*r)/r.y+zi*3.);
float al=clamp(max(c.r,max(c.g,c.b)),0.,1.);
if(w<.5){vec4 g=galaktyka(fc);c=c*(1.-g.a)+g.rgb;al=al*(1.-g.a)+g.a;}
else if(w>1.5){
vec2 uv=(fc-.5*r)/r.y;
float mg=fbm(uv*2.2+zi*7.3+vec2(t*.006,0.));
float ob=smoothstep(.45,.95,mg)*smoothstep(1.2,.1,length(uv-vec2(.35*cos(zi*6.28),.1)));
vec3 ton=.6+.4*cos(6.28*(zi+vec3(0.,.33,.67)));
c+=mix(vec3(.55,.6,.9),ton,.5)*ob*.1;
float zan=smoothstep(.0,.55,fc.y/r.y);
c*=zan*.75;al=clamp(max(c.r,max(c.g,c.b)),0.,1.);
}
else{
vec2 uv=(fc-.5*r)/r.y;
float dl=dot(uv,normalize(vec2(.45,1.)))+.08*sin(uv.x*2.3+1.);
float pl=fbm(uv*3.+vec2(t*.012,0.));
float pas=exp(-dl*dl*16.)*(.35+.9*pl);
c+=gwiazdy(px,pas*1.6,57.)*.6;
vec3 mg=mix(vec3(.85,.85,1.),vec3(.6,.85,1.),pl)*pas*.09;
c+=mg;al=clamp(max(al,max(c.r,max(c.g,c.b))),0.,1.);
}
c=min(c,vec3(al));
gl_FragColor=vec4(c,al);
}`;

type Odcien = "hero" | "zasada" | "podstrona";

export default function SwiatloFraktal({
  odcien = "hero",
  className = "",
  ziarno = 0,
}: {
  odcien?: Odcien;
  className?: string;
  ziarno?: number;
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
    const program = (fs: string) => {
      const pr = gl.createProgram()!;
      gl.attachShader(pr, sh(gl.VERTEX_SHADER, VS));
      gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, fs));
      gl.bindAttribLocation(pr, 0, "a");
      gl.linkProgram(pr);
      return gl.getProgramParameter(pr, gl.LINK_STATUS) ? pr : null;
    };
    const pJasny = program(FS);
    const pNoc = program(FS_NOC);
    if (!pJasny) return;
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW,
    );
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    let uR: WebGLUniformLocation | null = null,
      uT: WebGLUniformLocation | null = null,
      uM: WebGLUniformLocation | null = null,
      uD: WebGLUniformLocation | null = null,
      uS: WebGLUniformLocation | null = null;
    const noc = () => ciemny === 1 && pNoc !== null;
    const uzyj = () => {
      const pr = noc() ? pNoc! : pJasny;
      gl.useProgram(pr);
      const u = (k: string) => gl.getUniformLocation(pr, k);
      uR = u("r");
      uT = u("t");
      uM = u("m");
      uD = u("d");
      uS = u("s");
      gl.uniform1f(u("w"), odcien === "zasada" ? 1 : odcien === "podstrona" ? 2 : 0);
      gl.uniform1f(u("zi"), ziarno);
    };

    const spokoj = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const kursor = matchMedia("(pointer: fine)").matches && !spokoj;
    const html = document.documentElement;
    let ciemny = html.classList.contains("dark") ? 1 : 0;
    let skala = 0.4;
    const mysz = { x: 0.62, y: 0.42, cx: 0.62, cy: 0.42 };
    let widoczny = false,
      raf = 0,
      ost = 0;
    const t0 = performance.now() - 30000;

    const rozmiar = () => {
      skala = noc() ? Math.min(devicePixelRatio || 1, 1.5) : 0.4;
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
      gl.uniform1f(uS, skala);
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

    uzyj();
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
      const nowy = html.classList.contains("dark") ? 1 : 0;
      if (nowy === ciemny) return;
      ciemny = nowy;
      uzyj();
      rozmiar();
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
  }, [odcien, ziarno]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className={`swiatlo-fraktal pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}
