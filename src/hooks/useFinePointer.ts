"use client";

import { useEffect, useState } from "react";

// Coarse/touch devices don't have a real hover-tracking cursor, so effects
// that follow mouse position (magnetic pull, 3D tilt, custom cursor) can
// get stuck off-center after a tap instead of resetting on mouse-leave.
export const useFinePointer = () => {
    const [isFinePointer, setIsFinePointer] = useState(false);

    useEffect(() => {
        const mql = window.matchMedia("(hover: hover) and (pointer: fine)");
        setIsFinePointer(mql.matches);

        const handleChange = (e: MediaQueryListEvent) => setIsFinePointer(e.matches);
        mql.addEventListener("change", handleChange);
        return () => mql.removeEventListener("change", handleChange);
    }, []);

    return isFinePointer;
};
