"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { routes } from "@/lib/routes";
import { useNavDirection } from "./NavDirectionContext";
import { MagneticButton } from "./MagneticButton";

export const PageArrows = () => {
    const router = useRouter();
    const pathname = usePathname();
    const { setDirection } = useNavDirection();

    const currentIndex = routes.findIndex((route) => route.path === pathname);
    const safeIndex = currentIndex === -1 ? 0 : currentIndex;

    const go = (delta: number) => {
        setDirection(delta);
        const nextIndex = (safeIndex + delta + routes.length) % routes.length;
        router.push(routes[nextIndex].path);
    };

    return (
        <>
            <MagneticButton
                as="button"
                onClick={() => go(-1)}
                aria-label="Previous page"
                className="fixed left-4 md:left-8 top-1/2 -translate-y-1/2 z-40 h-12 w-12 rounded-full flex items-center justify-center bg-black/40 backdrop-blur-2xl backdrop-saturate-150 border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.5),inset_0_1px_1px_0_rgba(255,255,255,0.15)] text-white/80 hover:text-white hover:bg-black/60 transition-colors duration-300"
            >
                <ChevronLeft size={22} />
            </MagneticButton>
            <MagneticButton
                as="button"
                onClick={() => go(1)}
                aria-label="Next page"
                className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-40 h-12 w-12 rounded-full flex items-center justify-center bg-black/40 backdrop-blur-2xl backdrop-saturate-150 border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.5),inset_0_1px_1px_0_rgba(255,255,255,0.15)] text-white/80 hover:text-white hover:bg-black/60 transition-colors duration-300"
            >
                <ChevronRight size={22} />
            </MagneticButton>
        </>
    );
};
