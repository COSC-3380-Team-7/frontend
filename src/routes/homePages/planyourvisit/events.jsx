// export default function Events() {
// 	const eventsData = [
// 		{
// 			title: "Zoo Lights - Holiday Celebration",
// 			date: "December 1 - January 1",
// 			description: "Experience the zoo in a magical new light! Join us for an evening stroll through illuminated paths with festive displays, hot cocoa, and holiday music.",
// 			image: "https://s28164.pcdn.co/files/elephant-lanterns-2023-ZL-600x400.jpg",
// 			link: "/zoo-lights"
// 		},
// 		{
// 			title: "Wildlife Conservation Gala",
// 			date: "November 15",
// 			description: "An exclusive event to support wildlife conservation efforts with guest speakers, live music, and fine dining under the stars.",
// 			image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPBG4UHMMGa_27RmeQx4TVrBzWKbbIqDnNig&s",
// 			link: "/conservation-gala"
// 		},
// 		{
// 			title: "Family Fun Day",
// 			date: "October 28",
// 			description: "A day full of games, crafts, animal encounters, and more! Perfect for kids of all ages to explore and learn about the animals.",
// 			image: "https://s28164.pcdn.co/files/kids-birthday-parties-giraffe-scaled.jpg",
// 			link: "/family-fun-day"
// 		},
// 	];

// 	return (
// 		<div className="min-h-screen bg-gray-100 p-8">
// 			<h1 className="text-4xl font-bold text-center mb-10">Upcoming Events</h1>

// 			<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
// 				{eventsData.map((event, index) => (
// 					<div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
// 						<img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
// 						<div className="p-6">
// 							<h2 className="text-2xl font-semibold mb-2">{event.title}</h2>
// 							<p className="text-gray-600 mb-4">{event.date}</p>
// 							<p className="text-gray-700 mb-6">{event.description}</p>
// 							<a 
// 								href={event.link} 
// 								className="block text-center bg-green-600 text-white py-2 rounded hover:bg-green-700 transition duration-300"
// 							>
// 								Learn More
// 							</a>
// 						</div>
// 					</div>
// 				))}
// 			</div>
// 		</div>
// 	);
// }
import React, { useState, useEffect } from 'react';

export default function Events() {
	const [eventsData, setEventsData] = useState([]); // Initialize events data as an empty array
	const [isLoading, setIsLoading] = useState(true); // Loading state

	useEffect(() => {
		// Function to fetch data from the API
		async function fetchData() {
			try {
				const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/event`);
				setIsLoading(false);

				if (!res.ok) {
					console.error("Failed to fetch events data", res);
					return;
				}

				const data = await res.json();
				setEventsData(data.data); // Update eventsData state with fetched data
			} catch (error) {
				console.error("Error fetching events data:", error);
				setIsLoading(false);
			}
		}

		fetchData();
	}, []);

	// Conditional rendering based on loading state
	// if (isLoading) {
	// 	return <Loading />; // Assumes you have a Loading component
	// }

	return (
		<div className="min-h-screen bg-gray-100 p-8">
			<h1 className="text-4xl font-bold text-center mb-10">Upcoming Events</h1>

			<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
				{eventsData.map((event, index) => (
					<div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
						<img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
						<div className="p-6">
							<h2 className="text-2xl font-semibold mb-2">{event.title}</h2>
							<p className="text-gray-600 mb-4">{event.date}</p>
							<p className="text-gray-700 mb-6">{event.description}</p>
							<a 
								href={event.link} 
								className="block text-center bg-green-600 text-white py-2 rounded hover:bg-green-700 transition duration-300"
							>
								Learn More
							</a>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
