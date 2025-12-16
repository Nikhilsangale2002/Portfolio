import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Text3D, Center, Float } from '@react-three/drei'

function FloatingIcon({ position, icon, speed }) {
  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={1}>
      <Center position={position}>
        <Text3D
          font="/fonts/helvetiker_regular.typeface.json"
          size={0.3}
          height={0.1}
        >
          {icon}
          <meshStandardMaterial color="#646cff" metalness={0.8} roughness={0.2} />
        </Text3D>
      </Center>
    </Float>
  )
}

const FloatingIcons = () => {
  return (
    <div className="floating-icons-canvas">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <FloatingIcon position={[-2, 1, 0]} icon="<>" speed={2} />
        <FloatingIcon position={[2, -1, 0]} icon="{}" speed={1.5} />
        <FloatingIcon position={[0, 1.5, 0]} icon="()" speed={1.8} />
      </Canvas>
    </div>
  )
}

export default FloatingIcons
