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
import { Download } from "lucide-react";
import { MagneticButton } from "./MagneticButton";

// TODO: replace these placeholders with the real links.
const LINKS = {
    instagram: "#",
    x: "#",
    linkedin: "#",
    github: "#",
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

const iconButton =
    "flex items-center justify-center h-10 w-10 rounded-full bg-black/40 backdrop-blur-2xl backdrop-saturate-150 border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.5),inset_0_1px_1px_0_rgba(255,255,255,0.15)] text-white/70 hover:text-white hover:bg-black/60 transition-colors duration-300";

export const SocialLinks = () => {
    return (
        <>
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-3 pointer-events-auto">
                {socials.map(({ href, label, Icon }) => (
                    <MagneticButton
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className={iconButton}
                    >
                        <Icon size={17} />
                    </MagneticButton>
                ))}
            </div>

            <div className="fixed bottom-6 left-6 md:left-8 z-40 flex items-center gap-3 pointer-events-auto">
                <MagneticButton
                    href={LINKS.buyMeATea}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Buy me a tea"
                    className={iconButton}
                >
                    <SiBuymeacoffee size={17} />
                </MagneticButton>
                <MagneticButton
                    href={LINKS.resume}
                    download
                    aria-label="Download resume"
                    className={iconButton}
                >
                    <Download size={18} />
                </MagneticButton>
            </div>
        </>
    );
};
