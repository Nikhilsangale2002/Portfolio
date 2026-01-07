import React, { useRef, useMemo, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'

function Stars(props) {
  const ref = useRef()
  
  // Reduced particle count for better performance
  const sphere = useMemo(() => {
    const count = 2000 // Reduced from 5000
    const positions = new Float32Array(count * 3)
    
    // Manual sphere generation to avoid maath/random issues
    for (let i = 0; i < count; i++) {
      const radius = 1.5
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos((Math.random() * 2) - 1)
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = radius * Math.cos(phi)
    }
    
    return positions
  }, [])

  useFrame((state, delta) => {
    if (ref.current && isFinite(delta)) {
      ref.current.rotation.x -= delta / 10
      ref.current.rotation.y -= delta / 15
    }
  })

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
        <PointMaterial
          transparent
          color="#646cff"
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  )
}

const Background3D = () => {
  // Disable 3D on mobile for better performance
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  
  if (isMobile) {
    return null
  }
  
  return (
    <div className="background-3d">
      <Suspense fallback={null}>
        <Canvas 
          camera={{ position: [0, 0, 1] }}
          onCreated={({ gl }) => {
            gl.setClearColor('#0b0b10', 0)
          }}
          dpr={[1, 1.5]}
          performance={{ min: 0.5 }}
          gl={{ antialias: false, alpha: true }}
        >
          <Stars />
        </Canvas>
      </Suspense>
    </div>
  )
}

export default Background3D
