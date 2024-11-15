// export default function Animals() {
// 	const animalsData = [
// 		{
// 			name: "African Elephant",
// 			description: "Discover the majestic African Elephant and learn about its habitat and conservation efforts.",
// 			image: "https://s28164.pcdn.co/files/Winnie-Teddy-elephants-scaled-e1639504152158-1080x720.jpg",
// 			link: "/african-elephant"
// 		},
// 		{
// 			name: "Giraffe",
// 			description: "Visit the Giraffe exhibit and watch these gentle giants up close.",
// 			image: "https://www.aza.org/assets/2332/houston_zoo_kevin_kendrick_masai_giraffe_calf_tino.jpg",
// 			link: "/giraffe"
// 		},
// 		{
// 			name: "Lions",
// 			description: "See the king of the jungle in his domain and learn about the lion’s role in the wild.",
// 			image: "https://s28164.pcdn.co/files/Hasani-1920x1080-2024-600x400.jpg",
// 			link: "/lions"
// 		},
// 		{
// 			name: "Penguins",
// 			description: "Watch the playful penguins swim and interact in their icy habitat.",
// 			image: "https://s28164.pcdn.co/files/exhibit-galapagos-penguins-1280x720.jpg",
// 			link: "/penguins"
// 		},
// 		{
// 			name: "Orangutans",
// 			description: "Meet the intelligent and curious orangutans, known for their unique personalities.",
// 			image: "https://s28164.pcdn.co/files/orangutan-kelly-2024-photo-600x400.jpg",
// 			link: "/orangutans"
// 		},
// 		{
// 			name: "Reptile House",
// 			description: "Explore a diverse range of reptiles, including snakes, lizards, and more.",
// 			image: "https://s28164.pcdn.co/files/King-Cobra-00251-4231-300x200.jpg",
// 			link: "/reptile-house"
// 		},
// 	];

// 	return (
// 		<div className="min-h-screen bg-green-50 p-8">
// 			<h1 className="text-5xl font-bold text-center mb-12 text-green-800">Explore Our Animals</h1>
// 			<p className="text-lg text-center text-gray-700 mb-10 max-w-2xl mx-auto">
// 				Discover a wide variety of fascinating animals at the Houston Zoo. From majestic elephants to curious orangutans, each visit supports wildlife conservation.
// 			</p>

// 			<div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
// 				{animalsData.map((animal, index) => (
// 					<div key={index} className="relative bg-white rounded-lg shadow-lg overflow-hidden">
// 						{/* Animal Image */}
// 						<img src={animal.image} alt={animal.name} className="w-full h-60 object-cover" />
// 						{/* Text Overlay */}
// 						<div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-end p-6">
// 							<h2 className="text-3xl font-semibold text-white">{animal.name}</h2>
// 							<p className="text-gray-200 mt-2">{animal.description}</p>
// 							<a 
// 								href={animal.link} 
// 								className="mt-4 inline-block text-lg font-bold text-green-500 bg-white py-2 px-4 rounded-lg hover:bg-green-100 transition"
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
import Loading from '@/components/Loading';
import { useState, useEffect } from 'react';

export default function Animals() {
	const [animalsData, setAnimalsData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function fetchAnimalsData() {
			try {
				const res = await fetch(`${import.meta.env.VITE_API_URL}/public/animal`); // Replace with your actual API endpoint

				if (!res.ok) {
					console.error("Failed to fetch data", res);
					setIsLoading(false);
					return;
				}

				const data = await res.json();
				setAnimalsData(data.data); // Assuming the data structure is { animals: [...] }
				setIsLoading(false);
			} catch (error) {
				console.error("Error fetching animals data:", error);
				setIsLoading(false);
			}
		}

		fetchAnimalsData();
	}, []);

	if (isLoading) {
		return <Loading />; // Replace with your actual loading component
	}

	return (
		<div className="min-h-screen bg-green-50 p-8">
			<h1 className="text-5xl font-bold text-center mb-12 text-green-800">Explore Our Animals</h1>
			<p className="text-lg text-center text-gray-700 mb-10 max-w-2xl mx-auto">
				Discover a wide variety of fascinating animals at the Houston Zoo. From majestic elephants to curious orangutans, each visit supports wildlife conservation.
			</p>

			<div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
				{animalsData.map((animal, index) => (
					<div key={index} className="relative bg-white rounded-lg shadow-lg overflow-hidden">
						<img src={animal.image} alt={animal.name} className="w-full h-60 object-cover" />
						<div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-end p-6">
							<h2 className="text-3xl font-semibold text-white">{animal.name}</h2>
							<p className="text-gray-200 mt-2">{animal.description}</p>
							<a 
								href={animal.link} 
								className="mt-4 inline-block text-lg font-bold text-green-500 bg-white py-2 px-4 rounded-lg hover:bg-green-100 transition"
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
