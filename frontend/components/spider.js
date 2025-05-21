"use client";
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, OrbitControls } from '@react-three/drei';
import { useRef, useEffect, useState } from 'react';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { useTheme } from 'next-themes';
import * as THREE from 'three';

const SpiderLogo = () => {
    const logoRef = useRef();
    const { scene } = useGLTF('/models/spiderman_logo.glb');
    const { viewport } = useThree();
    const [scale, setScale] = useState(1);

    // Responsive scaling
    useEffect(() => {
        if (viewport.width < 6) {
            setScale(0.5);
        } else if (viewport.width < 10) {
            setScale(0.8);
        } else {
            setScale(1);
        }
    }, [viewport.width]);

    // Rotation animation
    useFrame(() => {
        if (logoRef.current) {
            logoRef.current.rotation.y += 0.005;
        }
    });

    // Emissive glow
    useEffect(() => {
        scene.traverse((child) => {
            if (child.isMesh) {
                child.material.color = new THREE.Color("#1a0000"); // Very dark red (near-black)
                child.material.emissive = new THREE.Color("#ff1a1a"); // Fluorescent red
                child.material.emissiveIntensity = 2; // Strong glow
                child.material.metalness = 0.3;
                child.material.roughness = 0.4;
                child.material.color = new THREE.Color("black");
                child.material.emissive = new THREE.Color("#ff1a1a");
            }
        });
    }, [scene]);

    return (
        <primitive
            object={scene}
            ref={logoRef}
            scale={scale}
            position={[0.13, -3.5, 0]}
        />
    );
};

const SpiderCanvas = () => {
    const { resolvedTheme } = useTheme();
    const isLight = resolvedTheme === 'light';
    const bgColor = isLight ? 'bg-white' : 'bg-black';
    const lightColor = "#ff1a1a"; // Neon red

    return (
        <div className={`relative w-full h-screen ${bgColor}`}>
            <Canvas camera={{ position: [0, 0, 7], fov: 55 }} className="w-full h-full">
                <EffectComposer>
                    <Bloom intensity={2} luminanceThreshold={0.1} />
                </EffectComposer>

                <ambientLight intensity={1.5} color={lightColor} />
                <pointLight position={[2, 2, 5]} intensity={5} color={lightColor} distance={20} />
                <spotLight position={[0, 5, 5]} angle={0} penumbra={1} intensity={4} color={lightColor} castShadow />

                <SpiderLogo />
                <OrbitControls enableZoom={false} />
            </Canvas>
        </div>
    );
};

export default SpiderCanvas;
