import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Cylinder, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const ParticleSystem = ({ count = 1500 }) => {
  const points = useRef();

  const positions = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos((Math.random() * 2) - 1);
      const r = 3 + Math.random() * 2;
      
      p[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      p[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      p[i * 3 + 2] = r * Math.cos(phi);
    }
    return p;
  }, [count]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (points.current) {
      points.current.rotation.y = time * 0.05;
      points.current.rotation.x = Math.sin(time * 0.1) * 0.1;
    }
  });

  return (
    <Points ref={points} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#0ff"
        size={0.03}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
};

const DNADoubleHelix = () => {
  const groupRef = useRef();
  
  // Math for DNA
  const numBasePairs = 24;
  const radius = 1.2;
  const heightSpacing = 0.4;
  const twistAngle = 0.4; // radians per base pair

  const basePairs = useMemo(() => {
    const pairs = [];
    for (let i = 0; i < numBasePairs; i++) {
      const angle = i * twistAngle;
      const y = (i - numBasePairs / 2) * heightSpacing;
      
      const x1 = radius * Math.cos(angle);
      const z1 = radius * Math.sin(angle);
      
      const x2 = radius * Math.cos(angle + Math.PI);
      const z2 = radius * Math.sin(angle + Math.PI);
      
      pairs.push({ x1, y, z1, x2, z2, angle });
    }
    return pairs;
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Parallax effect based on mouse
    const mouseX = (state.pointer.x * Math.PI) / 4;
    const mouseY = (state.pointer.y * Math.PI) / 4;
    
    // Smooth rotation towards mouse & continuous spin
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mouseX + time * 0.3, 0.05);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -mouseY + 0.2, 0.05); // slight tilt forward
    
    // Floating effect
    groupRef.current.position.y = Math.sin(time * 1.5) * 0.2;
  });

  return (
    <group ref={groupRef}>
      {basePairs.map((pair, i) => (
        <group key={i}>
          {/* Strand 1 Node */}
          <Sphere args={[0.15, 16, 16]} position={[pair.x1, pair.y, pair.z1]}>
            <meshStandardMaterial color="#0ea5e9" emissive="#0ea5e9" emissiveIntensity={0.5} roughness={0.1} metalness={0.8} />
          </Sphere>
          
          {/* Strand 2 Node */}
          <Sphere args={[0.15, 16, 16]} position={[pair.x2, pair.y, pair.z2]}>
            <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={0.5} roughness={0.1} metalness={0.8} />
          </Sphere>
          
          {/* Connecting Rung */}
          <Cylinder 
            args={[0.03, 0.03, radius * 2, 8]} 
            position={[0, pair.y, 0]}
            rotation={[0, -pair.angle, Math.PI / 2]}
          >
            <meshStandardMaterial color="#0ff" emissive="#0ff" emissiveIntensity={0.8} transparent opacity={0.6} />
          </Cylinder>
        </group>
      ))}
      <ParticleSystem />
    </group>
  );
};

export default function HeroOrb() {
  return (
    <div className="w-full h-full absolute inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={2} color="#0ff" />
        <directionalLight position={[-10, -10, -5]} intensity={1} color="#8b5cf6" />
        <DNADoubleHelix />
      </Canvas>
    </div>
  );
}
