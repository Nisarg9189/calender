import React, { useEffect, useState } from "react";
import Hero from "../heroSection/Hero";
import NoteSection from "../noteSection/NoteSection";
import DateSection from "../dateSection/DateSection";


export default function CelenderFormate() {

    const [currDate, setCurrDate] = useState(new Date());

    const year = currDate.getFullYear();
    const month = currDate.getMonth();

    // console.log(`year: ${year}`);
    // console.log(`month: ${month}`);

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // console.log(`firstDay: ${firstDay}`);
    // console.log(`daysInMonth: ${daysInMonth}`);

    const days = [];

    for (let i = 0; i < firstDay; i++) {
        days.push(null);
    }

    for (let i = 1; i <= daysInMonth; i++) {
        days.push(i);
    }

    // console.log(`days: ${days}`);

    const getSeason = (month) => {
        // month = 0 (Jan) → 11 (Dec)

        if ([2, 3, 4, 5].includes(month)) return "Summer";  // March, Apr, May, Jun
        if ([6, 7, 8, 9].includes(month)) return "Monsoon"; // Jul, Aug, Sep, Oct
        return "Winter";                                   // Nov → Feb
    };

    const season = getSeason(month);

    const seasonStyles = {
        Summer: "bg-gradient-to-br from-yellow-100 to-orange-100 text-orange-600",
        Monsoon: "bg-gradient-to-br from-blue-100 to-indigo-200 text-blue-700",
        Winter: "bg-gradient-to-br from-gray-100 to-blue-50 text-gray-700",
    };



    return (
        <div className="bg-gray-500 h-1/2 w-full">

            <Hero year={year} month={month} season={season} seasonStyles={seasonStyles} />

            <div className="flex w-full h-full justify-between items-center border border-black">
                <NoteSection className="w-1/2 h-full" season={season} seasonStyles={seasonStyles} />
                <DateSection className="w-1/2 h-full" firstDay={firstDay} daysInMonth={daysInMonth} days={days} season={season} seasonStyles={seasonStyles} />
            </div>

        </div>
    )
}