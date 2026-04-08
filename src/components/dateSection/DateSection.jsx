import React from "react";

export default function DateSection({ firstDay, daysInMonth, days, season, seasonStyles }) {


    // console.log(`firstDay: ${firstDay}`);
    // console.log(`daysInMonth: ${daysInMonth}`);
    // console.log(`days: ${days}`);

    const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

    return (
        <div className={`relative m-auto w-full h-full flex justify-center items-center flex-col p-4 ${seasonStyles[season]}`}>
            <div className="grid grid-cols-7 gap-2">
                {daysOfWeek.map((d) => (
                    <span
                        key={d}
                        className={`tracking-widest font-semibold
      ${d === "SUN" ? "text-red-500" : ""}
      ${season === "Summer"
                                ? "text-orange-600"
                                : season === "Monsoon"
                                    ? "text-blue-700"
                                    : "text-gray-700"
                            }
    `}
                    >
                        {d}
                    </span>
                ))}

                {days.map((day, index) => (
                    <div
                        key={index}
                        className={`m-auto cursor-pointer h-10 w-10 flex justify-center items-center rounded-full transition
    ${day === new Date().getDate()
                                ? "bg-yellow-500 text-white"
                                : season === "Summer"
                                    ? "hover:bg-yellow-300"
                                    : season === "Monsoon"
                                        ? "hover:bg-blue-300"
                                        : "hover:bg-gray-300"
                            }`}
                    >
                        {day}
                    </div>
                ))}
            </div>

            <div className="flex justify-between items-center w-full h-full p-4">
                <button className={`border rounded-full border-blue-300 p-4 text-blue-400 hover:bg-blue-200 cursor-pointer ${seasonStyles[season]}`}>prev</button>
                <button className={`border rounded-full border-blue-300 p-4 text-blue-400 hover:bg-blue-200 cursor-pointer ${seasonStyles[season]}`}>next</button>
            </div>
        </div>
    );
}