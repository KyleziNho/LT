import { useEffect, useRef } from "react";
import { Renderer, Program, Mesh, Triangle, Vec2, Vec3 } from "ogl";

/*
  ShaderField — the signature living background.
  A domain-warped fractal-noise field rendered on a full-screen triangle.
  It drifts slowly on its own and leans toward the pointer, evoking light
  moving over water (coral series) or over paddy fields at dawn.

  Palettes are hand-tuned from Lisa's work. Cheap enough to run behind a hero:
  a single fragment pass, capped DPR, pauses when offscreen / tab hidden.
*/

const PALETTES = {
  // deep ink gallery with embers of gold + coral and cool teal shadow, so it
  // reads as light-in-the-dark rather than a flat brown fog
  dawn: {
    bg: [0.043, 0.045, 0.05], // near-black, faintly cool
    a: [0.79, 0.52, 0.2], // sunrise gold
    b: [0.7, 0.3, 0.19], // deep coral ember
    c: [0.09, 0.16, 0.19], // teal-ink shadow (breaks the brown)
    intensity: 0.62,
  },
  // reef — teal depths with coral bloom
  tide: {
    bg: [0.055, 0.09, 0.098],
    a: [0.18, 0.42, 0.43], // teal
    b: [0.81, 0.34, 0.22], // coral
    c: [0.88, 0.66, 0.3], // gold coral
    intensity: 0.95,
  },
  // soft paper — barely-there warm haze for light sections
  paper: {
    bg: [0.957, 0.937, 0.902],
    a: [0.75, 0.5, 0.19],
    b: [0.81, 0.34, 0.22],
    c: [0.18, 0.42, 0.43],
    intensity: 0.16,
  },
  // bloom — a CALM, single-family cool wash for the light hero. Kept tonal
  // (lilac → periwinkle → soft violet) so it reads as one quiet mist of
  // pigment on paper rather than a competing rainbow.
  bloom: {
    bg: [0.966, 0.958, 0.986], // cool paper white
    a: [0.63, 0.6, 0.86], // soft lilac
    b: [0.7, 0.75, 0.93], // pale periwinkle
    c: [0.55, 0.5, 0.8], // muted violet
    intensity: 0.46,
    light: true,
  },
  // dusk — deep indigo-violet twilight with rose + aqua bloom, for dark bands
  dusk: {
    bg: [0.086, 0.063, 0.15], // indigo night
    a: [0.55, 0.33, 0.78], // violet glow
    b: [0.82, 0.4, 0.62], // magenta rose
    c: [0.24, 0.6, 0.62], // aqua depth
    intensity: 0.9,
  },
  // nocturne — the hero. Deeper than dusk so the shader's additive caustics
  // GLOW: violet light blooming through indigo water, a vein of rose-magenta,
  // aqua in the depths. Pigment dropped into dark water.
  nocturne: {
    bg: [0.09, 0.063, 0.153], // #171027 indigo night
    a: [0.545, 0.373, 0.816], // #8b5fd0 violet glow
    b: [0.816, 0.404, 0.616], // #d0679d rose-magenta vein
    c: [0.227, 0.604, 0.604], // #3a9a9a aqua depth
    intensity: 0.85,
  },
};

const vertex = /* glsl */ `
  attribute vec2 position;
  void main() { gl_Position = vec4(position, 0.0, 1.0); }
`;

const fragment = /* glsl */ `
  precision highp float;
  uniform float uTime;
  uniform vec2  uRes;
  uniform vec2  uMouse;      // 0..1, eased
  uniform vec3  uBg;
  uniform vec3  uA;
  uniform vec3  uB;
  uniform vec3  uC;
  uniform float uIntensity;
  uniform float uLight;      // 1.0 = light paper palette, 0.0 = dark gallery

  // -- simplex-ish value noise ------------------------------------------
  vec2 hash2(vec2 p){
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
  }
  float noise(vec2 p){
    vec2 i = floor(p); vec2 f = fract(p);
    vec2 u = f*f*(3.0-2.0*f);
    return mix(mix(dot(hash2(i+vec2(0,0)), f-vec2(0,0)),
                   dot(hash2(i+vec2(1,0)), f-vec2(1,0)), u.x),
               mix(dot(hash2(i+vec2(0,1)), f-vec2(0,1)),
                   dot(hash2(i+vec2(1,1)), f-vec2(1,1)), u.x), u.y);
  }
  float fbm(vec2 p){
    float v = 0.0, a = 0.5;
    for(int i=0;i<5;i++){ v += a*noise(p); p *= 2.02; a *= 0.5; }
    return v;
  }

  void main(){
    vec2 uv = gl_FragCoord.xy / uRes.xy;
    vec2 p = uv;
    p.x *= uRes.x / uRes.y;

    float t = uTime * 0.045;
    vec2 m = (uMouse - 0.5) * 0.6;

    // domain warp — two layers of flow
    vec2 q = vec2(fbm(p + t), fbm(p + vec2(3.2, 1.7) - t));
    vec2 r = vec2(fbm(p + 1.6*q + m + vec2(1.7, 9.2)),
                  fbm(p + 1.6*q + m + vec2(8.3, 2.8) - t*0.5));
    float f = fbm(p + 2.2*r + t*0.5);

    // build colour from warped field
    vec3 col = uBg;
    col = mix(col, uA, smoothstep(0.0, 0.9, f + 0.35));
    col = mix(col, uB, smoothstep(0.25, 1.1, length(r)) * 0.9);
    col = mix(col, uC, smoothstep(0.1, 0.75, q.y * q.x + 0.35) * 0.5);

    // caustic-like highlights — softened on light palettes so paper doesn't blow out
    float hl = pow(smoothstep(0.55, 0.95, f + 0.5*r.x), 3.0);
    col += hl * uIntensity * 0.6 * (1.0 - 0.55 * uLight);

    col = mix(uBg, col, uIntensity);

    // radial framing: dark palettes vignette down; light palettes fade to paper
    float vig = smoothstep(1.25, 0.25, length(uv - 0.5));
    vec3 dark  = col * (0.82 + 0.18 * vig);
    vec3 light = mix(uBg, col, 0.5 + 0.5 * vig);
    col = mix(dark, light, uLight);

    // subtle film grain to kill banding
    float g = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898,78.233))) * 43758.5453);
    col += (g - 0.5) * 0.025;

    gl_FragColor = vec4(col, 1.0);
  }
`;

export default function ShaderField({ palette = "dawn", className = "", style }) {
  const ref = useRef(null);
  // paint the host in the palette's base colour so, during WebGL init/resize,
  // the hero never flashes an unfilled dark seam before the first frame lands
  const pal = PALETTES[palette] ?? PALETTES.dawn;
  const baseBg = `rgb(${pal.bg.map((c) => Math.round(c * 255)).join(",")})`;

  useEffect(() => {
    const host = ref.current;
    if (!host) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const renderer = new Renderer({
      alpha: false,
      antialias: false,
      dpr: Math.min(window.devicePixelRatio, 1.6),
    });
    const gl = renderer.gl;
    gl.canvas.style.width = "100%";
    gl.canvas.style.height = "100%";
    gl.canvas.style.display = "block";
    host.appendChild(gl.canvas);

    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        uTime: { value: 0 },
        uRes: { value: new Vec2(1, 1) },
        uMouse: { value: new Vec2(0.5, 0.5) },
        uBg: { value: new Vec3(...pal.bg) },
        uA: { value: new Vec3(...pal.a) },
        uB: { value: new Vec3(...pal.b) },
        uC: { value: new Vec3(...pal.c) },
        uIntensity: { value: pal.intensity },
        uLight: { value: pal.light ? 1 : 0 },
      },
    });
    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = host;
      renderer.setSize(w, h);
      program.uniforms.uRes.value.set(gl.drawingBufferWidth, gl.drawingBufferHeight);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);

    const target = new Vec2(0.5, 0.5);
    const onMove = (e) => {
      const rect = host.getBoundingClientRect();
      target.set(
        (e.clientX - rect.left) / rect.width,
        1 - (e.clientY - rect.top) / rect.height
      );
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    let raf = 0;
    let running = true;
    const start = performance.now();
    const loop = (now) => {
      if (!running) return;
      const t = (now - start) / 1000;
      program.uniforms.uTime.value = reduce ? 0 : t;
      // ease mouse
      const mu = program.uniforms.uMouse.value;
      mu.x += (target.x - mu.x) * 0.045;
      mu.y += (target.y - mu.y) * 0.045;
      renderer.render({ scene: mesh });
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    // pause when the tab is hidden or the host scrolls fully offscreen
    const io = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting;
        if (visible && !running) {
          running = true;
          raf = requestAnimationFrame(loop);
        } else if (!visible && running) {
          running = false;
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0 }
    );
    io.observe(host);

    const onVis = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!running) {
        running = true;
        raf = requestAnimationFrame(loop);
      }
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("pointermove", onMove);
      gl.canvas.remove();
      const ext = gl.getExtension("WEBGL_lose_context");
      if (ext) ext.loseContext();
    };
  }, [palette]);

  return (
    <div
      ref={ref}
      className={`shader-field ${className}`}
      style={{ background: baseBg, ...style }}
      aria-hidden="true"
    />
  );
}
