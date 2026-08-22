"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { routes } from "@/lib/routes";
import { useNavDirection } from "./NavDirectionContext";

export const Navbar = () => {
    const pathname = usePathname();
    const [expanded, setExpanded] = useState(false);
    const { setDirection } = useNavDirection();

    const currentIndex = routes.findIndex((route) => route.path === pathname);
    const current = routes[currentIndex === -1 ? 0 : currentIndex];

    useEffect(() => {
        setExpanded(false);
    }, [pathname]);

    const handleSelect = (index: number) => {
        setDirection(index > currentIndex ? 1 : -1);
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center py-6 pointer-events-none">
            <motion.div
                layout
                onMouseEnter={() => setExpanded(true)}
                onMouseLeave={() => setExpanded(false)}
                transition={{ layout: { type: "spring", stiffness: 400, damping: 32 } }}
                className={twMerge(
                    clsx(
                        "relative flex items-center rounded-full pointer-events-auto overflow-hidden",
                        "bg-black/40 backdrop-blur-2xl backdrop-saturate-150",
                        "border border-white/10",
                        "shadow-[0_8px_32px_0_rgba(0,0,0,0.5),inset_0_1px_1px_0_rgba(255,255,255,0.15)]"
                    )
                )}
            >
                <AnimatePresence mode="popLayout" initial={false}>
                    {!expanded ? (
                        <motion.div
                            key="collapsed"
                            style={{ originX: 0.5 }}
                            initial={{ opacity: 0, scale: 0.6 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.6 }}
                            transition={{ duration: 0.25 }}
                            className="px-6 py-3 text-sm font-medium text-white"
                        >
                            <AnimatePresence mode="wait" initial={false}>
                                <motion.span
                                    key={current.path}
                                    initial={{ y: 10, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: -10, opacity: 0 }}
                                    transition={{ duration: 0.25 }}
                                    className="block"
                                >
                                    {current.name}
                                </motion.span>
                            </AnimatePresence>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="expanded"
                            style={{ originX: 0.5 }}
                            initial={{ opacity: 0, scale: 0.6 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.6 }}
                            transition={{ duration: 0.25 }}
                            className="flex items-center gap-1 px-2 py-2"
                        >
                            {routes.map((route, index) => {
                                const isActive = route.path === pathname;
                                return (
                                    <Link
                                        key={route.path}
                                        href={route.path}
                                        onClick={() => handleSelect(index)}
                                        className="relative px-4 py-2 rounded-full text-sm font-medium"
                                    >
                                        {isActive && (
                                            <motion.span
                                                layoutId="nav-active-pill"
                                                className="absolute inset-0 rounded-full bg-white"
                                                transition={{ type: "spring", stiffness: 350, damping: 30 }}
                                            />
                                        )}
                                        <span
                                            className={twMerge(
                                                "relative z-10 transition-colors duration-300",
                                                isActive
                                                    ? "text-black"
                                                    : "text-zinc-300 hover:text-white"
                                            )}
                                        >
                                            {route.name}
                                        </span>
                                    </Link>
                                );
                            })}
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </nav>
    );
};
