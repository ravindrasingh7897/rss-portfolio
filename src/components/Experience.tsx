"use client";

import React from "react";

export const Experience = () => {
    const roles = [
        {
            company: "KuKi Solutions",
            title: "SDE",
            location: "On-Site",
            period: "November 2025 – Present",
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
            points: [
                "Built responsive, accessible UIs for 3+ client-facing apps using React.js and Tailwind CSS, and integrated RESTful APIs in collaboration with backend teams.",
                "Engineered a full-featured Admin Panel with Excel export (xlsx), secure uploads (Multer), MongoDB, and PDF certificates (jsPDF).",
            ],
        },
    ];

    return (
        <section className="relative w-full min-h-screen flex flex-col pt-24 pb-32 px-6 md:px-16 overflow-hidden">
            <div className="relative z-20 max-w-5xl mx-auto space-y-16 w-full">
                <div className="space-y-4">
                    <h2 className="text-4xl md:text-5xl font-semibold tracking-tighter text-white">
                        Experience
                    </h2>
                    <div className="h-0.5 w-12 bg-white rounded-full" />
                </div>

                <div className="space-y-8">
                    {roles.map((role) => (
                        <div
                            key={role.company}
                            className="group relative flex flex-col p-8 md:p-10 rounded-3xl bg-zinc-900/40 border border-zinc-800/60 backdrop-blur-md overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:border-zinc-700 hover:bg-zinc-800/40"
                        >
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

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

                            <ul className="space-y-3">
                                {role.points.map((point, i) => (
                                    <li
                                        key={i}
                                        className="text-zinc-400 font-light leading-relaxed pl-5 relative before:content-[''] before:absolute before:left-0 before:top-[0.6em] before:h-1 before:w-1 before:rounded-full before:bg-zinc-500"
                                    >
                                        {point}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
