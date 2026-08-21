"use client";

import React from "react";
import { Trophy, GraduationCap, HandCoins } from "lucide-react";
import { SpaceBackground } from "./SpaceBackground";

export const Achievements = () => {
    const items = [
        {
            icon: GraduationCap,
            title: "Competitive Programming & Academics",
            desc: "Solved 150+ coding problems, and scored a 97.7 percentile in JEE Mains 2022.",
        },
        {
            icon: Trophy,
            title: "Teaching Assistant, IoT Lab",
            desc: "Conducted 12+ labs using Arduino, ESP8266, DHT22, and HiveMQ.",
        },
        {
            icon: HandCoins,
            title: "Sponsorship Lead, Plinth",
            desc: "Raised Rs. 20L+ in sponsorships; managed guests including Sandeep Jain, Mohd. Irfan, and Sunburn.",
        },
    ];

    return (
        <section className="relative w-full min-h-screen bg-[#121212] flex flex-col pt-24 pb-32 px-6 md:px-16 overflow-hidden">
            <SpaceBackground />

            <div className="relative z-20 max-w-6xl mx-auto space-y-16 w-full">
                <div className="space-y-4">
                    <h2 className="text-4xl md:text-5xl font-semibold tracking-tighter text-white">
                        Achievements
                    </h2>
                    <div className="h-0.5 w-12 bg-white rounded-full" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {items.map((item) => {
                        const Icon = item.icon;
                        return (
                            <div
                                key={item.title}
                                className="group relative flex flex-col p-8 rounded-3xl bg-zinc-900/40 border border-zinc-800/60 backdrop-blur-md overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:border-zinc-700 hover:bg-zinc-800/40"
                            >
                                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                                <div className="h-12 w-12 rounded-full flex items-center justify-center bg-zinc-800/80 group-hover:bg-white text-white group-hover:text-black transition-colors duration-300 shadow mb-8">
                                    <Icon strokeWidth={2} size={22} />
                                </div>

                                <h3 className="text-xl tracking-tight font-semibold text-white mb-3">
                                    {item.title}
                                </h3>
                                <p className="text-zinc-400 font-light leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};
