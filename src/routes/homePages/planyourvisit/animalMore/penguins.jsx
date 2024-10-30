// src/pages/animals/Penguins.jsx

import React from 'react';

export default function Penguins() {
    return (
        <div className="min-h-screen bg-green-50 p-8">
            <h1 className="text-5xl font-bold text-center mb-8 text-green-800">Penguins</h1>
            <img 
                src="https://s28164.pcdn.co/files/exhibit-galapagos-penguins-1280x720.jpg" 
                alt="Penguins" 
                className="w-full max-w-4xl mx-auto rounded-lg shadow-lg mb-6"
            />
            <p className="text-lg text-gray-700 mb-6 max-w-4xl mx-auto">
                Watch the playful penguins swim and interact in their icy habitat. They are known for their distinctive black and white tuxedo appearance and unique waddling walk.
            </p>
            <h2 className="text-2xl font-bold text-green-800 mb-4">Conservation Status: Varies by Species</h2>
            <p className="text-gray-700 mb-4">Habitat: Coastal regions of Antarctica, South America, Africa, and New Zealand</p>
            <p className="text-gray-700 mb-6">Diet: Carnivore - primarily fish, krill, and squid</p>

            <h3 className="text-xl font-bold text-green-700 mb-4">Interesting Facts</h3>
            <ul className="list-disc list-inside text-gray-700 mb-6">
                <li>Penguins are excellent swimmers and can dive to great depths to catch fish.</li>
                <li>They have a special gland that removes salt from seawater, allowing them to drink it.</li>
                <li>Penguins huddle together to keep warm in extremely cold environments.</li>
            </ul>

            <h3 className="text-xl font-bold text-green-700 mb-4">Visitor Experience</h3>
            <p className="text-gray-700 max-w-4xl mx-auto">
                Watch daily feedings and learn from our zoo keepers about how penguins thrive in icy habitats. You can also enjoy an underwater view of their incredible swimming abilities.
            </p>
        </div>
    );
}
