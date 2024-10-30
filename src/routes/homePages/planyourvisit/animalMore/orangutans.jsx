// src/pages/animals/Orangutans.jsx

import React from 'react';

export default function Orangutans() {
    return (
        <div className="min-h-screen bg-green-50 p-8">
            <h1 className="text-5xl font-bold text-center mb-8 text-green-800">Orangutans</h1>
            <img 
                src="https://s28164.pcdn.co/files/orangutan-kelly-2024-photo-600x400.jpg" 
                alt="Orangutans" 
                className="w-full max-w-4xl mx-auto rounded-lg shadow-lg mb-6"
            />
            <p className="text-lg text-gray-700 mb-6 max-w-4xl mx-auto">
                Meet the intelligent and curious orangutans, known for their unique personalities and complex social behavior. Orangutans are highly intelligent and have been observed using tools in the wild.
            </p>
            <h2 className="text-2xl font-bold text-green-800 mb-4">Conservation Status: Critically Endangered</h2>
            <p className="text-gray-700 mb-4">Habitat: Tropical rainforests of Borneo and Sumatra</p>
            <p className="text-gray-700 mb-6">Diet: Omnivore - fruits, leaves, insects, and small vertebrates</p>

            <h3 className="text-xl font-bold text-green-700 mb-4">Interesting Facts</h3>
            <ul className="list-disc list-inside text-gray-700 mb-6">
                <li>Orangutans are the largest arboreal mammals, spending most of their lives in trees.</li>
                <li>They are known for their problem-solving abilities and complex social interactions.</li>
                <li>An orangutan's arm span can reach up to 7 feet, allowing them to swing between branches with ease.</li>
            </ul>

            <h3 className="text-xl font-bold text-green-700 mb-4">Visitor Experience</h3>
            <p className="text-gray-700 max-w-4xl mx-auto">
                Observe the orangutans in a naturalistic environment that mimics the rainforest, and watch them interact with each other and their surroundings. Don’t miss the keeper talks to learn more about these fascinating animals.
            </p>
        </div>
    );
}
