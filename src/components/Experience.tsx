"use client";

import React from "react";
import { GlowCard } from "./GlowCard";

export const Experience = () => {
    const roles = [
        {
            company: "KuKi Solutions",
            title: "SDE",
            location: "On-Site",
            period: "November 2025 – Present",
            glow: "from-blue-500 via-indigo-500 to-transparent",
            tech: ["Next.js", "React", "FastAPI", "Celery", "Redis", "MySQL", "MongoDB", "Azure OpenAI", "Gemini"],
            points: [
                "Co-built two GenAI-powered ESG & BRSR compliance platforms, cutting report preparation time from months to hours for 4-5 clients; independently designed and shipped the product's landing website.",
                "Built a multi-provider LLM pipeline (Azure OpenAI, Google Gemini via AI Studio/Vertex AI for OCR + extraction) with Langfuse tracing and retry/backoff handling, powering document classification, checklist auto-mapping, and structured ESG data extraction.",
                "Collaborated with the backend team to build an async batch-processing system (FastAPI, Celery, Redis) for document pipelines, using MySQL (SQLAlchemy) and MongoDB (Motor), with cross-service RS256 JWT authentication between the Node.js and Python backends.",
                "Built ESG dashboards and automated PDF reports (Next.js, React, Jinja2/WeasyPrint) with multilingual support, allowing users to review and edit AI-generated reports before export.",
            ],
        },
        {
            company: "SkillsOn",
            title: "Tech Lead",
            location: "Remote",
            period: "March 2025 – August 2025",
            glow: "from-fuchsia-500 via-purple-500 to-transparent",
            tech: ["Vercel", "DigitalOcean", "Cloudinary", "VdoCipher", "Google OAuth", "Razorpay", "Nodemailer"],
            points: [
                "Led end-to-end development of a scalable LMS, and deployed the platform to production using Vercel, DigitalOcean, and Cloudinary to serve 100+ users in the first month.",
                "Streamed recorded lectures via VdoCipher DRM, enhancing engagement for 80%+ of enrolled learners.",
                "Integrated secure authentication using Google OAuth 2.0, JWT, and session handling, increasing signup/login success rate by 35%.",
                "Enabled payments via Razorpay and purchase workflows for course access and post purchase emails using Nodemailer.",
            ],
        },
        {
            company: "CoreTeams Softech Pvt. Ltd",
            title: "Front-end Developer",
            location: "Hybrid",
            period: "June 2024 – July 2024",
            glow: "from-emerald-500 via-teal-500 to-transparent",
            tech: ["React.js", "Tailwind CSS", "Multer", "MongoDB", "jsPDF"],
            points: [
                "Built responsive, accessible UIs for 3+ client-facing apps using React.js and Tailwind CSS, and integrated RESTful APIs in collaboration with backend teams.",
                "Engineered a full-featured Admin Panel with Excel export (xlsx), secure uploads (Multer), MongoDB, and PDF certificates (jsPDF).",
            ],
        },
    ];

    return (
        <section className="relative w-full min-h-screen flex flex-col pt-24 pb-32 px-6 md:px-16 overflow-hidden pointer-events-none">
            <div className="relative z-20 max-w-5xl mx-auto space-y-16 w-full pointer-events-auto">
                <div className="space-y-4">
                    <h2 className="text-4xl md:text-5xl font-semibold tracking-tighter text-white">
                        Experience
                    </h2>
                    <div className="h-0.5 w-12 bg-white rounded-full" />
                </div>

                <div className="space-y-8">
                    {roles.map((role, index) => (
                        <GlowCard key={role.company} glow={role.glow} index={index} className="p-8 md:p-10">
                            <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 mb-6">
                                <div>
                                    <h3 className="text-2xl md:text-3xl tracking-tight font-semibold text-white">
                                        {role.title}
                                    </h3>
                                    <p className="text-zinc-400 font-light mt-1">
                                        {role.company} · {role.location}
                                    </p>
                                </div>
                                <span className="text-sm font-medium text-zinc-400 tracking-wider uppercase shrink-0">
                                    {role.period}
                                </span>
                            </div>

                            <ul className="space-y-3 mb-6">
                                {role.points.map((point, i) => (
                                    <li
                                        key={i}
                                        className="text-zinc-400 font-light leading-relaxed pl-5 relative before:content-[''] before:absolute before:left-0 before:top-[0.6em] before:h-1 before:w-1 before:rounded-full before:bg-zinc-500"
                                    >
                                        {point}
                                    </li>
                                ))}
                            </ul>

                            <div className="flex flex-wrap gap-2">
                                {role.tech.map((tag) => (
                                    <span
                                        key={tag}
                                        className="text-xs font-medium px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-300"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </GlowCard>
                    ))}
                </div>
            </div>
        </section>
    );
};
