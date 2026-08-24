"use client";

import React, { useEffect, useRef, useState } from "react";
import { useMotionValue } from "framer-motion";
import { ScrollyCanvas } from "./ScrollyCanvas";
import { Overlay } from "./Overlay";
import { useHeroLoading } from "./HeroLoadingContext";

// Virtual scroll units needed to sweep through the sequence once.
// Larger = slower, more cinematic pacing per direction.
const SWEEP_RANGE = 9000;
const TOUCH_MULTIPLIER = 3;
const MOMENTUM_FRICTION = 0.95; // velocity decay per ~16.7ms frame
const MOMENTUM_MIN_VELOCITY = 0.02; // px/ms — below this, momentum stops
const START_FRAME = 25;
const LAST_FRAME = 191;
const FRAME_COUNT = LAST_FRAME - START_FRAME + 1;

const triangleWave = (raw: number) => {
    const cycle = SWEEP_RANGE * 2;
    const pos = ((raw % cycle) + cycle) % cycle;
    return pos <= SWEEP_RANGE ? pos / SWEEP_RANGE : (cycle - pos) / SWEEP_RANGE;
};

export const HomeHero = () => {
    const progress = useMotionValue(0);
    const rawRef = useRef(0);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const { setProgress: setLoadProgress, setIsLoading } = useHeroLoading();

    useEffect(() => {
        setIsLoading(true);
        setLoadProgress(0);

        const loadedImages: HTMLImageElement[] = [];
        let count = 0;

        for (let i = 0; i < FRAME_COUNT; i++) {
            const frameNumber = String(START_FRAME + i).padStart(3, "0");
            const img = new Image();
            img.src = `/hero-frames/frame-${frameNumber}.webp`;
            img.onload = () => {
                count++;
                setLoadProgress(count / FRAME_COUNT);
                if (count === FRAME_COUNT) {
                    setImages(loadedImages);
                    setIsLoading(false);
                }
            };
            loadedImages.push(img);
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        const applyDelta = (delta: number) => {
            rawRef.current += delta;
            progress.set(triangleWave(rawRef.current));
        };

        const handleWheel = (e: WheelEvent) => {
            e.preventDefault();
            applyDelta(e.deltaY);
        };

        let lastY = 0;
        let lastTime = 0;
        let velocity = 0; // px/ms, already scaled by TOUCH_MULTIPLIER
        let momentumFrame: number | null = null;
        let momentumTime: number | null = null;

        const stopMomentum = () => {
            if (momentumFrame !== null) {
                cancelAnimationFrame(momentumFrame);
                momentumFrame = null;
            }
            momentumTime = null;
        };

        const runMomentum = (time: number) => {
            if (momentumTime === null) momentumTime = time;
            const dt = time - momentumTime;
            momentumTime = time;

            if (Math.abs(velocity) < MOMENTUM_MIN_VELOCITY) {
                momentumFrame = null;
                momentumTime = null;
                return;
            }

            applyDelta(velocity * dt);
            velocity *= Math.pow(MOMENTUM_FRICTION, dt / 16.67);
            momentumFrame = requestAnimationFrame(runMomentum);
        };

        const handleTouchStart = (e: TouchEvent) => {
            stopMomentum();
            lastY = e.touches[0].clientY;
            lastTime = performance.now();
            velocity = 0;
        };
        const handleTouchMove = (e: TouchEvent) => {
            e.preventDefault();
            const currentY = e.touches[0].clientY;
            const now = performance.now();
            const dt = Math.max(now - lastTime, 1);
            const delta = (lastY - currentY) * TOUCH_MULTIPLIER;
            velocity = delta / dt;
            lastY = currentY;
            lastTime = now;
            applyDelta(delta);
        };
        const handleTouchEnd = () => {
            if (Math.abs(velocity) > MOMENTUM_MIN_VELOCITY) {
                momentumFrame = requestAnimationFrame(runMomentum);
            }
        };

        window.addEventListener("wheel", handleWheel, { passive: false });
        window.addEventListener("touchstart", handleTouchStart, { passive: true });
        window.addEventListener("touchmove", handleTouchMove, { passive: false });
        window.addEventListener("touchend", handleTouchEnd, { passive: true });
        window.addEventListener("touchcancel", handleTouchEnd, { passive: true });

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            window.removeEventListener("wheel", handleWheel);
            window.removeEventListener("touchstart", handleTouchStart);
            window.removeEventListener("touchmove", handleTouchMove);
            window.removeEventListener("touchend", handleTouchEnd);
            window.removeEventListener("touchcancel", handleTouchEnd);
            stopMomentum();
            document.body.style.overflow = previousOverflow;
        };
    }, [progress]);

    return (
        <section className="relative w-full h-screen overflow-hidden">
            <ScrollyCanvas progress={progress} images={images} frameCount={FRAME_COUNT} />
            <Overlay progress={progress} />
        </section>
    );
};
