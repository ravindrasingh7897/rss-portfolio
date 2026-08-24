"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { useFinePointer } from "@/hooks/useFinePointer";

type GlowCardProps = {
    children: React.ReactNode;
    glow?: string;
    index?: number;
    className?: string;
};

export const GlowCard = ({ children, glow, className }: GlowCardProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const isFinePointer = useFinePointer();
    const mouseX = useMotionValue(0.5);
    const mouseY = useMotionValue(0.5);

    const rotateX = useSpring(useTransform(mouseY, [0, 1], [8, -8]), {
        stiffness: 200,
        damping: 20,
    });
    const rotateY = useSpring(useTransform(mouseX, [0, 1], [-8, 8]), {
        stiffness: 200,
        damping: 20,
    });

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isFinePointer) return;
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        mouseX.set((e.clientX - rect.left) / rect.width);
        mouseY.set((e.clientY - rect.top) / rect.height);
    };

    const handleMouseLeave = () => {
        mouseX.set(0.5);
        mouseY.set(0.5);
    };

    return (
        <div style={isFinePointer ? { perspective: 800 } : undefined} className="h-full">
            <motion.div
                ref={ref}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={isFinePointer ? { rotateX, rotateY, transformStyle: "preserve-3d" } : undefined}
                className={twMerge(
                    "group relative h-full rounded-3xl bg-zinc-900/40 border border-zinc-800/60 backdrop-blur-md overflow-hidden transition-colors duration-500 hover:border-zinc-700 hover:bg-zinc-800/40",
                    className
                )}
            >
                {glow && (
                    <div
                        className={`absolute -z-10 -bottom-16 -right-10 h-56 w-56 md:h-64 md:w-64 rounded-full blur-3xl opacity-30 group-hover:opacity-50 transition-opacity duration-700 bg-gradient-to-tr ${glow} pointer-events-none`}
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                {children}
            </motion.div>
        </div>
    );
};
