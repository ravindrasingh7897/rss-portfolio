"use client";

import React from "react";
import { motion, MotionValue, useTransform } from "framer-motion";

const ABOUT_PARAGRAPH =
    "I'm a full-stack developer who enjoys turning complex problems into simple, elegant systems. Currently building GenAI-powered platforms at KuKi Solutions, with a B.Tech in Computer Science from LNMIIT Jaipur — always chasing pixel-perfect interfaces and resilient backends.";

const RevealWord = ({
    word,
    progress,
    range,
}: {
    word: string;
    progress: MotionValue<number>;
    range: [number, number];
}) => {
    const opacity = useTransform(progress, range, [0.2, 1]);
    return (
        <motion.span style={{ opacity }} className="text-white">
            {word}{" "}
        </motion.span>
    );
};

export const Overlay = ({ progress }: { progress: MotionValue<number> }) => {
    // Three evenly-spaced beats (0-0.333, 0.333-0.667, 0.667-1),
    // each with the same crossfade overlap into the next.
    const opacity1 = useTransform(progress, [0, 0.28, 0.333], [1, 1, 0]);
    const y1 = useTransform(progress, [0, 0.333], [0, -100]);

    const opacity2 = useTransform(progress, [0.28, 0.333, 0.63, 0.667], [0, 1, 1, 0]);
    const y2 = useTransform(progress, [0.28, 0.667], [100, -100]);

    const opacity3 = useTransform(progress, [0.63, 0.667, 1], [0, 1, 1]);
    const y3 = useTransform(progress, [0.63, 1], [100, -50]);

    const panel =
        "bg-black/25 backdrop-blur-md border border-white/10 rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.45),inset_0_1px_1px_0_rgba(255,255,255,0.1)]";

    const words = ABOUT_PARAGRAPH.split(" ");
    const revealStart = 0.667;
    const revealEnd = 1;
    const span = revealEnd - revealStart;

    return (
        <div className="pointer-events-none absolute inset-0 z-10 w-full h-full flex flex-col justify-center overflow-hidden">
            <motion.div
                style={{ opacity: opacity1, y: y1 }}
                className="absolute inset-0 flex flex-col items-center justify-center text-center p-6"
            >
                <div className={`${panel} px-8 py-6 md:px-14 md:py-10`}>
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white">
                        Ravindra Singh
                    </h1>
                    <p className="mt-4 text-xl md:text-2xl text-zinc-300 font-light tracking-wide max-w-lg">
                        Software Developer — Full-Stack &amp; GenAI
                    </p>
                </div>
            </motion.div>

            <motion.div
                style={{ opacity: opacity2, y: y2 }}
                className="absolute inset-0 flex flex-col justify-center items-start p-6 md:p-24"
            >
                <div className={`${panel} px-6 py-6 md:px-10 md:py-8 max-w-md md:max-w-xl`}>
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
                        I engineer GenAI-powered platforms.
                    </h2>
                    <p className="mt-4 text-base md:text-xl text-zinc-400 font-light">
                        From LLM pipelines to production deployments — full-stack systems
                        built to scale.
                    </p>
                </div>
            </motion.div>

            <motion.div
                style={{ opacity: opacity3, y: y3 }}
                className="absolute inset-0 flex flex-col justify-center items-start p-6 md:p-24"
            >
                <div className={`${panel} px-6 py-6 md:px-10 md:py-8 max-w-md md:max-w-xl`}>
                    <p className="text-xs uppercase tracking-widest text-zinc-500 mb-3">
                        About
                    </p>
                    <p className="text-lg md:text-2xl leading-relaxed font-light">
                        {words.map((word, i) => {
                            const start = revealStart + (i / words.length) * span;
                            const end = revealStart + ((i + 1) / words.length) * span;
                            return (
                                <RevealWord
                                    key={i}
                                    word={word}
                                    progress={progress}
                                    range={[start, end]}
                                />
                            );
                        })}
                    </p>
                </div>
            </motion.div>

            <motion.div
                style={{ opacity: opacity3, y: y3 }}
                className="absolute inset-0 flex flex-col justify-center items-end text-right p-6 md:p-24"
            >
                <div className={`${panel} px-5 py-4 md:px-6 md:py-5 max-w-xs`}>
                    <h2 className="text-lg md:text-xl font-bold tracking-tight text-white">
                        Precision in every layer.
                    </h2>
                    <p className="mt-2 text-sm text-zinc-400 font-light">
                        Pixel-perfect interfaces, resilient backends.
                    </p>
                </div>
            </motion.div>
        </div>
    );
};
