import React, { useState } from "react";
import CelenderFormate from "../celenderFormate/CelenderFormate";

export default function Wall() {
    return (
        <div className="bg-gray-200 flex justify-center items-center h-screen w-1/2 m-auto p-4">
            <div className="border w-full h-full">
                <CelenderFormate />
            </div>
        </div>
    )
}