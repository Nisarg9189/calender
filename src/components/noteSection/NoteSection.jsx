
import React, { useRef, useEffect } from "react";

export default function NoteSection({ season, seasonStyles, selectDate, notes, setNotes, onToast }) {
    const inputRef = useRef([]);

    const getKey = (date) => `${date.day}-${date.month + 1}-${date.year}`;
    const key = selectDate ? getKey(selectDate) : null;
    const currentNotes = key && notes[key] ? notes[key] : Array(8).fill("");

    useEffect(() => {
        if (!key) return;

        const savedNotes = localStorage.getItem(key);

        if (savedNotes) {
            const parsed = JSON.parse(savedNotes);

            setNotes((prev) => ({
                ...prev,
                [key]: parsed,
            }));
        }
    }, [key]);

    const handleKeyDown = (idx, e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            inputRef.current[Math.min(idx + 1, 7)]?.focus();
        }
        if (e.key === "Backspace" && !e.target.value) {
            e.preventDefault();
            inputRef.current[Math.max(idx - 1, 0)]?.focus();
        }
    };

    const handleInputChange = (idx, e) => {
        if (!selectDate) return;
        const k = getKey(selectDate);
        const existing = notes[k] || Array(8).fill("");
        const updated = [...existing];
        updated[idx] = e.target.value;
        setNotes((prev) => ({ ...prev, [k]: updated }));
    };

    const handleSave = (e) => {
        e.preventDefault();
        if (!selectDate) {
            onToast("Select a date first!", "warn", "⚠️");
            return;
        }
        onToast(
            `Notes saved for ${selectDate.day}/${selectDate.month + 1}/${selectDate.year}`,
            "success",
            "💾"
        );

        localStorage.setItem(key, JSON.stringify(currentNotes));
        setNotes({});
    };

    return (
        <div
            className={`w-full h-full p-4 sm:p-6 backdrop-blur-md bg-white/20 flex flex-col ${seasonStyles[season]}`}
        >
            {/* Header */}
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 flex-shrink-0">
                <span className="text-lg sm:text-2xl">📝</span>
                <h2 className="text-[10px] sm:text-xs font-black tracking-[0.2em] sm:tracking-[0.3em] uppercase opacity-60">
                    Daily Notes
                </h2>
                {selectDate && (
                    <span className="ml-auto text-[10px] sm:text-xs opacity-50 font-medium whitespace-nowrap">
                        {selectDate.day}/{selectDate.month + 1}/{selectDate.year}
                    </span>
                )}
            </div>

            {/* Note inputs */}
            <form onSubmit={handleSave} className="flex flex-col flex-grow min-h-0">
                <div className="space-y-2 sm:space-y-3 flex-grow overflow-y-auto pr-1">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div key={i} className="relative group">
                            <input
                                ref={(el) => (inputRef.current[i] = el)}
                                onKeyDown={(e) => handleKeyDown(i, e)}
                                value={currentNotes[i]}
                                onChange={(e) => handleInputChange(i, e)}
                                placeholder={`${String(i + 1).padStart(2, "0")}. Write something...`}
                                className="w-full bg-transparent border-b border-black/10
                                    focus:border-black/30 focus:outline-none
                                    transition-all duration-300 pb-1
                                    text-xs sm:text-sm font-medium
                                    placeholder:opacity-30 placeholder:font-light"
                            />
                            <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-black/20 group-focus-within:w-full transition-all duration-500" />
                        </div>
                    ))}
                </div>

                <button
                    type="submit"
                    className="mt-4 sm:mt-5 bg-sky-500 text-white text-[10px] font-bold
                        tracking-[0.2em] uppercase py-2.5 sm:py-3 rounded-xl
                        hover:bg-sky-600 active:scale-95
                        transition-all cursor-pointer shadow-lg shadow-sky-200
                        touch-manipulation flex-shrink-0"
                >
                    Save Notes
                </button>
            </form>
        </div>
    );
}