import React, { useRef, useEffect, useState } from 'react';

import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';

import Coins from '../../public/models/Coin';
import { Suspense } from 'react';

const Coins3d = (props: any) => {
    const coinRef = useRef<any>();

    const [direction, setDirection] = useState(1);
    const [positionY, setPositionY] = useState(0);

    useEffect(() => {
        const animate = () => {
          if (coinRef.current) {
            coinRef.current.rotation.y += 0.01 * direction;
            setPositionY((prevY) => prevY + 0.005 * direction);
    
            if (positionY >= 0.2) {
              setDirection(-1);
            } else if (positionY <= -0.2) {
              setDirection(1);
            }
    
            coinRef.current.position.y = positionY;
          }
          requestAnimationFrame(animate);
        };
    
        animate();
    
        return () => {
          // Cleanup function (optional)
        };
      }, []);

    return (
        <Canvas>
            <ambientLight />
            <Suspense fallback={null}>
                <mesh ref={coinRef}>
                    <Coins {...props} scale={[20, 14, 20]} />
                </mesh>
                <Environment preset="sunset" />
                {/* <OrbitControls /> */}
            </Suspense>
        </Canvas>
    );
};

export default Coins3d;