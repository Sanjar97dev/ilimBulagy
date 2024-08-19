import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import '../style/muslimgames.css'; // No need to assign it to a variable

const Box = () => {
  const ref = useRef();
  useFrame((state, delta) => (ref.current.rotation.y += 0.01));
  return (
    <mesh ref={ref} position={[0, 0, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color='orange' />
    </mesh>
  );
};

const MuslimGame = () => {
  return (
    <div className='muslim-game-container'>
      <Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 30]} />
        <Box />
        <OrbitControls />
        <Stars />
      </Canvas>
    </div>
  );
};

export default MuslimGame;
