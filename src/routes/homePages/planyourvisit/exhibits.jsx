// export default function Exhibits() {
// 	const exhibitsData = [
// 		{
// 			name: "African Forest",
// 			description: "Discover Africa's wilderness, home to gorillas, rhinos, and chimpanzees.",
// 			image: "https://s28164.pcdn.co/files/gorilla-habitat-2024-guests-1080x720.jpg",
// 		},
// 		{
// 			name: "Birds of the World",
// 			description: "Experience the colors and sounds of exotic birds from around the globe.",
// 			image: "https://s28164.pcdn.co/files/blue-throated-macaw-blog-1080x720.jpg",
// 		},
// 		{
// 			name: "Elephant Habitat",
// 			description: "See our majestic Asian elephants in their spacious, enriching habitat.",
// 			image: "https://s28164.pcdn.co/files/Chuck-elephant-blog-2-1080x720.jpg",
// 		},
// 		{
// 			name: "Reptile House",
// 			description: "Explore an impressive collection of reptiles, from snakes to lizards.",
// 			image: "https://s28164.pcdn.co/files/Black-Mamba-0016-8935-1080x720.jpg",
// 		},
// 		{
// 			name: "Giraffe feeding",
// 			description: "Zoo guests have a unique opportunity to interact with our Masai giraffe family",
// 			image: "https://s28164.pcdn.co/files/giraffe-feeding-spring-break-blog-1080x720.jpg",
// 		},
// 	];

// 	return (
// 		<div className="min-h-screen bg-gray-100 p-8">
// 			<h1 className="text-4xl font-bold text-center mb-8">Exhibits</h1>
			
// 			<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
// 				{exhibitsData.map((exhibit, index) => (
// 					<div 
// 						key={index} 
// 						className="relative bg-white rounded-lg overflow-hidden shadow-lg"
// 					>
// 						<div 
// 							className="h-48 bg-cover bg-center"
// 							style={{ backgroundImage: `url(${exhibit.image})` }}
// 						></div>
						
// 						<div className="p-6">
// 							<h2 className="text-2xl font-semibold mb-2">{exhibit.name}</h2>
// 							<p className="text-gray-600 mb-4">{exhibit.description}</p>
// 							<button 
// 								className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
// 							>
// 								Learn More
// 							</button>
// 						</div>
// 					</div>
// 				))}
// 			</div>
// 		</div>
// 	);
// }

import Loading from "@/components/Loading";
import { useState, useEffect } from "react";

export default function Exhibits() {
	const [exhibitsData, setExhibitsData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function fetchData() {
			try {
				const res = await fetch(`${import.meta.env.VITE_API_URL}/public/exhibit`);
				if (!res.ok) {
					console.error("Failed to fetch data", res);
					return;
				}
				
				const data = await res.json();
				setExhibitsData(data.data); // Assuming data is an array of exhibits
				console.log(data)
			} catch (error) {
				console.error("Error fetching data", error);
			} finally {
				setIsLoading(false);
			}
		}

		fetchData();
	}, []);

	if (isLoading) {
		return <Loading />; // Assuming <Loading /> is a loading indicator component
	}

	return (
		<div className="min-h-screen bg-gray-100 p-8">
			<h1 className="text-4xl font-bold text-center mb-8">Exhibits</h1>
			
			<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
				{exhibitsData.map((exhibit, index) => (
					<div 
						key={index} 
						className="relative bg-white rounded-lg overflow-hidden shadow-lg"
					>
						<div 
							className="h-48 bg-cover bg-center"
							style={{ backgroundImage: `url(${exhibit.image})` }}
						></div>
						
						<div className="p-6">
							<h2 className="text-2xl font-semibold mb-2">{exhibit.name}</h2>
							<p className="text-gray-600 mb-4">{exhibit.description}</p>
							<button 
								className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
							>
								Learn More
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
