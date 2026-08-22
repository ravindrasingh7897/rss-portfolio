"use client";

import React, { createContext, useContext, useState } from "react";

type HeroLoadingContextValue = {
    progress: number;
    isLoading: boolean;
    setProgress: (progress: number) => void;
    setIsLoading: (isLoading: boolean) => void;
};

const HeroLoadingContext = createContext<HeroLoadingContextValue | null>(null);

export const HeroLoadingProvider = ({ children }: { children: React.ReactNode }) => {
    const [progress, setProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    return (
        <HeroLoadingContext.Provider value={{ progress, isLoading, setProgress, setIsLoading }}>
            {children}
        </HeroLoadingContext.Provider>
    );
};

export const useHeroLoading = () => {
    const ctx = useContext(HeroLoadingContext);
    if (!ctx) throw new Error("useHeroLoading must be used within HeroLoadingProvider");
    return ctx;
};
