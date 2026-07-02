import { Canvas, useFrame } from "@react-three/fiber"
import { useMemo, useRef, useEffect, useState } from "react"

// Domain-warped fbm "silk smoke" — warm orange rising from the bottom of the
// black hero, like molten light. Rendered absolutely inside the hero section.
// Alpha stays low so the charcoal body background reads through.
const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`

const fragmentShader = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform float uAspect;
  uniform vec2 uCursor;

  // hash + value noise + fbm
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }
  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 4; i++) {
      v += a * noise(p);
      p = p * 2.05 + vec2(13.7, 7.3);
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = vUv;
    uv.x *= uAspect;

    float t = uTime * 0.03;

    // domain warp: q warps p, r warps q — organic silk folds
    vec2 p = uv * 1.6 + uCursor * 0.12;
    vec2 q = vec2(fbm(p + vec2(t, 0.0)), fbm(p + vec2(5.2, 1.3) - t));
    vec2 r = vec2(fbm(p + 2.4 * q + vec2(1.7, 9.2) + t * 0.7),
                  fbm(p + 2.4 * q + vec2(8.3, 2.8) - t * 0.4));
    float f = fbm(p + 2.2 * r);

    // palette: black -> ember -> orange -> golden highlights
    vec3 ember  = vec3(0.35, 0.09, 0.01);
    vec3 orange = vec3(1.00, 0.48, 0.04);
    vec3 gold   = vec3(1.00, 0.76, 0.42);

    vec3 col = mix(ember, orange, smoothstep(0.35, 0.75, f));
    col = mix(col, gold, smoothstep(0.78, 0.95, f) * 0.6);

    // ribbons: brightness concentrated in noise ridges
    float ridge = smoothstep(0.42, 0.62, f) * (1.0 - smoothstep(0.62, 0.92, f));
    float glow = smoothstep(0.5, 0.95, f);
    float alpha = ridge * 0.55 + glow * 0.4;

    // molten glow rises from the bottom, black stays clean up top
    float rise = pow(1.0 - vUv.y, 1.6);
    alpha *= rise * 1.25;

    gl_FragColor = vec4(col, alpha);
  }
`

const SilkPlane = ({ animate }) => {
  const mat = useRef(null)
  const cursor = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e) => {
      cursor.current.x = e.clientX / window.innerWidth - 0.5
      cursor.current.y = 0.5 - e.clientY / window.innerHeight
    }
    window.addEventListener("mousemove", onMove, { passive: true })
    return () => window.removeEventListener("mousemove", onMove)
  }, [])

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uAspect: { value: window.innerWidth / window.innerHeight },
      uCursor: { value: { x: 0, y: 0 } },
    }),
    []
  )

  useFrame((state, delta) => {
    if (!mat.current) return
    if (animate) mat.current.uniforms.uTime.value += delta
    mat.current.uniforms.uAspect.value = state.size.width / state.size.height
    // ease the cursor uniform toward the live cursor for a lazy drift
    const u = mat.current.uniforms.uCursor.value
    u.x += (cursor.current.x - u.x) * Math.min(1, delta * 1.5)
    u.y += (cursor.current.y - u.y) * Math.min(1, delta * 1.5)
  })

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={mat}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </mesh>
  )
}

const AuroraBackground = () => {
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReducedMotion(mq.matches)
    const onChange = (e) => setReducedMotion(e.matches)
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [])

  return (
    <div className="absolute inset-0 pointer-events-none no-print" aria-hidden="true">
      <Canvas
        dpr={[1, 1.25]}
        gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
        frameloop={reducedMotion ? "demand" : "always"}
      >
        <SilkPlane animate={!reducedMotion} />
      </Canvas>
    </div>
  )
}

export default AuroraBackground
