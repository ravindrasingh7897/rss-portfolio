"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

type Panel = "nav" | "social" | null;

const MobilePanelContext = createContext<{
    openPanel: Panel;
    setOpenPanel: (panel: Panel) => void;
} | null>(null);

export const MobilePanelProvider = ({ children }: { children: React.ReactNode }) => {
    const [openPanel, setOpenPanel] = useState<Panel>(null);
    const pathname = usePathname();

    useEffect(() => {
        setOpenPanel(null);
    }, [pathname]);

    return (
        <MobilePanelContext.Provider value={{ openPanel, setOpenPanel }}>
            {children}
        </MobilePanelContext.Provider>
    );
};

export const useMobilePanel = () => {
    const ctx = useContext(MobilePanelContext);
    if (!ctx) throw new Error("useMobilePanel must be used within MobilePanelProvider");
    return ctx;
};
