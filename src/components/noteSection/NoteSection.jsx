import React, { useEffect } from "react";
import { useRef, useState } from "react";

export default function NoteSection({ season, seasonStyles }) {
    const inputRef = useRef([]);
    const [note, setNote] = useState(Array(8).fill(""));

    const handleChange = (idx, e) => {
        // Move to next on ENTER

        if (e.key === "Enter") {
            e.preventDefault();
            inputRef.current[idx + 1 < 8 ? idx + 1 : 7]?.focus();
        }

        // Move back on BACKSPACE (if empty)
        if (e.key === "Backspace" && !e.target.value) {
            e.preventDefault();
            inputRef.current[idx - 1 >= 0 ? idx - 1 : 0]?.focus();
        }
    }

    const handleInputChange = (idx, e) => {
        const newNotes = [...note]
        newNotes[idx] = e.target.value;
        setNote(newNotes);
    }

    const handleNoteSubmit = (e) => {
        e.preventDefault();
        console.log(note);
        console.log('Note added successfully!')
    }


    return (
        <div className={`w-full h-full p-5 bg-gradient-to-b from-sky-50 to-white rounded-xl shadow-md border border-gray-200 ${seasonStyles[season]}`}>

            {/* Title */}
            <h2 className="text-lg font-semibold text-sky-600 mb-4 border-b pb-2">
                📝 Notes
            </h2>

            <form onSubmit={handleNoteSubmit}>
                {/* Inputs */}
                <div className="space-y-3">
                    {[...Array(8)].map((_, i) => (
                        <input
                            key={i}
                            ref={(el) => (inputRef.current[i] = el)}
                            onKeyDown={(e) => handleChange(i, e)}
                            value={note[i]}
                            onChange={(e) => handleInputChange(i, e)}
                            placeholder={`Write note ${i + 1}...`}
                            className="w-full bg-transparent border-b border-gray-300 
                     focus:border-sky-500 focus:outline-none 
                     transition duration-200 pb-1 text-gray-700"
                        />
                    ))}
                </div>

                <button type="submit" className="bg-sky-500 text-white px-4 py-2 rounded-md cursor-pointer mt-3">Add Note</button>
            </form>

        </div>
    );
}