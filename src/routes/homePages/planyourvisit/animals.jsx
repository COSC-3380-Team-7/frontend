// // import Loading from '@/components/Loading';
// // import { useState, useEffect } from 'react';

// // export default function Animals() {
// // 	const [animalsData, setAnimalsData] = useState([]);
// // 	const [isLoading, setIsLoading] = useState(true);

// // 	useEffect(() => {
// // 		async function fetchAnimalsData() {
// // 			try {
// // 				const res = await fetch(`${import.meta.env.VITE_API_URL}/public/animal`); // Replace with your actual API endpoint

// // 				if (!res.ok) {
// // 					console.error("Failed to fetch data", res);
// // 					setIsLoading(false);
// // 					return;
// // 				}

// // 				const data = await res.json();
// // 				setAnimalsData(data.data); // Assuming the data structure is { animals: [...] }
// // 				console.log(data)
// // 				setIsLoading(false);
// // 			} catch (error) {
// // 				console.error("Error fetching animals data:", error);
// // 				setIsLoading(false);
// // 			}
// // 		}

// // 		fetchAnimalsData();
// // 	}, []);

// // 	if (isLoading) {
// // 		return <Loading />; // Replace with your actual loading component
// // 	}

// // 	return (
// // 		<div className="min-h-screen bg-green-50 p-8">
// // 			<h1 className="text-5xl font-bold text-center mb-12 text-green-800">Explore Our Animals</h1>
// // 			<p className="text-lg text-center text-gray-700 mb-10 max-w-2xl mx-auto">
// // 				Discover a wide variety of fascinating animals at the Houston Zoo. From majestic elephants to curious orangutans, each visit supports wildlife conservation.
// // 			</p>

// // 			<div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
// // 				{animalsData.map((animal, index) => (
// // 					<div key={index} className="relative bg-white rounded-lg shadow-lg overflow-hidden">
// // 						<img src={animal.image} alt={animal.name} className="w-full h-60 object-cover" />
// // 						<div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-end p-6">
// // 							<h2 className="text-3xl font-semibold text-white">{animal.name}</h2>
// // 							<p className="text-gray-200 mt-2">{animal.description}</p>
// // 							<a 
// // 								href={animal.link} 
// // 								className="mt-4 inline-block text-lg font-bold text-green-500 bg-white py-2 px-4 rounded-lg hover:bg-green-100 transition"
// // 							>
// // 								Learn More
// // 							</a>
// // 						</div>
// // 					</div>
// // 				))}
// // 			</div>
// // 		</div>
// // 	);
// // }
// import Loading from '@/components/Loading';
// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// export default function Animals() {
// 	const [animalsData, setAnimalsData] = useState([]);
// 	const [isLoading, setIsLoading] = useState(true);
// 	const navigate = useNavigate();

// 	useEffect(() => {
// 		async function fetchAnimalsData() {
// 			try {
// 				const res = await fetch(`${import.meta.env.VITE_API_URL}/public/animal`);
// 				if (!res.ok) {
// 					console.error("Failed to fetch data", res);
// 					setIsLoading(false);
// 					return;
// 				}

// 				const data = await res.json();
// 				setAnimalsData(data.data);
// 				setIsLoading(false);
// 			} catch (error) {
// 				console.error("Error fetching animals data:", error);
// 				setIsLoading(false);
// 			}
// 		}

// 		fetchAnimalsData();
// 	}, []);

// 	if (isLoading) {
// 		return <Loading />;
// 	}

// 	return (
// 		<div className="min-h-screen bg-green-50 p-8">
// 			<h1 className="text-5xl font-bold text-center mb-12 text-green-800">Explore Our Animals</h1>
// 			<p className="text-lg text-center text-gray-700 mb-10 max-w-2xl mx-auto">
// 				Discover a wide variety of fascinating animals at the Houston Zoo. From majestic elephants to curious orangutans, each visit supports wildlife conservation.
// 			</p>

// 			<div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
// 				{animalsData.map((animal) => (
// 					<div key={animal.animal_id} className="relative bg-white rounded-lg shadow-lg overflow-hidden">
// 						<img src={animal.image_cloud_link} alt={animal.name} className="w-full h-60 object-cover" />
// 						<div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-end p-6">
// 							<h2 className="text-3xl font-semibold text-white">{animal.name}</h2>
// 							<p className="text-gray-200 mt-2">{animal.description}</p>
// 							<button
// 								className="mt-4 inline-block text-lg font-bold text-green-500 bg-white py-2 px-4 rounded-lg hover:bg-green-100 transition"
// 								onClick={() => navigate(`/animalmore/${animal.animal_id}`)}
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
import { useNavigate } from "react-router-dom";
import { AdvancedImage } from "@cloudinary/react";
import { cldClientSide } from "@/lib/cloudinary"; // Assuming you have configured Cloudinary

export default function Animals() {
	const [animalsData, setAnimalsData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		async function fetchAnimalsData() {
			try {
				const res = await fetch(`${import.meta.env.VITE_API_URL}/public/animal`);
				if (!res.ok) {
					console.error("Failed to fetch data", res);
					setIsLoading(false);
					return;
				}

				const data = await res.json();
				setAnimalsData(data.data);
				setIsLoading(false);
			} catch (error) {
				console.error("Error fetching animals data:", error);
				setIsLoading(false);
			}
		}

		fetchAnimalsData();
	}, []);

	if (isLoading) {
		return <Loading />;
	}

	return (
		<div className="min-h-screen bg-green-50 p-8">
			<h1 className="text-5xl font-bold text-center mb-12 text-green-800">
				Explore Our Animals
			</h1>
			<p className="text-lg text-center text-gray-700 mb-10 max-w-2xl mx-auto">
				Discover a wide variety of fascinating animals at the Houston Zoo. From
				majestic elephants to curious orangutans, each visit supports wildlife
				conservation.
			</p>

			<div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
				{animalsData.map((animal) => (
					<div
						key={animal.animal_id}
						className="relative bg-white rounded-lg shadow-lg overflow-hidden"
					>
						{animal.image_cloud_link ? (
							<AdvancedImage
								cldImg={cldClientSide.image(animal.image_cloud_link)}
								className="w-full h-60 object-cover"
							/>
						) : (
							<img
								src="/placeholder-image.jpg" // Fallback image
								alt={animal.name}
								className="w-full h-60 object-cover"
							/>
						)}
						<div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-end p-6">
							<h2 className="text-3xl font-semibold text-white">{animal.name}</h2>
							<p className="text-gray-200 mt-2">{animal.description}</p>
							<button
								className="mt-4 inline-block text-lg font-bold text-green-500 bg-white py-2 px-4 rounded-lg hover:bg-green-100 transition"
								onClick={() => navigate(`/animalmore/${animal.animal_id}`)}
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
