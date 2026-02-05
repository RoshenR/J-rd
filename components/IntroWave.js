'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function IntroWave({ onComplete }) {
  const containerRef = useRef(null);
  const [phase, setPhase] = useState('playing'); // playing -> fading -> done

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const geometry = new THREE.PlaneGeometry(2, 2);

    const fragmentShader = `
      precision highp float;

      uniform float uTime;
      uniform vec2 uResolution;

      /* ---- noise ---- */
      vec2 hash22(vec2 p) {
        p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
        return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
      }

      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(
          mix(dot(hash22(i), f),
              dot(hash22(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
          mix(dot(hash22(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)),
              dot(hash22(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x),
          u.y
        );
      }

      float fbm(vec2 p) {
        float v = 0.0, a = 0.5;
        mat2 rot = mat2(0.877, 0.48, -0.48, 0.877);
        for (int i = 0; i < 6; i++) {
          v += a * noise(p);
          p = rot * p * 2.1;
          a *= 0.48;
        }
        return v;
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / uResolution;
        float aspect = uResolution.x / uResolution.y;
        vec2 p = (uv - 0.5) * vec2(aspect, 1.0);

        float t = uTime * 1.6;

        /* fast damping for short duration */
        float damping = exp(-uTime * 0.8);

        /* ---- BIG dramatic ripples ---- */
        float dist = length(p);
        float ring1 = sin(dist * 25.0 - t * 5.0) * exp(-dist * 0.8);

        vec2 p2 = p - vec2(-0.35, 0.25);
        float ring2 = sin(length(p2) * 20.0 - t * 4.2 + 2.0) * exp(-length(p2) * 1.0);

        vec2 p3 = p - vec2(0.4, -0.2);
        float ring3 = sin(length(p3) * 30.0 - t * 5.5 + 4.0) * exp(-length(p3) * 1.1);

        float ripples = (ring1 + ring2 * 0.8 + ring3 * 0.6) * damping;

        /* ---- flowing organic surface ---- */
        float flow1 = fbm(p * 3.0 + t * 0.5);
        float flow2 = fbm(p * 5.0 - t * 0.4 + 8.0);
        float organic = (flow1 * 0.4 + flow2 * 0.25) * damping;

        float surface = ripples * 0.6 + organic;

        /* ---- palette: deep ocean to golden crests ---- */
        vec3 abyss   = vec3(0.04, 0.05, 0.08);
        vec3 deep    = vec3(0.05, 0.10, 0.16);
        vec3 teal    = vec3(0.08, 0.18, 0.24);
        vec3 aqua    = vec3(0.14, 0.28, 0.32);
        vec3 golden  = vec3(0.78, 0.62, 0.38);
        vec3 cream   = vec3(0.94, 0.90, 0.82);

        float s = surface;
        vec3 color = abyss;
        color = mix(color, deep,  smoothstep(-0.3, -0.05, s));
        color = mix(color, teal,  smoothstep(-0.05, 0.15, s));
        color = mix(color, aqua,  smoothstep(0.15, 0.35, s));

        /* golden light on crests */
        float crestLight = pow(max(s, 0.0), 2.0) * 2.5 * damping;
        color += golden * crestLight * 0.6;
        color += cream * pow(max(s, 0.0), 4.0) * 1.5 * damping;

        /* light rays from top-right */
        vec2 lightDir = normalize(vec2(0.6, 0.8));
        float lightDist = dot(uv - vec2(0.7, 0.8), lightDir);
        float lightRay = exp(-lightDist * lightDist * 8.0) * 0.15 * damping;
        color += golden * lightRay;

        /* specular shimmer */
        float spec = noise(p * 50.0 + t * 3.0);
        spec = pow(max(spec, 0.0), 8.0) * 0.4 * damping;
        color += cream * spec;

        /* vignette */
        float vig = 1.0 - dot(uv - 0.5, uv - 0.5) * 1.6;
        color *= max(vig, 0.0);

        /* transparency: starts opaque, fades to transparent */
        float alpha = smoothstep(0.0, 0.3, uTime) * (0.6 + 0.4 * damping);

        gl_FragColor = vec4(color, alpha);
      }
    `;

    const vertexShader = `
      void main() {
        gl_Position = vec4(position, 1.0);
      }
    `;

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      uniforms: {
        uTime: { value: 0 },
        uResolution: {
          value: new THREE.Vector2(window.innerWidth, window.innerHeight),
        },
      },
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const clock = new THREE.Clock();
    let animationId;
    let stopped = false;

    function animate() {
      if (stopped) return;
      animationId = requestAnimationFrame(animate);
      material.uniforms.uTime.value = clock.getElapsedTime();
      renderer.render(scene, camera);
    }
    animate();

    function onResize() {
      renderer.setSize(window.innerWidth, window.innerHeight);
      material.uniforms.uResolution.value.set(
        window.innerWidth,
        window.innerHeight
      );
    }
    window.addEventListener('resize', onResize);

    /* shorter: fade at 1.6s, complete at 2.6s */
    const fadeTimer = setTimeout(() => setPhase('fading'), 1600);
    const completeTimer = setTimeout(() => {
      stopped = true;
      cancelAnimationFrame(animationId);
      setPhase('done');
      if (onComplete) onComplete();
    }, 2800);

    return () => {
      stopped = true;
      cancelAnimationFrame(animationId);
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [onComplete]);

  if (phase === 'done') return null;

  return (
    <div
      ref={containerRef}
      className={`intro-wave ${phase === 'fading' ? 'intro-wave--fading' : ''}`}
    />
  );
}
