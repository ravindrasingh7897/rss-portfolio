"use client";

import React from "react";
import { motion } from "framer-motion";
import { useNavDirection } from "@/components/NavDirectionContext";

export default function Template({ children }: { children: React.ReactNode }) {
    const { direction } = useNavDirection();

    return (
        <motion.div
            initial={{ x: direction >= 0 ? 60 : -60 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
            {children}
        </motion.div>
    );
}
