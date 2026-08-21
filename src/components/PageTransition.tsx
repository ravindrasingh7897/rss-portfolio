"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useNavDirection } from "./NavDirectionContext";

const variants = {
    enter: (direction: number) => ({
        x: direction >= 0 ? 60 : -60,
        opacity: 0,
    }),
    center: {
        x: 0,
        opacity: 1,
    },
    exit: (direction: number) => ({
        x: direction >= 0 ? -60 : 60,
        opacity: 0,
    }),
};

export const PageTransition = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    const { direction } = useNavDirection();

    return (
        <AnimatePresence mode="wait" custom={direction} initial={false}>
            <motion.div
                key={pathname}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
};
