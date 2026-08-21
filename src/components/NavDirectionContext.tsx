"use client";

import React, { createContext, useContext, useState } from "react";

type NavDirectionContextValue = {
    direction: number;
    setDirection: (direction: number) => void;
};

const NavDirectionContext = createContext<NavDirectionContextValue | null>(null);

export const NavDirectionProvider = ({ children }: { children: React.ReactNode }) => {
    const [direction, setDirection] = useState(1);
    return (
        <NavDirectionContext.Provider value={{ direction, setDirection }}>
            {children}
        </NavDirectionContext.Provider>
    );
};

export const useNavDirection = () => {
    const ctx = useContext(NavDirectionContext);
    if (!ctx) throw new Error("useNavDirection must be used within NavDirectionProvider");
    return ctx;
};
