// src/pages/events/HalloweenSales.jsx

import React from 'react';

export default function HalloweenSales() {
    return (
        <div className="min-h-screen bg-orange-50 p-8">
            <h1 className="text-5xl font-bold text-center mb-8 text-orange-800">Halloween Special Sales</h1>
            <img 
                src="https://images.nightcafe.studio/jobs/V8qs4d5o2VPu8hJSeYmu/V8qs4d5o2VPu8hJSeYmu--1--47trm_4x.jpg?tr=w-1600,c-at_max" 
                alt="Halloween Sales" 
                className="w-full max-w-4xl mx-auto rounded-lg shadow-lg mb-6"
            />
            <p className="text-lg text-gray-700 mb-6 max-w-4xl mx-auto">
                Get ready for spooky savings with our Halloween Special Sales! Enjoy discounts on zoo merchandise, treats, and costumes that will delight kids and adults alike.
            </p>
            <h2 className="text-2xl font-bold text-orange-800 mb-4">Sale Details</h2>
            <p className="text-gray-700 mb-4">Dates: October 25 - October 31</p>
            <p className="text-gray-700 mb-6">Location: Gift Shop and Online Store</p>

            <h3 className="text-xl font-bold text-orange-700 mb-4">What’s on Sale</h3>
            <ul className="list-disc list-inside text-gray-700 mb-6">
                <li>Costumes and masks for kids and adults</li>
                <li>Halloween-themed treats and snacks</li>
                <li>Discounts on stuffed animals, apparel, and more</li>
            </ul>

            <a 
                href="/gift-shop" 
                className="mt-6 inline-block bg-orange-600 text-white py-3 px-6 rounded-lg hover:bg-orange-700 transition"
            >
                Visit Gift Shop
            </a>
        </div>
    );
}
