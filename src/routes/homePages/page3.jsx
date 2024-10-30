// src/pages/events/YearEndSale.jsx

import React from 'react';

export default function YearEndSale() {
    return (
        <div className="min-h-screen bg-yellow-50 p-8">
            <h1 className="text-5xl font-bold text-center mb-8 text-yellow-800">End of Year Merch Sale</h1>
            <img 
                src="https://images.nightcafe.studio/jobs/MsTuElvCNcnAmCCzS1W0/MsTuElvCNcnAmCCzS1W0--1--jb3ap.jpg?tr=w-1600,c-at_max" 
                alt="Year End Sale" 
                className="w-full max-w-4xl mx-auto rounded-lg shadow-lg mb-6"
            />
            <p className="text-lg text-gray-700 mb-6 max-w-4xl mx-auto">
                Take advantage of our End of Year Merch Sale to grab zoo-themed souvenirs, apparel, and gifts at unbeatable prices. Perfect for holiday gifts or personal keepsakes!
            </p>
            <h2 className="text-2xl font-bold text-yellow-800 mb-4">Sale Details</h2>
            <p className="text-gray-700 mb-4">Dates: December 26 - December 31</p>
            <p className="text-gray-700 mb-6">Location: Gift Shop and Online Store</p>

            <h3 className="text-xl font-bold text-yellow-700 mb-4">Sale Highlights</h3>
            <ul className="list-disc list-inside text-gray-700 mb-6">
                <li>Up to 50% off on select zoo merchandise</li>
                <li>Discounted plush toys, apparel, and drinkware</li>
                <li>Special holiday packaging available</li>
            </ul>

            <a 
                href="/gift-shop" 
                className="mt-6 inline-block bg-yellow-600 text-white py-3 px-6 rounded-lg hover:bg-yellow-700 transition"
            >
                Shop Now
            </a>
        </div>
    );
}
