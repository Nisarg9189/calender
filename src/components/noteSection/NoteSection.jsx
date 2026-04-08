// import React, { useEffect } from "react";
// import { useRef, useState } from "react";

// export default function NoteSection({ season, seasonStyles, selectDate }) {
//     const inputRef = useRef([]);
//     const [note, setNote] = useState({});

//     // console.log(`selected date, ${selectDate?.day}, ${selectDate?.month + 1}, ${selectDate?.year}`);
//     const getKey = (date) => `${date.day}-${date.month + 1}-${date.year}`

//     const key = selectDate ? getKey(selectDate) : null;
//     const currentNotes =
//         key && note[key] ? note[key] : Array(8).fill("");


//     const handleChange = (idx, e) => {
//         if (e.key === "Enter") {
//             e.preventDefault();
//             inputRef.current[idx + 1 < 8 ? idx + 1 : 7]?.focus();
//         }

//         if (e.key === "Backspace" && !e.target.value) {
//             e.preventDefault();
//             inputRef.current[idx - 1 >= 0 ? idx - 1 : 0]?.focus();
//         }
//     }

//     const handleInputChange = (idx, e) => {
//         if (!selectDate) return;
//         const key = getKey(selectDate);
//         const existing = note[key] || Array(8).fill("");
//         const updatedArray = [...existing];
//         updatedArray[idx] = e.target.value;
//         setNote({
//             ...note,
//             [key]: updatedArray,
//         });
//     }

//     const handleNoteSubmit = (e) => {
//         e.preventDefault();
//         if (!selectDate) {
//             alert("select date first!");
//             return;
//         }
//         console.log(note);

//         // setNote({});

//     }


//     return (
//         <div className={`w-full h-full p-8 backdrop-blur-md bg-white/20 border-r border-black/5 flex flex-col ${seasonStyles[season]}`}>

//             {/* Title */}
//             <div className="flex items-center gap-3 mb-8">
//                 <span className="text-2xl">📝</span>
//                 <h2 className="text-xs font-black tracking-[0.3em] uppercase opacity-60">
//                     Daily Notes
//                 </h2>
//             </div>

//             <form onSubmit={handleNoteSubmit} className="flex flex-col grow min-h-0">
//                 {/* Inputs */}
//                 <div className="space-y-3 grow overflow-y-auto pr-2">
//                     {[...Array(8)].map((_, i) => (
//                         <div key={i} className="relative group">
//                             <input
//                                 ref={(el) => (inputRef.current[i] = el)}
//                                 onKeyDown={(e) => handleChange(i, e)}
//                                 value={currentNotes[i]}
//                                 onChange={(e) => handleInputChange(i, e)}
//                                 placeholder={`0${i + 1}. Write something...`}
//                                 className="w-full bg-transparent border-b border-black/10
//                          focus:border-black/30 focus:outline-none 
//                          transition-all duration-300 pb-1 text-sm font-medium placeholder:opacity-30 placeholder:font-light"
//                             />
//                             <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-black/20 group-focus-within:w-full transition-all duration-500" />
//                         </div>
//                     ))}
//                 </div>

//                 <button
//                     type="submit"
//                     className="mt-6 bg-sky-500 text-white text-[10px] font-bold tracking-[0.2em] uppercase py-3 rounded-xl hover:bg-black/80 transition-all cursor-pointer shadow-xl shadow-black/10"
//                 >
//                     Save Notes
//                 </button>
//             </form>

//         </div>
//     );
// }
import React, { useRef, useState } from "react";

export default function NoteSection({ season, seasonStyles, selectDate }) {
    const inputRef = useRef([]);
    const [note, setNote] = useState({});

    const getKey = (date) => `${date.day}-${date.month + 1}-${date.year}`;
    const key = selectDate ? getKey(selectDate) : null;
    const currentNotes = key && note[key] ? note[key] : Array(8).fill("");

    const handleChange = (idx, e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            inputRef.current[idx + 1 < 8 ? idx + 1 : 7]?.focus();
        }
        if (e.key === "Backspace" && !e.target.value) {
            e.preventDefault();
            inputRef.current[idx - 1 >= 0 ? idx - 1 : 0]?.focus();
        }
    };

    const handleInputChange = (idx, e) => {
        if (!selectDate) return;
        const key = getKey(selectDate);
        const existing = note[key] || Array(8).fill("");
        const updatedArray = [...existing];
        updatedArray[idx] = e.target.value;
        setNote({ ...note, [key]: updatedArray });
    };

    const handleNoteSubmit = (e) => {
        e.preventDefault();
        if (!selectDate) {
            alert("Select a date first!");
            return;
        }
        console.log(note);
    };

    return (
        <div className={`w-full h-full p-4 sm:p-8 backdrop-blur-md bg-white/20 flex flex-col ${seasonStyles[season]}`}>

            {/* Title */}
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-8">
                <span className="text-lg sm:text-2xl">📝</span>
                <h2 className="text-[10px] sm:text-xs font-black tracking-[0.2em] sm:tracking-[0.3em] uppercase opacity-60">
                    Daily Notes
                </h2>
                {selectDate && (
                    <span className="ml-auto text-[10px] sm:text-xs opacity-50 font-medium">
                        {selectDate.day}/{selectDate.month + 1}/{selectDate.year}
                    </span>
                )}
            </div>

            <form onSubmit={handleNoteSubmit} className="flex flex-col grow min-h-0">
                {/* Inputs — compact on mobile */}
                <div className="space-y-2 sm:space-y-3 grow overflow-y-auto pr-1 sm:pr-2">
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="relative group">
                            <input
                                ref={(el) => (inputRef.current[i] = el)}
                                onKeyDown={(e) => handleChange(i, e)}
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
                    className="mt-4 sm:mt-6 bg-sky-500 text-white text-[10px] font-bold tracking-[0.2em] uppercase py-2.5 sm:py-3 rounded-xl hover:bg-black/80 transition-all cursor-pointer shadow-xl shadow-black/10 touch-manipulation"
                >
                    Save Notes
                </button>
            </form>
        </div>
    );
}