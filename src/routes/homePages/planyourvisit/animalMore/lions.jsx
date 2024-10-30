// src/pages/animals/Lions.jsx

import React from 'react';

export default function Lions() {
    return (
        <div className="min-h-screen bg-green-50 p-8">
            <h1 className="text-5xl font-bold text-center mb-8 text-green-800">Lions</h1>
            <img 
                src="https://s28164.pcdn.co/files/Hasani-1920x1080-2024-600x400.jpg" 
                alt="Lions" 
                className="w-full max-w-4xl mx-auto rounded-lg shadow-lg mb-6"
            />
            <p className="text-lg text-gray-700 mb-6 max-w-4xl mx-auto">
                See the king of the jungle in his domain and learn about the lion’s role in the wild. The pride at the Houston Zoo roams in a naturalistic habitat that mimics their native savannas.
            </p>
            <h2 className="text-2xl font-bold text-green-800 mb-4">Conservation Status: Vulnerable</h2>
            <p className="text-gray-700 mb-4">Habitat: Grasslands, savannas, and open woodlands of Africa</p>
            <p className="text-gray-700 mb-6">Diet: Carnivore - primarily large herbivores like zebras and wildebeests</p>

            <h3 className="text-xl font-bold text-green-700 mb-4">Interesting Facts</h3>
            <ul className="list-disc list-inside text-gray-700 mb-6">
                <li>Lions are the only cats that live in social groups, called prides.</li>
                <li>A lion's roar can be heard up to 5 miles away.</li>
                <li>Male lions are known for their majestic manes, which darken with age.</li>
            </ul>

            <h3 className="text-xl font-bold text-green-700 mb-4">Visitor Experience</h3>
            <p className="text-gray-700 max-w-4xl mx-auto">
                Experience daily lion feedings and listen to zoo keepers share fascinating insights about these magnificent predators.
            </p>
        </div>
    );
}
