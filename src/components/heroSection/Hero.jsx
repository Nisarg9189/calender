import React from "react";
import summer from "../heroSection/summer.jpg";

export default function Hero({ year, month, season, seasonStyles, currDate, onOpenPicker }) {
    const months = [
        "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
        "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER",
    ];

    const colors = {
        Summer: "text-orange-500",
        Monsoon: "text-blue-700",
        Winter: "text-gray-700",
    };

    const seasonEmoji = {
        Summer: "☀️",
        Monsoon: "🌧️",
        Winter: "❄️",
    };

    return (
        <div className="relative w-full h-[400px] bg-white overflow-hidden">

            {/* Hero image */}
            <div className="relative w-full h-full">
                <img
                    src={summer}
                    alt="season_background"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Wave Container */}
            <div className="absolute bottom-0 left-0 w-full" style={{ height: "30%" }}>
                {/* Wave 1 - lightest / back */}
                <div className="absolute bottom-0 left-0 w-full h-full">
                    <svg
                        viewBox="0 0 1440 120"
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute bottom-0 w-[200%]"
                        style={{
                            fill: "rgba(144, 210, 236, 0.5)",
                            animation: "waveFlow 6s ease-in-out infinite alternate",
                        }}
                        preserveAspectRatio="none"
                    >
                        <path d="M0,40 C180,90 360,0 540,50 C720,100 900,10 1080,55 C1260,100 1440,20 1440,20 L1440,120 L0,120 Z" />
                        <path d="M1440,40 C1260,90 1080,0 900,50 C720,100 540,10 360,55 C180,100 0,20 0,20 L0,120 L1440,120 Z" />
                    </svg>
                </div>

                {/* Wave 2 - mid blue */}
                <div className="absolute bottom-0 left-0 w-full h-full">
                    <svg
                        viewBox="0 0 1440 120"
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute bottom-0 w-[200%]"
                        style={{
                            fill: "rgba(42, 168, 216, 0.65)",
                            animation: "waveFlow 4.5s ease-in-out infinite alternate",
                        }}
                        preserveAspectRatio="none"
                    >
                        <path d="M0,55 C200,100 400,10 600,60 C800,110 1000,15 1200,55 C1350,85 1440,30 1440,30 L1440,120 L0,120 Z" />
                        <path d="M1440,55 C1240,100 1040,10 840,60 C640,110 440,15 240,55 C90,85 0,30 0,30 L0,120 L1440,120 Z" />
                    </svg>
                </div>

                {/* Wave 3 - deep blue / front */}
                <div className="absolute bottom-0 left-0 w-full h-full">
                    <svg
                        viewBox="0 0 1440 120"
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute bottom-0 w-[200%]"
                        style={{
                            fill: "rgba(14, 120, 180, 0.85)",
                            animation: "waveFlow 3s ease-in-out infinite alternate",
                        }}
                        preserveAspectRatio="none"
                    >
                        <path d="M0,65 C150,100 350,20 550,65 C750,110 950,25 1150,65 C1300,90 1440,40 1440,40 L1440,120 L0,120 Z" />
                        <path d="M1440,65 C1290,100 1090,20 890,65 C690,110 490,25 290,65 C140,90 0,40 0,40 L0,120 L1440,120 Z" />
                    </svg>
                </div>
            </div>

            {/* Season label */}
            <div className="absolute bottom-8 left-8 z-10">
                <p className={`text-3xl font-light tracking-widest ${colors[season]}`}>
                    <span className="sm:hidden">{seasonEmoji[season]}</span>
                    <span className="hidden sm:inline">{season} {seasonEmoji[season]}</span>
                </p>
            </div>

            {/* Month / Year — clickable to open picker */}
            <button
                type="button"
                onClick={onOpenPicker}
                className="absolute bottom-6 right-8 text-white text-right z-10 drop-shadow-2xl
                    group cursor-pointer bg-transparent border-none p-0"
                title="Tap to change month / year"
            >
                <p className="text-xl font-extralight tracking-[0.2em] opacity-90 mb-1">{year}</p>
                <p className="text-3xl font-black tracking-widest uppercase leading-none
                    group-hover:opacity-80 transition-opacity duration-200">
                    {months[month]}
                </p>
                <p className="text-[10px] tracking-widest opacity-0 group-hover:opacity-60
                    transition-opacity duration-200 mt-1 uppercase font-semibold">
                    tap to change
                </p>
            </button>

            {/* Wave keyframes */}
            <style>{`
                @keyframes waveFlow {
                    0%   { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
            `}</style>
        </div>
    );
}