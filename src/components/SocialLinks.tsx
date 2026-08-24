"use client";

import React from "react";
import {
    SiInstagram,
    SiGithub,
    SiLeetcode,
    SiCodeforces,
    SiGmail,
    SiWhatsapp,
    SiBuymeacoffee,
} from "react-icons/si";
import { FaXTwitter, FaLinkedin } from "react-icons/fa6";
import { AnimatePresence, motion } from "framer-motion";
import { Download, Link2, X } from "lucide-react";
import { MagneticButton } from "./MagneticButton";
import { useMobilePanel } from "./MobilePanelContext";

// TODO: replace remaining placeholders with the real links.
const LINKS = {
    instagram: "https://instagram.com/rss_7897",
    x: "#",
    linkedin: "https://linkedin.com/in/rss7897",
    github: "https://github.com/ravindrasingh7897",
    leetcode: "#",
    codeforces: "#",
    gmail: "mailto:ravindrasingh4632@gmail.com",
    whatsapp: "https://wa.me/918503987897",
    buyMeATea: "#",
    resume: "/resume.pdf",
};

const socials = [
    { href: LINKS.instagram, label: "Instagram", Icon: SiInstagram },
    { href: LINKS.x, label: "X", Icon: FaXTwitter },
    { href: LINKS.linkedin, label: "LinkedIn", Icon: FaLinkedin },
    { href: LINKS.github, label: "GitHub", Icon: SiGithub },
    { href: LINKS.leetcode, label: "LeetCode", Icon: SiLeetcode },
    { href: LINKS.codeforces, label: "Codeforces", Icon: SiCodeforces },
    { href: LINKS.gmail, label: "Gmail", Icon: SiGmail },
    { href: LINKS.whatsapp, label: "WhatsApp", Icon: SiWhatsapp },
];

const allLinks: { href: string; label: string; Icon: React.ElementType; download?: boolean }[] = [
    { href: LINKS.buyMeATea, label: "Buy me a tea", Icon: SiBuymeacoffee },
    { href: LINKS.resume, label: "Resume", Icon: Download, download: true },
    ...socials,
];

const iconButton =
    "group relative flex items-center justify-center h-10 w-10 rounded-full bg-black/40 backdrop-blur-2xl backdrop-saturate-150 border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.5),inset_0_1px_1px_0_rgba(255,255,255,0.15)] text-white/70 hover:text-white hover:bg-black/60 transition-colors duration-300";

const tooltip =
    "pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-black/70 backdrop-blur-xl border border-white/10 px-3 py-1 text-[11px] font-medium tracking-wide text-white/90 opacity-0 translate-y-1 scale-95 transition-all duration-200 ease-out group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100";

export const SocialLinks = () => {
    const { openPanel, setOpenPanel } = useMobilePanel();
    const mobileOpen = openPanel === "social";

    return (
        <>
            <div className="hidden md:flex fixed bottom-6 left-1/2 -translate-x-1/2 z-40 items-center gap-3 pointer-events-auto">
                {socials.map(({ href, label, Icon }) => (
                    <MagneticButton
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className={iconButton}
                    >
                        <span className={tooltip}>{label}</span>
                        <Icon size={17} />
                    </MagneticButton>
                ))}
            </div>

            <div className="hidden md:flex fixed bottom-6 left-6 md:left-8 z-40 items-center gap-3 pointer-events-auto">
                <MagneticButton
                    href={LINKS.buyMeATea}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Buy me a tea"
                    className={iconButton}
                >
                    <span className={tooltip}>Buy me a tea</span>
                    <SiBuymeacoffee size={17} />
                </MagneticButton>
                <MagneticButton
                    href={LINKS.resume}
                    download
                    aria-label="Download resume"
                    className={iconButton}
                >
                    <span className={tooltip}>Resume</span>
                    <Download size={18} />
                </MagneticButton>
            </div>

            <button
                onClick={() => setOpenPanel(mobileOpen ? null : "social")}
                aria-label={mobileOpen ? "Close links" : "Open links"}
                className="md:hidden fixed top-6 right-4 z-[60] h-11 w-11 rounded-full flex items-center justify-center bg-black/40 backdrop-blur-2xl backdrop-saturate-150 border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.5),inset_0_1px_1px_0_rgba(255,255,255,0.15)] text-white"
            >
                {mobileOpen ? <X size={19} /> : <Link2 size={19} />}
            </button>

            <AnimatePresence>
                {mobileOpen && (
                    <React.Fragment key="mobile-links">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setOpenPanel(null)}
                            className="md:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", stiffness: 320, damping: 32 }}
                            className="md:hidden fixed top-0 right-0 bottom-0 z-50 w-72 max-w-[80%] flex flex-col gap-1 pt-24 px-6 overflow-y-auto bg-black/80 backdrop-blur-2xl border-l border-white/10"
                        >
                            {allLinks.map(({ href, label, Icon, download }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target={download ? undefined : "_blank"}
                                    rel={download ? undefined : "noopener noreferrer"}
                                    download={download}
                                    onClick={() => setOpenPanel(null)}
                                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium text-zinc-300 hover:text-white hover:bg-white/5 transition-colors duration-200"
                                >
                                    <Icon size={18} />
                                    {label}
                                </a>
                            ))}
                        </motion.div>
                    </React.Fragment>
                )}
            </AnimatePresence>
        </>
    );
};
