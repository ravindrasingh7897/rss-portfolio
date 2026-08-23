"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { GlowCard } from "./GlowCard";

export const Projects = () => {
    const cases = [
        {
            title: "SkillsOn",
            label: "Fullstack • Web",
            desc: "Developed and deployed a scalable LMS at Production level using the MERN stack, Tailwind CSS, and Vercel/DigitalOcean. Integrated secure authentication and DRM-protected video streaming.",
            link: "https://skills-on-frontend.vercel.app/",
            image: "/projects/skillson.png",
            glow: "from-blue-500 via-indigo-500 to-transparent",
        },
        {
            title: "My Poll",
            label: "Fullstack • Real-Time",
            desc: "Built a real-time polling app with teacher-student roles using Next.js, Express.js, and Socket.io. Implemented live updates, custom timers, and instant results.",
            link: "https://mypoll-beryl.vercel.app/",
            image: "/projects/My_poll.png",
            glow: "from-fuchsia-500 via-purple-500 to-transparent",
        },
        {
            title: "Travelhub",
            label: "Frontend • Booking",
            desc: "A tourism platform for Himachal Pradesh offering tour packages, booking with Stripe payments, and OTP-based profile management.",
            link: "https://travelhub-app.vercel.app",
            image: "/projects/Travel_hub.png",
            glow: "from-emerald-500 via-teal-500 to-transparent",
        },
        {
            title: "Coin Trackr",
            label: "Frontend • Finance",
            desc: "A Coin tracking dashboard application displaying live cryptocurrency prices by integrating the CoinGecko API for real-time market data visualization.",
            link: "https://cointrackr-rss-projects-446bee74.vercel.app/",
            image: "/projects/Coin_tracker.png",
            glow: "from-amber-500 via-orange-500 to-transparent",
        },
    ];

    return (
        <section className="relative w-full min-h-screen flex flex-col pt-24 pb-32 px-6 md:px-16 overflow-hidden pointer-events-none">
            <div className="relative z-20 max-w-5xl mx-auto space-y-16 w-full pointer-events-auto">
                <div className="space-y-4">
                    <h2 className="text-4xl md:text-5xl font-semibold tracking-tighter text-white">
                        Selected Works
                    </h2>
                    <div className="h-0.5 w-12 bg-white rounded-full" />
                </div>

                <div className="space-y-8">
                    {cases.map((project, index) => (
                        <a
                            key={project.title}
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block"
                        >
                            <GlowCard glow={project.glow} index={index} className="p-8 md:p-10">
                                <div className="flex flex-col md:flex-row md:items-center gap-8">
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start mb-8 md:mb-16">
                                            <span className="text-sm font-medium text-zinc-400 tracking-wider uppercase">
                                                {project.label}
                                            </span>
                                            <div className="h-10 w-10 rounded-full flex items-center justify-center bg-zinc-800/80 group-hover:bg-white text-white group-hover:text-black transition-colors duration-300 shadow shrink-0">
                                                <ArrowUpRight strokeWidth={2.5} size={20} className="transform group-hover:rotate-12 transition-transform" />
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <h3 className="text-3xl tracking-tight font-semibold text-white group-hover:text-zinc-100 transition-colors">
                                                {project.title}
                                            </h3>
                                            <p className="text-zinc-400 font-light leading-relaxed max-w-2xl">
                                                {project.desc}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="relative w-full md:w-2/5 aspect-video shrink-0 rounded-2xl overflow-hidden border border-white/10">
                                        <Image
                                            src={project.image}
                                            alt={project.title}
                                            fill
                                            sizes="(min-width: 768px) 40vw, 100vw"
                                            className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                                        />
                                    </div>
                                </div>
                            </GlowCard>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};
