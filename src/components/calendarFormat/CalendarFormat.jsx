import React, { useState, useCallback } from "react";
import Hero from "../heroSection/Hero";
import NoteSection from "../noteSection/NoteSection";
import DateSection from "../dateSection/DateSection";
import MonthPicker from "../monthPicker/MonthPicker";

// Toast component
function Toast({ id, message, type, icon, onRemove }) {
    const colors = {
        info: "bg-sky-500 text-white",
        success: "bg-emerald-500 text-white",
        warn: "bg-amber-400 text-amber-900",
        error: "bg-red-500 text-white",
    };

    return (
        <div
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl shadow-xl
                text-xs font-semibold max-w-xs animate-fade-in-down
                ${colors[type] || colors.info}`}
        >
            {icon && <span className="text-sm">{icon}</span>}
            <span>{message}</span>
            <button
                onClick={() => onRemove(id)}
                className="ml-auto opacity-60 hover:opacity-100 text-base leading-none"
            >
                ×
            </button>
        </div>
    );
}

// Main calendar 
export default function CalendarFormat() {
    const [currDate, setCurrDate] = useState(new Date());
    const [selectDate, setSelectDate] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [mode, setMode] = useState("range");
    const [notes, setNotes] = useState({});
    const [pickerOpen, setPickerOpen] = useState(false);
    const [toasts, setToasts] = useState([]);

    const year = currDate.getFullYear();
    const month = currDate.getMonth();

    const handlePrevMonth = () => setCurrDate(new Date(year, month - 1, 1));
    const handleNextMonth = () => setCurrDate(new Date(year, month + 1, 1));

    // Build days array
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(i);

    // Season
    const getSeason = (m) => {
        if ([2, 3, 4, 5].includes(m)) return "Summer";
        if ([6, 7, 8, 9].includes(m)) return "Monsoon";
        return "Winter";
    };
    const season = getSeason(month);
    const seasonStyles = {
        Summer: "bg-gradient-to-br from-amber-50 to-orange-100/50 text-orange-600",
        Monsoon: "bg-gradient-to-br from-sky-50 to-indigo-100/50 text-blue-700",
        Winter: "bg-gradient-to-br from-slate-50 to-blue-100/50 text-slate-700",
    };

    // Toast manager
    const showToast = useCallback((message, type = "info", icon = "") => {
        const id = Date.now() + Math.random();
        setToasts((prev) => [...prev, { id, message, type, icon }]);
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 3500);
    }, []);

    const removeToast = useCallback((id) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    const showNote = mode === "note" && selectDate;

    return (
        <>
            {/* Toast container */}
            <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-2 pointer-events-none">
                {toasts.map((t) => (
                    <div key={t.id} className="pointer-events-auto">
                        <Toast {...t} onRemove={removeToast} />
                    </div>
                ))}
            </div>

            {/* Month / Year picker */}
            {pickerOpen && (
                <MonthPicker
                    currDate={currDate}
                    onSelect={(date) => {
                        setCurrDate(date);
                        setPickerOpen(false);
                    }}
                    onClose={() => setPickerOpen(false)}
                />
            )}

            {/* Calendar card */}
            <div className="bg-white/30 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden border border-white/20 w-full h-full flex flex-col">

                {/* Hero — top half */}
                <div className="overflow-hidden">
                    <Hero
                        year={year}
                        month={month}
                        season={season}
                        seasonStyles={seasonStyles}
                        currDate={currDate}
                        onOpenPicker={() => setPickerOpen(true)}
                    />
                </div>

                {/* Body — bottom half */}
                <div className="flex flex-col sm:flex-row w-full flex-1 min-h-0 overflow-hidden">

                    {/* Note panel */}
                    {showNote && (
                        <div className="w-full sm:w-[46%] border-b sm:border-b-0 sm:border-r border-black/5 flex-shrink-0">
                            <NoteSection
                                season={season}
                                seasonStyles={seasonStyles}
                                selectDate={selectDate}
                                notes={notes}
                                setNotes={setNotes}
                                onToast={showToast}
                            />
                        </div>
                    )}

                    {/* Date panel */}
                    <div className={showNote ? "w-full sm:w-[54%]" : "w-full h-fit"}>
                        <DateSection
                            year={year}
                            month={month}
                            days={days}
                            season={season}
                            seasonStyles={seasonStyles}
                            onPrev={handlePrevMonth}
                            onNext={handleNextMonth}
                            currDate={currDate}
                            setSelectDate={setSelectDate}
                            selectDate={selectDate}
                            setStartDate={setStartDate}
                            setEndDate={setEndDate}
                            startDate={startDate}
                            endDate={endDate}
                            mode={mode}
                            setMode={setMode}
                            onToast={showToast}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}