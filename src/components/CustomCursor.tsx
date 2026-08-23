"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useFinePointer } from "@/hooks/useFinePointer";

const BASE_SIZE = 32;
const MAGNET_PADDING = 12;

export const CustomCursor = () => {
    const isFinePointer = useFinePointer();
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [magnetRect, setMagnetRect] = useState<DOMRect | null>(null);

    useEffect(() => {
        if (!isFinePointer) return;

        const updateMousePosition = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const magneticEl = target.closest("[data-magnetic]") as HTMLElement | null;

            if (magneticEl) {
                setMagnetRect(magneticEl.getBoundingClientRect());
                setIsHovering(true);
                return;
            }

            setMagnetRect(null);
            if (
                target.tagName.toLowerCase() === "a" ||
                target.tagName.toLowerCase() === "button" ||
                target.closest("a") ||
                target.closest("button")
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener("mousemove", updateMousePosition);
        window.addEventListener("mouseover", handleMouseOver);

        return () => {
            window.removeEventListener("mousemove", updateMousePosition);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, [isFinePointer]);

    if (!isFinePointer) return null;

    const outerSize = magnetRect
        ? Math.max(magnetRect.width, magnetRect.height) + MAGNET_PADDING
        : isHovering
            ? BASE_SIZE * 1.5
            : BASE_SIZE;

    const outerX = magnetRect ? magnetRect.left + magnetRect.width / 2 : mousePosition.x;
    const outerY = magnetRect ? magnetRect.top + magnetRect.height / 2 : mousePosition.y;

    return (
        <>
            <motion.div
                className="fixed top-0 left-0 rounded-full border border-white/50 pointer-events-none z-[9999]"
                animate={{
                    x: outerX - outerSize / 2,
                    y: outerY - outerSize / 2,
                    width: outerSize,
                    height: outerSize,
                }}
                transition={{
                    type: "spring",
                    stiffness: magnetRect ? 400 : 300,
                    damping: magnetRect ? 30 : 20,
                    mass: 0.5,
                }}
            />
            <motion.div
                className="fixed top-0 left-0 w-2 h-2 rounded-full bg-white pointer-events-none z-[9999]"
                animate={{
                    x: mousePosition.x - 4,
                    y: mousePosition.y - 4,
                    scale: isHovering ? 0 : 1,
                }}
                transition={{
                    type: "spring",
                    stiffness: 800,
                    damping: 25,
                    mass: 0.1,
                }}
            />
        </>
    );
};
