"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";
import { SpaceBackground } from "./SpaceBackground";

export const Projects = () => {
    const cases = [
        {
            title: "SkillsOn",
            label: "Fullstack • Web",
            desc: "Developed and deployed a scalable LMS at Production level using the MERN stack, Tailwind CSS, and Vercel/DigitalOcean. Integrated secure authentication and DRM-protected video streaming.",
            link: "https://skills-on-frontend.vercel.app/"
        },
        {
            title: "My Poll",
            label: "Fullstack • Real-Time",
            desc: "Built a real-time polling app with teacher-student roles using Next.js, Express.js, and Socket.io. Implemented live updates, custom timers, and instant results.",
            link: "https://mypoll-beryl.vercel.app/"
        },
        {
            title: "Travelhub",
            label: "Frontend • Booking",
            desc: "A tourism platform for Himachal Pradesh offering tour packages, booking with Stripe payments, and OTP-based profile management.",
            link: "https://travelhub-app.vercel.app"
        },
        {
            title: "Coin Trackr",
            label: "Frontend • Finance",
            desc: "A Coin tracking dashboard application displaying live cryptocurrency prices by integrating the CoinGecko API for real-time market data visualization.",
            link: "https://cointrackr-rss-projects-446bee74.vercel.app/"
        },
    ];

    return (
        <section className="relative w-full min-h-screen bg-[#000000] flex flex-col pt-24 pb-32 px-6 md:px-16 overflow-hidden">
            <SpaceBackground />

            <div className="relative z-20 max-w-5xl mx-auto space-y-16 w-full">
                <div className="space-y-4">
                    <h2 className="text-4xl md:text-5xl font-semibold tracking-tighter text-white">
                        Selected Works
                    </h2>
                    <div className="h-0.5 w-12 bg-white rounded-full" />
                </div>

                <div className="space-y-8">
                    {cases.map((project, idx) => (
                        <a
                            key={idx}
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative flex flex-col p-8 md:p-10 rounded-3xl bg-zinc-900/40 border border-zinc-800/60 backdrop-blur-md overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:border-zinc-700 hover:bg-zinc-800/40 block"
                        >
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                            <div className="flex justify-between items-start mb-16">
                                <span className="text-sm font-medium text-zinc-400 tracking-wider uppercase">
                                    {project.label}
                                </span>
                                <div className="h-10 w-10 rounded-full flex items-center justify-center bg-zinc-800/80 group-hover:bg-white text-white group-hover:text-black transition-colors duration-300 shadow">
                                    <ArrowUpRight strokeWidth={2.5} size={20} className="transform group-hover:rotate-12 transition-transform" />
                                </div>
                            </div>

                            <div className="space-y-3 mt-auto">
                                <h3 className="text-3xl tracking-tight font-semibold text-white group-hover:text-zinc-100 transition-colors">
                                    {project.title}
                                </h3>
                                <p className="text-zinc-400 font-light leading-relaxed max-w-2xl">
                                    {project.desc}
                                </p>
                            </div>
                        </a>
                    ))}
                </div>
            </div>

        </section>
    );
};
