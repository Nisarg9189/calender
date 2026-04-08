import React, { useState } from "react";
import CalendarFormat from "../calendarFormat/CalendarFormat";

// export default function Wall() {
//     return (
//         <div className="bg-slate-100 w-full h-full flex justify-center items-center p-8">

//             <div className="relative w-full h-full max-w-4xl">

//                 {/* 🔗 Hook */}
//                 <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-4 h-8 border-2 border-gray-400 rounded-full bg-white z-20 shadow"></div>

//                 {/* 🌀 Spiral Binding */}
//                 <div className="absolute -top-2 w-full flex justify-between px-6 z-10">
//                     {Array.from({ length: 25 }).map((_, i) => (
//                         <div
//                             key={i}
//                             className="w-4 h-24 border-t-2 border-gray-500 rounded-t-full"
//                         ></div>
//                     ))}
//                 </div>

//                 {/* 📅 Your Existing Calendar */}
//                 <div className="bg-white rounded-xl shadow-xl w-full h-full overflow-hidden">
//                     <CalendarFormat />
//                 </div>

//             </div>
//         </div>
//     );
// }
export default function Wall() {
    return (
        <div className="bg-slate-100 w-full h-full flex justify-center items-center p-4 sm:p-8">

            <div className="relative w-full h-full max-w-4xl">

                {/* 🔗 Hook */}
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-4 h-8 border-2 border-gray-400 rounded-full bg-white z-20 shadow"></div>

                {/* 🌀 Spiral */}
                <div className="absolute -top-2 w-full flex justify-between px-4 sm:px-6 z-10">
                    {Array.from({ length: 25 }).map((_, i) => (
                        <div
                            key={i}
                            className="w-2 sm:w-4 h-10 sm:h-24 border-t-2 border-gray-500 rounded-t-full"
                        ></div>
                    ))}
                </div>

                {/* 📅 Calendar */}
                <div className="bg-white rounded-xl shadow-xl w-full h-full overflow-hidden">
                    <CalendarFormat />
                </div>

            </div>
        </div>
    );
}