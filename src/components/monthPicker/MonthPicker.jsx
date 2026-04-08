import React, { useState } from "react";

const MONTHS_SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function MonthPicker({ currDate, onSelect, onClose }) {
    const [pickerYear, setPickerYear] = useState(currDate.getFullYear());

    const handleSelect = (monthIndex) => {
        onSelect(new Date(pickerYear, monthIndex, 1));
        onClose();
    };

    return (
        // Backdrop
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
            onClick={onClose}
        >
            {/* Card */}
            <div
                className="bg-white rounded-2xl shadow-2xl p-5 w-64"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Year row */}
                <div className="flex items-center justify-between mb-4">
                    <button
                        type="button"
                        onClick={() => setPickerYear((y) => y - 1)}
                        className="text-2xl px-3 py-1 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        ‹
                    </button>
                    <span className="text-base font-bold tracking-wide">{pickerYear}</span>
                    <button
                        type="button"
                        onClick={() => setPickerYear((y) => y + 1)}
                        className="text-2xl px-3 py-1 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        ›
                    </button>
                </div>

                {/* Month grid */}
                <div className="grid grid-cols-3 gap-2">
                    {MONTHS_SHORT.map((m, i) => {
                        const isActive =
                            i === currDate.getMonth() &&
                            pickerYear === currDate.getFullYear();
                        return (
                            <button
                                key={m}
                                type="button"
                                onClick={() => handleSelect(i)}
                                className={`py-2 rounded-xl text-sm font-semibold transition-all duration-150
                                    ${isActive
                                        ? "bg-orange-500 text-white shadow-md shadow-orange-200"
                                        : "hover:bg-orange-50 text-gray-700"
                                    }`}
                            >
                                {m}
                            </button>
                        );
                    })}
                </div>

                {/* Close */}
                <button
                    type="button"
                    onClick={onClose}
                    className="mt-4 w-full py-2 rounded-xl bg-gray-900 text-white text-xs font-bold tracking-widest uppercase hover:bg-gray-700 transition-colors"
                >
                    Close
                </button>
            </div>
        </div>
    );
}