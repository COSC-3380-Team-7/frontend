// src/pages/animals/AfricanElephant.jsx

import React from 'react';

export default function AfricanElephant() {
    return (
        <div className="min-h-screen bg-green-50 p-8">
            <h1 className="text-5xl font-bold text-center mb-8 text-green-800">African Elephant</h1>
            <img 
                src="https://s28164.pcdn.co/files/Winnie-Teddy-elephants-scaled-e1639504152158-1080x720.jpg"
                alt="African Elephant" 
                className="w-full max-w-4xl mx-auto rounded-lg shadow-lg mb-6"
            />
            <p className="text-lg text-gray-700 mb-6 max-w-4xl mx-auto">
                The African Elephant is the largest land mammal, known for its intelligence, memory, and social structure. Our herd enjoys a sprawling habitat where they interact with each other and explore their environment.
            </p>
            <h2 className="text-2xl font-bold text-green-800 mb-4">Conservation Status: Endangered</h2>
            <p className="text-gray-700 mb-4">Habitat: Grasslands, forests, and savannas of Africa</p>
            <p className="text-gray-700 mb-6">Diet: Herbivore - grasses, roots, fruit, and bark</p>

            <h3 className="text-xl font-bold text-green-700 mb-4">Interesting Facts</h3>
            <ul className="list-disc list-inside text-gray-700 mb-6">
                <li>African elephants have larger ears than their Asian relatives, which help them keep cool.</li>
                <li>Their trunks have over 40,000 muscles, allowing them to grasp small objects or uproot trees.</li>
                <li>Elephants are known for their remarkable memory and strong social bonds.</li>
            </ul>

            <h3 className="text-xl font-bold text-green-700 mb-4">Visitor Experience</h3>
            <p className="text-gray-700 max-w-4xl mx-auto">
                Watch the elephants roam their large exhibit and learn about their behavior and social dynamics through daily keeper talks and feeding sessions.
            </p>
        </div>
    );
}
