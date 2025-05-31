"use client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";
import { useRef, useEffect, useState } from "react";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useTheme } from "next-themes";
import * as THREE from "three";

const SpiderLogo = () => {
    const logoRef = useRef();
    const { scene } = useGLTF("/models/spiderman_logo.glb");
    const { viewport } = useThree();
    const [scale, setScale] = useState(1);

    useEffect(() => {
        const box = new THREE.Box3().setFromObject(scene);
        const center = new THREE.Vector3();
        box.getCenter(center);
        scene.position.sub(center);

        const size = new THREE.Vector3();
        box.getSize(size);

        const screenWidth = window.innerWidth;

        if (screenWidth < 640) {
            scene.position.y += size.y * 0.28;
        } else if (screenWidth < 1024) {
            scene.position.y += size.y * 0.15;
        } else {
            scene.position.y += size.y * 0.0025;
        }
    }, [scene]);


    useEffect(() => {
        if (viewport.width < 6) {
            setScale(0.35);
        } else if (viewport.width < 10) {
            setScale(0.6);
        } else {
            setScale(1);
        }
    }, [viewport.width]);

    useFrame(() => {
        if (logoRef.current) {
            logoRef.current.rotation.y += 0.005;
        }
    });

    useEffect(() => {
        scene.traverse((child) => {
            if (child.isMesh) {
                child.material.color = new THREE.Color("black");
                child.material.emissive = new THREE.Color("#ff1a1a");
                child.material.emissiveIntensity = 2;
                child.material.metalness = 0.3;
                child.material.roughness = 0.4;
            }
        });
    }, [scene]);

    return <primitive object={scene} ref={logoRef} scale={scale} position={[0, 0, 0]} />;
};

const CameraRig = () => {
    const { camera, viewport } = useThree();

    useEffect(() => {
        if (viewport.width < 6) {
            camera.position.set(0, 1.2, 5);
        } else if (viewport.width < 10) {
            camera.position.set(0, 0.8, 6);
        } else {
            camera.position.set(0, 0.3, 7);
        }
    }, [viewport.width]);

    return null;
};

const ResponsiveCamera = () => {
    const { camera, viewport } = useThree();

    useEffect(() => {
        const aspect = viewport.width / viewport.height;

        if (viewport.width < 6) {
            camera.position.set(0, 1.5, 5); // Shift up and a bit closer
            camera.fov = 65;
        } else if (viewport.width < 10) {
            camera.position.set(0, 0.7, 6);
            camera.fov = 60;
        } else {
            camera.position.set(0, 0.3, 7);
            camera.fov = 55;
        }

        camera.updateProjectionMatrix();
    }, [viewport.width, viewport.height]);

    return null;
};


const SpiderCanvas = () => {
    const { resolvedTheme } = useTheme();
    const isLight = resolvedTheme === "light";
    const bgColor = isLight ? "bg-white" : "bg-black";
    const lightColor = "#ff1a1a";

    return (
        <div className={`relative w-full h-screen ${bgColor}`} style={{ overflow: 'hidden', margin: 0, padding: 0 }}>
            <Canvas camera={{ position: [0, 0.3, 7], fov: 55 }} className="w-full h-full">
                <ResponsiveCamera />
                <EffectComposer>
                    <Bloom intensity={2} luminanceThreshold={0.1} />
                </EffectComposer>

                <ambientLight intensity={1.5} color={lightColor} />
                <pointLight position={[2, 2, 5]} intensity={5} color={lightColor} distance={20} />
                <spotLight position={[0, 5, 5]} angle={0} penumbra={1} intensity={4} color={lightColor} castShadow />

                <CameraRig />
                <SpiderLogo />
                <OrbitControls enableZoom={false} enablePan={false} />
            </Canvas>
        </div>
    );
};

export default SpiderCanvas;
