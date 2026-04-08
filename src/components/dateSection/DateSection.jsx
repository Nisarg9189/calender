

import React from "react";

export default function DateSection({
    month,
    year,
    days,
    season,
    seasonStyles,
    onPrev,
    onNext,
    currDate,
    setSelectDate,
    selectDate,
    setStartDate,
    setEndDate,
    startDate,
    endDate,
    mode,
    setMode,
}) {
    const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    const today = new Date();

    // 📌 Select single date
    const handleDateSelect = (date) => {
        if (
            selectDate &&
            selectDate.day === date.day &&
            selectDate.month === date.month &&
            selectDate.year === date.year
        ) {
            setSelectDate(null);
        } else {
            setSelectDate(date);
        }
    };

    // 📌 Range selection
    const handleStartAndEndDate = (date) => {
        if (startDate === null && endDate === null && selectDate === null) {
            setStartDate(date);
        } else if (endDate === null && startDate != null && selectDate === null) {
            setEndDate(date);
        } else {
            setStartDate(null);
            setEndDate(null);
        }
    };

    // 🎨 Day styling
    const getDayClass = (day, month, year) => {
        if (!day) return "";

        const current = new Date(year, month, day);

        // Selected
        if (
            day === selectDate?.day &&
            month === selectDate?.month &&
            year === selectDate?.year
        ) {
            return "bg-orange-400 text-white shadow-lg shadow-orange-200 scale-110";
        }

        // Range
        if (startDate && endDate) {
            const start = new Date(startDate.year, startDate.month, startDate.day);
            const end = new Date(endDate.year, endDate.month, endDate.day);

            if (current >= start && current <= end) {
                return "bg-orange-400 text-white shadow-lg shadow-orange-200";
            } else {
                return "bg-orange-200 text-white";
            }
        }

        // Start only
        if (startDate && !endDate) {
            const start = new Date(startDate.year, startDate.month, startDate.day);

            if (current < start) {
                return "bg-orange-200 text-white";
            }

            if (
                startDate.day === day &&
                startDate.month === month &&
                startDate.year === year
            ) {
                return "bg-orange-400 text-white";
            }
        }

        // Today
        if (
            day === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear()
        ) {
            return "bg-orange-500 text-white";
        }

        return "hover:bg-white/60";
    };

    return (
        <div
            className={`relative w-full h-full flex flex-col p-3 sm:p-6 backdrop-blur-sm bg-white/40 ${seasonStyles[season]}`}
        >
            {/* 🔘 Mode Toggle */}
            <div className="flex gap-2 mb-4">
                <button
                    type="button"
                    onClick={() => {
                        setMode("range");
                        setSelectDate(null);
                        setStartDate(null);
                        setEndDate(null);
                    }}
                    className={`flex-1 sm:flex-none px-3 py-2 sm:py-1 rounded text-xs font-bold ${mode === "range" ? "bg-black text-white" : "bg-white/50"
                        }`}
                >
                    📅 Range
                </button>

                <button
                    type="button"
                    onClick={() => {
                        setMode("note");
                        setSelectDate(null);
                        setStartDate(null);
                        setEndDate(null);
                    }}
                    className={`flex-1 sm:flex-none px-3 py-2 sm:py-1 rounded text-xs font-bold ${mode === "note" ? "bg-black text-white" : "bg-white/50"
                        }`}
                >
                    📝 Notes
                </button>
            </div>

            {/* 📅 Calendar Section */}
            <div className="flex flex-col flex-grow min-h-0">

                {/* Day Headers */}
                <div className="grid grid-cols-7 gap-y-2 sm:gap-y-4 gap-x-1 sm:gap-x-2 mb-2">
                    {daysOfWeek.map((d) => (
                        <span
                            key={d}
                            className={`text-[9px] sm:text-[10px] font-bold text-center opacity-60 ${d === "SUN" ? "text-red-500" : ""
                                }`}
                        >
                            <span className="sm:hidden">{d[0]}</span>
                            <span className="hidden sm:inline">{d}</span>
                        </span>
                    ))}
                </div>

                {/* Days Grid (SCROLL FIX APPLIED) */}
                <div className="grid grid-cols-7 gap-y-2 sm:gap-y-4 gap-x-1 sm:gap-x-2 flex-grow content-start overflow-y-auto">
                    {days.map((day, index) => (
                        <div
                            key={index}
                            onClick={() => {
                                if (!day) return;
                                const date = { day, month, year };

                                if (mode === "range") {
                                    handleStartAndEndDate(date);
                                } else {
                                    handleDateSelect(date);
                                }
                            }}
                            className={`
                relative m-auto cursor-pointer
                h-8 w-8 sm:h-10 sm:w-10
                flex justify-center items-center
                rounded-lg sm:rounded-xl
                text-sm sm:text-base
                transition-all duration-300
                select-none
                ${day ? getDayClass(day, month, year) : ""}
                ${!day ? "pointer-events-none" : ""}
              `}
                        >
                            {day}
                        </div>
                    ))}
                </div>
            </div>

            {/* 🔁 Navigation (ALWAYS VISIBLE) */}
            <div className="mt-auto flex justify-between items-center w-full pt-4 sm:pt-6 border-t border-black/5">
                <button
                    onClick={onPrev}
                    className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 rounded-full border border-black/10 hover:bg-black/5 transition-colors text-xs font-bold uppercase"
                >
                    ◀ Prev
                </button>

                <button
                    onClick={onNext}
                    className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 rounded-full border border-black/10 hover:bg-black/5 transition-colors text-xs font-bold uppercase"
                >
                    Next ▶
                </button>
            </div>
        </div>
    );
}