import React, { useEffect } from "react";

const MONTHS_SHORT = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

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
    onToast,
}) {
    const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    const today = new Date();


    useEffect(() => {
        if (!startDate || !endDate) return;

        const now = new Date();
        const start = new Date(startDate.year, startDate.month, startDate.day);
        const end = new Date(endDate.year, endDate.month, endDate.day);

        const timers = [];

        // 1 day before start
        const msBeforeStart = start - now - 24 * 60 * 60 * 1000;
        if (msBeforeStart > 0) {
            timers.push(
                setTimeout(() => {
                    onToast(
                        `Reminder: range starts tomorrow (${startDate.day} ${MONTHS_SHORT[startDate.month]})`,
                        "warn",
                        "⏰"
                    );
                }, msBeforeStart)
            );
        }

        // At start
        const msToStart = start - now;
        if (msToStart > 0) {
            timers.push(
                setTimeout(() => {
                    onToast(
                        `Range starts today! ${startDate.day} ${MONTHS_SHORT[startDate.month]}`,
                        "info",
                        "🚀"
                    );
                }, msToStart)
            );
        }

        // At end
        const msToEnd = end - now;
        if (msToEnd > 0) {
            timers.push(
                setTimeout(() => {
                    onToast(
                        `Range ends today! ${endDate.day} ${MONTHS_SHORT[endDate.month]}`,
                        "success",
                        "🏁"
                    );
                }, msToEnd)
            );
        }

        return () => timers.forEach(clearTimeout);
    }, [startDate, endDate]);


    const handleDateSelect = (date) => {
        const isSame =
            selectDate &&
            selectDate.day === date.day &&
            selectDate.month === date.month &&
            selectDate.year === date.year;
        setSelectDate(isSame ? null : date);
    };


    const handleRangeClick = (date) => {
        if (!startDate && !endDate) {
            setStartDate(date);
            onToast(`Start set: ${date.day} ${MONTHS_SHORT[date.month]}`, "info", "📅");
        } else if (startDate && !endDate) {
            const s = new Date(startDate.year, startDate.month, startDate.day);
            const clicked = new Date(date.year, date.month, date.day);

            let finalStart = startDate;
            let finalEnd = date;
            if (clicked < s) {
                finalStart = date;
                finalEnd = startDate;
            }

            setStartDate(finalStart);
            setEndDate(finalEnd);

            const diff =
                Math.round(
                    (new Date(finalEnd.year, finalEnd.month, finalEnd.day) -
                        new Date(finalStart.year, finalStart.month, finalStart.day)) /
                    (1000 * 60 * 60 * 24)
                ) + 1;

            onToast(`Range set! ${diff} day${diff !== 1 ? "s" : ""}`, "success", "✅");
        } else {

            setStartDate(date);
            setEndDate(null);
            onToast(`New start: ${date.day} ${MONTHS_SHORT[date.month]}`, "info", "📅");
        }
    };

    const holidays = {
        "1-1-2026": "New Year",
        "14-1-2026": "Makar Sankranti",
        "26-1-2026": "Republic Day",
        "15-8-2026": "Independence Day",
        "2-10-2026": "Gandhi Jayanti",
        "25-12-2026": "Christmas"
    }


    const getDayClass = (day) => {
        if (!day) return "";

        const dateKey = `${day}-${month + 1}-${year}`;
        const isHoliday = holidays[dateKey];

        const isSunday = new Date(year, month, day).getDay() === 0;

        if (isSunday) {
            return "bg-red-100 text-rose-500";
        }

        // console.log(dateKey);
        if (isHoliday) {
            // console.log(isHoliday);
            return "text-purple-600 bg-purple-100";
        }

        const current = new Date(year, month, day);
        const isToday =
            day === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear();

        // Note mode — selected day
        if (
            mode === "note" &&
            day === selectDate?.day &&
            month === selectDate?.month &&
            year === selectDate?.year
        ) {
            return "bg-orange-400 text-white shadow-lg shadow-orange-200";
        }

        // Range mode
        if (startDate && endDate) {
            const s = new Date(startDate.year, startDate.month, startDate.day);
            const e = new Date(endDate.year, endDate.month, endDate.day);
            const isStart = current.getTime() === s.getTime();
            const isEnd = current.getTime() === e.getTime();

            if (isStart || isEnd)
                return "bg-orange-500 text-white shadow-md shadow-orange-200";
            if (current > s && current < e)
                return "bg-orange-200 text-orange-900";
        } else if (startDate && !endDate) {
            const s = new Date(startDate.year, startDate.month, startDate.day);
            if (current.getTime() === s.getTime())
                return "bg-orange-400 text-white shadow-md shadow-orange-200";
            if (current < s)
                return "bg-orange-100 text-orange-400 opacity-60";
        }

        if (isToday) return "bg-orange-500 text-white";

        return "hover:bg-white/60 hover:scale-105";
    };


    const rangeSummary = () => {
        if (startDate && endDate) {
            const s = new Date(startDate.year, startDate.month, startDate.day);
            const e = new Date(endDate.year, endDate.month, endDate.day);
            const diff = Math.round((e - s) / (1000 * 60 * 60 * 24)) + 1;
            return `${startDate.day} ${MONTHS_SHORT[startDate.month]} → ${endDate.day} ${MONTHS_SHORT[endDate.month]} · ${diff} day${diff !== 1 ? "s" : ""}`;
        }
        if (startDate && !endDate) {
            return `Start: ${startDate.day} ${MONTHS_SHORT[startDate.month]} ${startDate.year} — select end date`;
        }
        return null;
    };

    const summary = rangeSummary();

    return (
        <div

            className={`relative w-full h-full flex flex-col p-3 sm:p-5 backdrop-blur-sm bg-white/40 ${seasonStyles[season]}`}
        >
            {/* Mode Toggle */}
            <div className="flex gap-2 mb-3 flex-shrink-0">
                <button
                    type="button"
                    onClick={() => {
                        setMode("range");
                        setSelectDate(null);
                        setStartDate(null);
                        setEndDate(null);
                    }}
                    className={`flex-1 sm:flex-none px-3 py-2 sm:py-1.5 rounded-lg text-xs font-bold transition-all
                        ${mode === "range" ? "bg-gray-900 text-white" : "bg-white/50 hover:bg-white/70"}`}
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
                    className={`flex-1 sm:flex-none px-3 py-2 sm:py-1.5 rounded-lg text-xs font-bold transition-all
                        ${mode === "note" ? "bg-gray-900 text-white" : "bg-white/50 hover:bg-white/70"}`}
                >
                    📝 Notes
                </button>
            </div>

            {/* Calendar */}
            <div className="flex flex-col min-h-0">
                {/* Day headers */}
                <div className="grid grid-cols-7 gap-x-1 mb-1.5">
                    {daysOfWeek.map((d) => (
                        <span
                            key={d}
                            className={`text-[9px] sm:text-[10px] font-bold text-center opacity-55
                                ${d === "SUN" ? "text-red-500" : ""}`}
                        >
                            <span className="sm:hidden">{d[0]}</span>
                            <span className="hidden sm:inline">{d}</span>
                        </span>
                    ))}
                </div>

                {/* Days grid */}
                <div className="grid grid-cols-7 gap-y-1 sm:gap-y-1.5 gap-x-1 content-start">
                    {days.map((day, index) => (
                        <div
                            key={index}
                            onClick={() => {
                                if (!day) return;
                                const date = { day, month, year };
                                mode === "range"
                                    ? handleRangeClick(date)
                                    : handleDateSelect(date);
                            }}
                            className={`
                                cursor-pointer mx-auto
                                w-full h-8 aspect-square
                                flex justify-center items-center
                                rounded-lg sm:rounded-xl
                                text-xs sm:text-sm
                                transition-all duration-200
                                
                                ${day ? getDayClass(day) : ""}
                                ${!day ? "pointer-events-none" : ""}
                            `}
                        >
                            {day}
                        </div>
                    ))}
                </div>
            </div>

            {/* Range summary */}
            {summary && (
                <p className="text-[10px] sm:text-xs font-semibold text-center opacity-60 mt-2 tracking-wide flex-shrink-0">
                    {summary}
                </p>
            )}

            {/* Navigation */}
            <div className="mt-auto flex justify-between items-center w-full pt-3 sm:pt-4 border-t border-black/5 flex-shrink-0">
                <button
                    onClick={onPrev}
                    className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2
                        rounded-full border border-black/10 hover:bg-black/5
                        transition-colors text-[10px] sm:text-xs font-bold uppercase tracking-wide"
                >
                    ◀ Prev
                </button>
                <button
                    onClick={onNext}
                    className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2
                        rounded-full border border-black/10 hover:bg-black/5
                        transition-colors text-[10px] sm:text-xs font-bold uppercase tracking-wide"
                >
                    Next ▶
                </button>
            </div>
        </div>
    );
}