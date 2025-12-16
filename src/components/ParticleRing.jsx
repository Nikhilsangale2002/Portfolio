import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

function Ring() {
  const ringRef = useRef()
  const particleCount = 100

  useFrame((state) => {
    ringRef.current.rotation.z = state.clock.getElapsedTime() * 0.5
  })

  const particles = []
  for (let i = 0; i < particleCount; i++) {
    const angle = (i / particleCount) * Math.PI * 2
    const radius = 2
    const x = Math.cos(angle) * radius
    const y = Math.sin(angle) * radius
    
    particles.push(
      <mesh key={i} position={[x, y, 0]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial color="#646cff" emissive="#646cff" emissiveIntensity={0.5} />
      </mesh>
    )
  }

  return <group ref={ringRef}>{particles}</group>
}

const ParticleRing = () => {
  return (
    <div className="particle-ring-canvas">
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Ring />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1} />
      </Canvas>
    </div>
  )
}

export default ParticleRing
