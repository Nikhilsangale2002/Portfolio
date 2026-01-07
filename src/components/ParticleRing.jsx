import React, { useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'

function Ring() {
  const ringRef = useRef()
  const particleCount = 60 // Reduced from 100

  useFrame((state) => {
    if (ringRef.current && state.clock) {
      const time = state.clock.getElapsedTime()
      if (isFinite(time)) {
        ringRef.current.rotation.z = time * 0.5
      }
    }
  })

  const particles = []
  for (let i = 0; i < particleCount; i++) {
    const angle = (i / particleCount) * Math.PI * 2
    const radius = 2
    const x = Math.cos(angle) * radius
    const y = Math.sin(angle) * radius
    
    particles.push(
      <mesh key={i} position={[x, y, 0]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial color="#646cff" emissive="#646cff" emissiveIntensity={0.5} />
      </mesh>
    )
  }

  return <group ref={ringRef}>{particles}</group>
}

const ParticleRing = () => {
  // Disable on mobile
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  
  if (isMobile) {
    return null
  }
  
  return (
    <div className="particle-ring-canvas">
      <Suspense fallback={null}>
        <Canvas 
          camera={{ position: [0, 0, 6], fov: 50 }}
          onCreated={({ gl }) => {
            gl.setClearColor('#0b0b10', 0)
          }}
          dpr={[1, 1.5]}
          performance={{ min: 0.5 }}
          gl={{ antialias: false, alpha: true }}
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <Ring />
        </Canvas>
      </Suspense>
    </div>
  )
}

export default ParticleRing
