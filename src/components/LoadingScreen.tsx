"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useHeroLoading } from "./HeroLoadingContext";

export const LoadingScreen = () => {
    const { progress, isLoading } = useHeroLoading();
    const percent = Math.round(progress * 100);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black"
                >
                    <div className="w-48 h-[2px] bg-white/10 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-white transition-[width] duration-200 ease-out"
                            style={{ width: `${percent}%` }}
                        />
                    </div>
                    <p className="mt-4 text-sm text-zinc-500 tracking-widest tabular-nums">
                        {percent}%
                    </p>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
