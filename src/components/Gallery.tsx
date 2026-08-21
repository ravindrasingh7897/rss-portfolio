"use client";

import React from "react";
import Image from "next/image";
import { Camera } from "lucide-react";
import { SpaceBackground } from "./SpaceBackground";

const photos: { src: string; caption: string }[] = [];

export const Gallery = () => {
    return (
        <section className="relative w-full min-h-screen bg-[#121212] flex flex-col pt-24 pb-32 px-6 md:px-16 overflow-hidden">
            <SpaceBackground />

            <div className="relative z-20 max-w-6xl mx-auto space-y-16 w-full">
                <div className="space-y-4">
                    <h2 className="text-4xl md:text-5xl font-semibold tracking-tighter text-white">
                        Gallery
                    </h2>
                    <div className="h-0.5 w-12 bg-white rounded-full" />
                </div>

                {photos.length === 0 ? (
                    <div className="flex flex-col items-center justify-center gap-4 py-24 rounded-3xl bg-zinc-900/40 border border-zinc-800/60 backdrop-blur-md text-center">
                        <div className="h-14 w-14 rounded-full flex items-center justify-center bg-zinc-800/80 text-zinc-400">
                            <Camera strokeWidth={2} size={24} />
                        </div>
                        <p className="text-zinc-400 font-light max-w-sm">
                            Photos coming soon — drop images into{" "}
                            <code className="text-zinc-300">public/gallery/</code> and list them
                            in <code className="text-zinc-300">Gallery.tsx</code>.
                        </p>
                    </div>
                ) : (
                    <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
                        {photos.map((photo) => (
                            <div
                                key={photo.src}
                                className="group relative break-inside-avoid overflow-hidden rounded-3xl border border-zinc-800/60 bg-zinc-900/40"
                            >
                                <Image
                                    src={photo.src}
                                    alt={photo.caption}
                                    width={800}
                                    height={800}
                                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-5">
                                    <p className="text-white text-sm font-light">{photo.caption}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};
