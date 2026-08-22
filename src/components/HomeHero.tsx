"use client";

import React, { useEffect, useRef, useState } from "react";
import { useMotionValue } from "framer-motion";
import { ScrollyCanvas } from "./ScrollyCanvas";
import { Overlay } from "./Overlay";
import { useHeroLoading } from "./HeroLoadingContext";

// Virtual scroll units needed to sweep through the sequence once.
// Larger = slower, more cinematic pacing per direction.
const SWEEP_RANGE = 12000;
const TOUCH_MULTIPLIER = 3;
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
            <ScrollyCanvas progress={progress} images={images} frameCount={FRAME_COUNT} />
            <Overlay progress={progress} />
        </section>
    );
};
