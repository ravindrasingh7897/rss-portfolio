"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useFinePointer } from "@/hooks/useFinePointer";

type CommonProps = {
    children: React.ReactNode;
    className?: string;
    strength?: number;
};

type DragConflictKeys = "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart";

type AnchorProps = CommonProps &
    Omit<React.ComponentPropsWithoutRef<"a">, "className" | "children" | DragConflictKeys> & {
        as?: "a";
    };

type ButtonProps = CommonProps &
    Omit<React.ComponentPropsWithoutRef<"button">, "className" | "children" | DragConflictKeys> & {
        as: "button";
    };

type MagneticButtonProps = AnchorProps | ButtonProps;

export function MagneticButton({
    as = "a",
    children,
    className,
    strength = 0.35,
    ...props
}: MagneticButtonProps) {
    const ref = useRef<HTMLElement>(null);
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const isFinePointer = useFinePointer();

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isFinePointer) return;
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        const relX = e.clientX - (rect.left + rect.width / 2);
        const relY = e.clientY - (rect.top + rect.height / 2);
        setPos({ x: relX * strength, y: relY * strength });
    };

    const handleMouseLeave = () => setPos({ x: 0, y: 0 });

    const shared = {
        "data-magnetic": "true" as const,
        animate: { x: pos.x, y: pos.y },
        transition: { type: "spring" as const, stiffness: 150, damping: 15, mass: 0.1 },
        onMouseMove: handleMouseMove,
        onMouseLeave: handleMouseLeave,
        className,
    };

    if (as === "button") {
        return (
            <motion.button
                ref={ref as React.Ref<HTMLButtonElement>}
                {...shared}
                {...(props as Omit<ButtonProps, keyof CommonProps | "as">)}
            >
                {children}
            </motion.button>
        );
    }

    return (
        <motion.a
            ref={ref as React.Ref<HTMLAnchorElement>}
            {...shared}
            {...(props as Omit<AnchorProps, keyof CommonProps | "as">)}
        >
            {children}
        </motion.a>
    );
}
