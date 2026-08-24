"use client";

import dynamic from "next/dynamic";

// three.js/@react-three/fiber is a large, WebGL-only dependency — load it as
// a separate chunk after the rest of the page hydrates instead of blocking
// on it, and never render it during SSR.
export const SpaceBackground = dynamic(
    () => import("./SpaceBackground").then((mod) => mod.SpaceBackground),
    { ssr: false }
);
