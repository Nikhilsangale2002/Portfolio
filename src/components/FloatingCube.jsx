import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { RoundedBox, Float, MeshTransmissionMaterial } from '@react-three/drei'

function AnimatedCube() {
  const meshRef = useRef()

  useFrame((state) => {
    meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.3
    meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.2
  })

  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={1.5}>
      <RoundedBox ref={meshRef} args={[1.5, 1.5, 1.5]} radius={0.1} smoothness={4}>
        <MeshTransmissionMaterial
          backside
          backsideThickness={5}
          thickness={2}
          chromaticAberration={0.5}
          anisotropy={0.5}
          distortion={0.5}
          distortionScale={0.5}
          temporalDistortion={0.1}
          color="#646cff"
        />
      </RoundedBox>
    </Float>
  )
}

const FloatingCube = () => {
  return (
    <div className="floating-cube-canvas">
      <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <AnimatedCube />
      </Canvas>
    </div>
  )
}

export default FloatingCube
