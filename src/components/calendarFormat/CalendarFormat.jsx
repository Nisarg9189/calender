// import React, { useEffect, useState } from "react";
// import Hero from "../heroSection/Hero";
// import NoteSection from "../noteSection/NoteSection";
// import DateSection from "../dateSection/DateSection";


// export default function CalendarFormat() {

//     const [currDate, setCurrDate] = useState(new Date());
//     const [selectDate, setSelectDate] = useState(null);
//     const [startDate, setStartDate] = useState(null);
//     const [endDate, setEndDate] = useState(null);
//     const [mode, setMode] = useState("range");
//     console.log(mode);

//     const year = currDate.getFullYear();
//     const month = currDate.getMonth();

//     const handlePrevMonth = () => {
//         setCurrDate(new Date(year, month - 1, 1));
//     };

//     const handleNextMonth = () => {
//         setCurrDate(new Date(year, month + 1, 1));
//     };

//     const firstDay = new Date(year, month, 1).getDay();
//     const daysInMonth = new Date(year, month + 1, 0).getDate();

//     const days = [];
//     for (let i = 0; i < firstDay; i++) {
//         days.push(null);
//     }
//     for (let i = 1; i <= daysInMonth; i++) {
//         days.push(i);
//     }

//     const getSeason = (month) => {
//         if ([2, 3, 4, 5].includes(month)) return "Summer";
//         if ([6, 7, 8, 9].includes(month)) return "Monsoon";
//         return "Winter";
//     };

//     const season = getSeason(month);

//     const seasonStyles = {
//         Summer: "bg-gradient-to-br from-amber-50 to-orange-100/50 text-orange-600",
//         Monsoon: "bg-gradient-to-br from-sky-50 to-indigo-100/50 text-blue-700",
//         Winter: "bg-gradient-to-br from-slate-50 to-blue-100/50 text-slate-700",
//     };

//     return (
//         <div className="bg-white/30 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden border border-white/20 h-full w-full flex flex-col">
//             <div className="h-[40%] w-full flex-shrink-0">
//                 <Hero year={year} month={month} season={season} seasonStyles={seasonStyles} currDate={currDate} />
//             </div>

//             <div className="flex h-[60%] w-full justify-between items-stretch overflow-hidden">
//                 {mode === "note" && selectDate && <NoteSection className="w-1/2 h-full" season={season} seasonStyles={seasonStyles} selectDate={selectDate} />}
//                 {/* <NoteSection className="w-1/2 h-full" season={season} seasonStyles={seasonStyles} selectDate={selectDate} /> */}
//                 <DateSection
//                     className="w-1/2 h-full"
//                     year={year}
//                     month={month}
//                     days={days}
//                     season={season}
//                     seasonStyles={seasonStyles}
//                     onPrev={handlePrevMonth}
//                     onNext={handleNextMonth}
//                     currDate={currDate}
//                     setSelectDate={setSelectDate}
//                     selectDate={selectDate}
//                     setStartDate={setStartDate}
//                     setEndDate={setEndDate}
//                     startDate={startDate}
//                     endDate={endDate}
//                     mode={mode}
//                     setMode={setMode}
//                 />
//             </div>
//         </div>
//     )
// }

import React, { useEffect, useState } from "react";
import Hero from "../heroSection/Hero";
import NoteSection from "../noteSection/NoteSection";
import DateSection from "../dateSection/DateSection";


export default function CalendarFormat() {

    const [currDate, setCurrDate] = useState(new Date());
    const [selectDate, setSelectDate] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [mode, setMode] = useState("range");

    const year = currDate.getFullYear();
    const month = currDate.getMonth();

    const handlePrevMonth = () => setCurrDate(new Date(year, month - 1, 1));
    const handleNextMonth = () => setCurrDate(new Date(year, month + 1, 1));

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const days = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(i);
    // while (days.length < 42) days.push(null);


    const getSeason = (month) => {
        if ([2, 3, 4, 5].includes(month)) return "Summer";
        if ([6, 7, 8, 9].includes(month)) return "Monsoon";
        return "Winter";
    };

    const season = getSeason(month);

    const seasonStyles = {
        Summer: "bg-gradient-to-br from-amber-50 to-orange-100/50 text-orange-600",
        Monsoon: "bg-gradient-to-br from-sky-50 to-indigo-100/50 text-blue-700",
        Winter: "bg-gradient-to-br from-slate-50 to-blue-100/50 text-slate-700",
    };

    const showNote = mode === "note" && selectDate;

    return (
        // <div className="bg-white/30 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden border border-white/20 w-full flex flex-col h-full sm:min-h-0 sm:h-full">
        <div className="bg-white/30 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden border border-white/20 w-full h-full flex flex-col">

            {/* Hero — compact fixed height on mobile, 40% on desktop */}
            <div className="basis-1/2 min-h-0">
                <Hero
                    year={year}
                    month={month}
                    season={season}
                    seasonStyles={seasonStyles}
                    currDate={currDate}
                    setCurrDate={setCurrDate}
                />
            </div>

            {/* Body — vertical stack on mobile, side-by-side on desktop */}
            <div className="flex flex-col sm:flex-row w-full basis-1/2 min-h-0">
                {/* <div className="flex flex-col sm:flex-row w-full overflow-y-auto sm:overflow-hidden"> */}

                {/* NoteSection — full width on mobile, half on desktop */}
                {showNote && (
                    <div className="w-full sm:w-1/2 border-b sm:border-b-0 sm:border-r border-black/5">
                        <NoteSection
                            season={season}
                            seasonStyles={seasonStyles}
                            selectDate={selectDate}
                        />
                    </div>
                )}

                {/* DateSection */}
                <div className={`${showNote ? "w-full sm:w-1/2" : "w-full"}`}>
                    <DateSection
                        year={year}
                        month={month}
                        days={days}
                        season={season}
                        seasonStyles={seasonStyles}
                        onPrev={handlePrevMonth}
                        onNext={handleNextMonth}
                        currDate={currDate}
                        setCurrDate={setCurrDate}
                        setSelectDate={setSelectDate}
                        selectDate={selectDate}
                        setStartDate={setStartDate}
                        setEndDate={setEndDate}
                        startDate={startDate}
                        endDate={endDate}
                        mode={mode}
                        setMode={setMode}
                    />
                </div>
            </div>
        </div>
    );
}