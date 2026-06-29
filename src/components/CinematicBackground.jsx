import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

const FloatingShapes = () => {
  const group = useRef();

  const shapes = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 30; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 15 - 5
        ],
        rotation: [
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          0
        ],
        scale: Math.random() * 0.8 + 0.2,
        speed: Math.random() * 0.5 + 0.1
      });
    }
    return temp;
  }, []);

  useFrame((state) => {
    // Subtle mouse tracking camera movement
    const targetX = (state.mouse.x * 2);
    const targetY = (state.mouse.y * 2);
    
    group.current.rotation.x += 0.05 * (targetY - group.current.rotation.x) * 0.05;
    group.current.rotation.y += 0.05 * (targetX - group.current.rotation.y) * 0.05;
  });

  return (
    <group ref={group}>
      {shapes.map((props, i) => (
        <Float key={i} speed={props.speed} rotationIntensity={1.5} floatIntensity={2}>
          <mesh position={props.position} rotation={props.rotation} scale={props.scale}>
            {/* Mix of planes (paper) and boxes */}
            {i % 3 === 0 ? <planeGeometry args={[1, 1.414]} /> : <boxGeometry args={[1, 1, 1]} />}
            <meshStandardMaterial 
              color={i % 5 === 0 ? "#dc2626" : (i % 4 === 0 ? "#f59e0b" : "#18181b")} 
              roughness={0.1}
              metalness={0.9}
              transparent
              opacity={0.6}
              side={THREE.DoubleSide}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
};

const CinematicBackground = () => {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1, background: '#ffffff' }}>
      <Canvas camera={{ position: [0, 0, 15], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={0.1} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
        <directionalLight position={[-10, -10, -5]} intensity={3} color="#dc2626" />
        <spotLight position={[0, 10, 10]} angle={0.5} penumbra={1} intensity={2} color="#f59e0b" />
        
        <FloatingShapes />
        
        <Sparkles count={300} scale={25} size={1.5} speed={0.4} opacity={0.2} color="#000000" />
      </Canvas>
    </div>
  );
};

export default CinematicBackground;
