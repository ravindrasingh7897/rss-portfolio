"use client";

import React, { useEffect, useRef } from "react";
import { useMotionValue } from "framer-motion";
import { ScrollyCanvas } from "./ScrollyCanvas";
import { Overlay } from "./Overlay";

// Virtual scroll units needed to sweep through the sequence once.
// Larger = slower, more cinematic pacing per direction.
const SWEEP_RANGE = 12000;
const TOUCH_MULTIPLIER = 3;

const triangleWave = (raw: number) => {
    const cycle = SWEEP_RANGE * 2;
    const pos = ((raw % cycle) + cycle) % cycle;
    return pos <= SWEEP_RANGE ? pos / SWEEP_RANGE : (cycle - pos) / SWEEP_RANGE;
};

export const HomeHero = () => {
    const progress = useMotionValue(0);
    const rawRef = useRef(0);

    useEffect(() => {
        const applyDelta = (delta: number) => {
            rawRef.current += delta;
            progress.set(triangleWave(rawRef.current));
        };

        const handleWheel = (e: WheelEvent) => {
            e.preventDefault();
            applyDelta(e.deltaY);
        };

        let touchStartY = 0;
        const handleTouchStart = (e: TouchEvent) => {
            touchStartY = e.touches[0].clientY;
        };
        const handleTouchMove = (e: TouchEvent) => {
            e.preventDefault();
            const currentY = e.touches[0].clientY;
            const delta = (touchStartY - currentY) * TOUCH_MULTIPLIER;
            touchStartY = currentY;
            applyDelta(delta);
        };

        window.addEventListener("wheel", handleWheel, { passive: false });
        window.addEventListener("touchstart", handleTouchStart, { passive: true });
        window.addEventListener("touchmove", handleTouchMove, { passive: false });

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            window.removeEventListener("wheel", handleWheel);
            window.removeEventListener("touchstart", handleTouchStart);
            window.removeEventListener("touchmove", handleTouchMove);
            document.body.style.overflow = previousOverflow;
        };
    }, [progress]);

    return (
        <section className="relative w-full h-screen overflow-hidden">
            <ScrollyCanvas progress={progress} />
            <Overlay progress={progress} />
        </section>
    );
};
