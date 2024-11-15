// export default function Attractions() {
// 	const attractionsData = [
// 		{
// 			name: "Gift Shop",
// 			description: "Find unique souvenirs and gifts for all ages at the Houston Zoo Gift Shop.",
// 			image: "https://images.squarespace-cdn.com/content/v1/61817da5c4311513b0d2428d/76fa56c8-c6af-49db-a8f4-6b626b4d6d07/interior-architecture-and-design-of-Houston-Zoo-Gift-Shop-By-COAR-Design-Group.jpg",
// 			link: "/gift-shop"
// 		},
// 		{
// 			name: "Cypress Circle Cafe",
// 			description: "Enjoy delicious meals and snacks at the Zookeeper Cafe, with views of the animal exhibits.",
// 			image: "https://s28164.pcdn.co/files/Cypress-Circle-Cafe-0008-2507-1080x720.jpg",
// 			link: "/zookeeper-cafe"
// 		},
// 		{
// 			name: "Carousel",
// 			description: "Take a ride on the beautiful carousel featuring hand-carved animals for a fun experience.",
// 			image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvPxpy1xlIbDPIWiRSe6fB65WkeKknJhzMZg&s",
// 			link: "/carousel"
// 		}, 
// 		{
// 			name: "Playground",
// 			description: "Let your kids have fun at our exciting playground, designed for children of all ages.",
// 			image: "https://s28164.pcdn.co/files/Explore-the-Wild-0003-0573-479x320.jpg",
// 			link: "/playground"
// 		},
// 		{
// 			name: "Educational Center",
// 			description: "Visit our educational center for interactive exhibits and programs about wildlife conservation.",
// 			image: "https://thevendry.com/cdn-cgi/image/width=640,quality=75,fit=contain,metadata=none,format=auto/https%3A%2F%2Fs3.us-east-1.amazonaws.com%2Fuploads.thevendry.co%2F24983%2F1668421643269_BEC-Picnic-0003-8448.jpg",
// 			link: "/educational-center"
// 		},
// 	];

// 	return (
// 		<div className="min-h-screen bg-gray-100 p-8">
// 			<h1 className="text-4xl font-bold text-center mb-10">Attractions</h1>

// 			<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
// 				{attractionsData.map((attraction, index) => (
// 					<div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
// 						<img src={attraction.image} alt={attraction.name} className="w-full h-48 object-cover" />
// 						<div className="p-6">
// 							<h2 className="text-2xl font-semibold mb-2">{attraction.name}</h2>
// 							<p className="text-gray-700 mb-6">{attraction.description}</p>
// 							<a 
// 								href={attraction.link} 
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
import { useState, useEffect } from "react";

export default function Attractions() {
	const [attractionsData, setAttractionsData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function fetchAttractions() {
			try {
				const res = await fetch(`${import.meta.env.VITE_API_URL}/attractions`);
				if (!res.ok) {
					console.error("Failed to fetch attractions data", res);
					return;
				}

				const data = await res.json();
				setAttractionsData(data.attractions); // Assuming the response has a field called 'attractions'
			} catch (error) {
				console.error("Error fetching data:", error);
			} finally {
				setIsLoading(false);
			}
		}

		fetchAttractions();
	}, []);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<div className="min-h-screen bg-gray-100 p-8">
			<h1 className="text-4xl font-bold text-center mb-10">Attractions</h1>

			<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
				{attractionsData.map((attraction, index) => (
					<div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
						<img src={attraction.image} alt={attraction.name} className="w-full h-48 object-cover" />
						<div className="p-6">
							<h2 className="text-2xl font-semibold mb-2">{attraction.name}</h2>
							<p className="text-gray-700 mb-6">{attraction.description}</p>
							<a 
								href={attraction.link} 
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
