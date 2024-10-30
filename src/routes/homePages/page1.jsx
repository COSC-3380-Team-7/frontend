// src/pages/events/DolphinShow.jsx

import React from 'react';

export default function DolphinShow() {
    return (
        <div className="min-h-screen bg-blue-50 p-8">
            <h1 className="text-5xl font-bold text-center mb-8 text-blue-800">Dolphin Show</h1>
            <img 
                src="https://cdn.prod.website-files.com/63e51157295a654688a15aca/63e540072e4d298ea274be3b_guinea%20pig%20gamer.png" 
                alt="Dolphin Show" 
                className="w-full max-w-4xl mx-auto rounded-lg shadow-lg mb-6"
            />
            <p className="text-lg text-gray-700 mb-6 max-w-4xl mx-auto">
                Don't miss the upcoming Dolphin Show! Enjoy an entertaining and educational experience watching dolphins perform amazing tricks and showcase their intelligence and agility.
            </p>
            <h2 className="text-2xl font-bold text-blue-800 mb-4">Event Details</h2>
            <p className="text-gray-700 mb-4">Location: Main Dolphin Arena</p>
            <p className="text-gray-700 mb-6">Showtimes: 11:00 AM, 2:00 PM, and 5:00 PM daily</p>

            <h3 className="text-xl font-bold text-blue-700 mb-4">What to Expect</h3>
            <ul className="list-disc list-inside text-gray-700 mb-6">
                <li>Watch dolphins perform synchronized swimming, flips, and tricks.</li>
                <li>Learn about dolphin behavior, diet, and conservation efforts.</li>
                <li>Meet our trainers and enjoy an interactive Q&A session after the show.</li>
            </ul>

            <a 
                href="/tickets" 
                className="mt-6 inline-block bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition"
            >
                Purchase Tickets
            </a>
        </div>
    );
}
