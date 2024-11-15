import React, { useState, useRef } from "react";

export default function App() {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const dropdownRef = useRef(null);
	const signedIn = false; // Change this to `true` if the user is logged in

	const backgroundImage =
		"https://s28164.pcdn.co/files/Lisa-Amur-Leopard-1.jpg"; // Static background image

	const toggleDropdown = () => {
		setIsDropdownOpen((prev) => !prev);
	};

	return (
		<div className="relative min-h-screen">
			<div
				className="absolute top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat"
				style={{
					backgroundImage: `url(${backgroundImage})`,
				}}
			/>
			<div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50" />

			<nav className="relative z-10 flex justify-between items-center p-6 text-white">
				<div className="text-2xl font-bold">Houston Zoo</div>
				<ul className="flex space-x-4">
					<li className="relative" ref={dropdownRef}>
						<a className="hover:underline" onClick={toggleDropdown}>
							Plan Your Visit
						</a>
						{isDropdownOpen && (
							<ul className="absolute left-0 mt-2 w-40 bg-white text-black text-sm shadow-lg z-20">
								{[
									"Hours",
									"Tickets",
									"Zoo Map", 
									"Events", 
									"Exhibits",
									"Animals",
								].map((item) => (
									<li key={item} className="p-2 hover:bg-gray-200">
										<a href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}>
											{item}
										</a>
									</li>
								))}
							</ul>
						)}
					</li>
					<li>
						{signedIn ? (
							<a href="/profile" className="hover:underline">
								View Profile
							</a>
						) : (
							<a href="/login" className="hover:underline">
								Login / Sign Up
							</a>
						)}
					</li>
					<li>
						<a href="/memberships" className="hover:underline">
							{signedIn ? "View Membership" : "Memberships"}
						</a>
					</li>
				</ul>
			</nav>

			<div className="absolute bottom-1/3 left-0 right-0 flex flex-col items-center justify-center z-10 text-white">
				<h2 className="text-4xl md:text-5xl font-bold text-center">
					Black Friday Merch Sale - Get Your Souvenirs!
				</h2>
				{/* <button
					className="mt-8 bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition duration-300"
					onClick={() => (window.location.href = "/year-end-sale")}
				>
					Learn More
				</button> */}
			</div>

			<div className="fixed bottom-4 right-4 z-10">
				<button className="bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700">
					Chat with Us
				</button>
			</div>
		</div>
	);
}
