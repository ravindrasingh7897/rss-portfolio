"use client";

import React from "react";
import { Trophy, GraduationCap, HandCoins } from "lucide-react";
import { GlowCard } from "./GlowCard";

export const Achievements = () => {
    const items = [
        {
            icon: GraduationCap,
            stat: "150+",
            title: "Competitive Programming & Academics",
            desc: "Coding problems solved, plus a 97.7 percentile in JEE Mains 2022.",
            glow: "from-blue-500 via-indigo-500 to-transparent",
        },
        {
            icon: Trophy,
            stat: "12+",
            title: "Teaching Assistant, IoT Lab",
            desc: "Labs conducted using Arduino, ESP8266, DHT22, and HiveMQ.",
            glow: "from-fuchsia-500 via-purple-500 to-transparent",
        },
        {
            icon: HandCoins,
            stat: "₹20L+",
            title: "Sponsorship Lead, Plinth",
            desc: "Raised in sponsorships; managed guests including Sandeep Jain, Mohd. Irfan, and Sunburn.",
            glow: "from-emerald-500 via-teal-500 to-transparent",
        },
    ];

    return (
        <section className="relative w-full min-h-screen flex flex-col pt-24 pb-32 px-6 md:px-16 overflow-hidden pointer-events-none">
            <div className="relative z-20 max-w-6xl mx-auto space-y-16 w-full pointer-events-auto">
                <div className="space-y-4">
                    <h2 className="text-4xl md:text-5xl font-semibold tracking-tighter text-white">
                        Achievements
                    </h2>
                    <div className="h-0.5 w-12 bg-white rounded-full" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {items.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <GlowCard key={item.title} glow={item.glow} index={index} className="p-8">
                                <div className="flex items-start justify-between mb-6">
                                    <div className="h-12 w-12 rounded-full flex items-center justify-center bg-zinc-800/80 group-hover:bg-white text-white group-hover:text-black transition-colors duration-300 shadow">
                                        <Icon strokeWidth={2} size={22} />
                                    </div>
                                    <span className="text-3xl font-bold tracking-tight text-white">
                                        {item.stat}
                                    </span>
                                </div>

                                <h3 className="text-xl tracking-tight font-semibold text-white mb-3">
                                    {item.title}
                                </h3>
                                <p className="text-zinc-400 font-light leading-relaxed">
                                    {item.desc}
                                </p>
                            </GlowCard>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};
