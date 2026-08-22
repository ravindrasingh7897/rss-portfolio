"use client";

import React, { useEffect, useRef } from "react";
import { MotionValue, useMotionValueEvent } from "framer-motion";

export const ScrollyCanvas = ({
    progress,
    images,
    frameCount,
}: {
    progress: MotionValue<number>;
    images: HTMLImageElement[];
    frameCount: number;
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const renderFrame = (value: number) => {
        if (!canvasRef.current || images.length === 0) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const index = Math.min(
            frameCount - 1,
            Math.max(0, Math.round(value * (frameCount - 1)))
        );
        const img = images[index];
        if (!img) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const ratio = Math.max(canvas.width / img.width, canvas.height / img.height);
        const centerShiftX = (canvas.width - img.width * ratio) / 2;
        const centerShiftY = (canvas.height - img.height * ratio) / 2;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(
            img,
            0,
            0,
            img.width,
            img.height,
            centerShiftX,
            centerShiftY,
            img.width * ratio,
            img.height * ratio
        );
    };

    useEffect(() => {
        if (images.length > 0) renderFrame(progress.get());
    }, [images]);

    useMotionValueEvent(progress, "change", (latest) => {
        renderFrame(latest);
    });

    useEffect(() => {
        const handleResize = () => renderFrame(progress.get());
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [images]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 h-full w-full object-cover opacity-90"
        />
    );
};
