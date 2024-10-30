// src/pages/animals/ReptileHouse.jsx

import React from 'react';

export default function ReptileHouse() {
    return (
        <div className="min-h-screen bg-green-50 p-8">
            <h1 className="text-5xl font-bold text-center mb-8 text-green-800">Reptile House</h1>
            <img 
                src="https://s28164.pcdn.co/files/King-Cobra-00251-4231-300x200.jpg" 
                alt="Reptile House" 
                className="w-full max-w-4xl mx-auto rounded-lg shadow-lg mb-6"
            />
            <p className="text-lg text-gray-700 mb-6 max-w-4xl mx-auto">
                Explore a diverse range of reptiles, including snakes, lizards, turtles, and more. The Reptile House offers a close look at some of the most fascinating and misunderstood animals on the planet.
            </p>
            <h2 className="text-2xl font-bold text-green-800 mb-4">Conservation Status: Varies by Species</h2>
            <p className="text-gray-700 mb-4">Habitat: Diverse - deserts, rainforests, wetlands, and oceans</p>
            <p className="text-gray-700 mb-6">Diet: Carnivore - primarily insects, small mammals, and other reptiles</p>

            <h3 className="text-xl font-bold text-green-700 mb-4">Interesting Facts</h3>
            <ul className="list-disc list-inside text-gray-700 mb-6">
                <li>Reptiles are ectothermic (cold-blooded), meaning they rely on external heat sources to regulate their body temperature.</li>
                <li>Snakes have a highly developed sense of smell and use their forked tongue to pick up scent particles.</li>
                <li>Certain reptiles, like turtles, can live for over 100 years.</li>
            </ul>

            <h3 className="text-xl font-bold text-green-700 mb-4">Visitor Experience</h3>
            <p className="text-gray-700 max-w-4xl mx-auto">
                Get up close with some of the world’s most fascinating reptiles in the Reptile House. Enjoy interactive exhibits and daily keeper presentations to learn more about these unique animals.
            </p>
        </div>
    );
}
