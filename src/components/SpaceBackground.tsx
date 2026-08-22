"use client";

import React, { useRef } from "react";
import { usePathname } from "next/navigation";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function SpaceModel() {
    const { scene } = useGLTF("/galaxy-model.glb");
    const groupRef = useRef<THREE.Group>(null);

    const localScene = React.useMemo(() => scene.clone(true), [scene]);

    React.useLayoutEffect(() => {
        new THREE.Box3().setFromObject(localScene).getCenter(localScene.position).multiplyScalar(-1);
    }, [localScene]);

    useFrame((state, delta) => {
        if (!groupRef.current) return;
        groupRef.current.rotation.y += delta * 0.12;
        groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.3;
    });

    return (
        <group ref={groupRef}>
            <primitive object={localScene} scale={15} />
        </group>
    );
}

export const SpaceBackground = () => {
    const pathname = usePathname();
    if (pathname === "/") return null;

    return (
        <div className="fixed inset-0 w-full h-full z-0 overflow-hidden opacity-60 mix-blend-screen">
            <Canvas
                camera={{ position: [0, 18.8, 6.8], fov: 60 }}
                gl={{ alpha: true, antialias: true }}
            >
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 10]} intensity={1} />
                <SpaceModel />
                <Environment preset="city" />
                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                />
            </Canvas>
        </div>
    );
};

useGLTF.preload("/galaxy-model.glb");
