// src/pages/animals/Giraffe.jsx

import React from 'react';

export default function Giraffe() {
    return (
        <div className="min-h-screen bg-green-50 p-8">
            <h1 className="text-5xl font-bold text-center mb-8 text-green-800">Giraffe</h1>
            <img 
                src="https://www.aza.org/assets/2332/houston_zoo_kevin_kendrick_masai_giraffe_calf_tino.jpg" 
                alt="Giraffe" 
                className="w-full max-w-4xl mx-auto rounded-lg shadow-lg mb-6"
            />
            <p className="text-lg text-gray-700 mb-6 max-w-4xl mx-auto">
                The tallest land animal, giraffes have distinctive long necks, allowing them to reach leaves high in trees. At the Houston Zoo, you can observe their graceful movements and unique social behaviors.
            </p>
            <h2 className="text-2xl font-bold text-green-800 mb-4">Conservation Status: Vulnerable</h2>
            <p className="text-gray-700 mb-4">Habitat: Savannas and woodlands across Africa</p>
            <p className="text-gray-700 mb-6">Diet: Herbivore - primarily acacia leaves</p>

            <h3 className="text-xl font-bold text-green-700 mb-4">Interesting Facts</h3>
            <ul className="list-disc list-inside text-gray-700 mb-6">
                <li>A giraffe’s neck can be over 6 feet long but still has only seven vertebrae, the same number as humans.</li>
                <li>Giraffes only need to drink once every few days; they get most of their water from plants.</li>
                <li>Each giraffe's coat pattern is unique, much like human fingerprints.</li>
            </ul>

            <h3 className="text-xl font-bold text-green-700 mb-4">Visitor Experience</h3>
            <p className="text-gray-700 max-w-4xl mx-auto">
                Participate in a giraffe feeding session to see their dexterous tongues in action as they gently take leaves right from your hand.
            </p>
        </div>
    );
}
