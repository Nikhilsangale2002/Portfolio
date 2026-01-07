import React, { useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { RoundedBox, Float, MeshTransmissionMaterial } from '@react-three/drei'

function AnimatedCube() {
  const meshRef = useRef()

  useFrame((state) => {
    if (meshRef.current && state.clock) {
      const time = state.clock.getElapsedTime()
      if (isFinite(time)) {
        meshRef.current.rotation.x = time * 0.3
        meshRef.current.rotation.y = time * 0.2
      }
    }
  })

  return (
    <Float speed={1} rotationIntensity={0.5} floatIntensity={1}>
      <RoundedBox ref={meshRef} args={[1.5, 1.5, 1.5]} radius={0.1} smoothness={4}>
        <MeshTransmissionMaterial
          backside
          backsideThickness={3}
          thickness={1.5}
          chromaticAberration={0.3}
          anisotropy={0.3}
          distortion={0.3}
          distortionScale={0.3}
          temporalDistortion={0.05}
          color="#646cff"
        />
      </RoundedBox>
    </Float>
  )
}

const FloatingCube = () => {
  // Disable on mobile
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  
  if (isMobile) {
    return null
  }
  
  return (
    <div className="floating-cube-canvas">
      <Suspense fallback={null}>
        <Canvas 
          camera={{ position: [0, 0, 4], fov: 50 }}
          onCreated={({ gl }) => {
            gl.setClearColor('#0b0b10', 0)
          }}
          dpr={[1, 1.5]}
          performance={{ min: 0.5 }}
          gl={{ antialias: false, alpha: true }}
        >
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <AnimatedCube />
        </Canvas>
      </Suspense>
    </div>
  )
}

export default FloatingCube
