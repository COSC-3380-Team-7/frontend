
// import React from 'react';

// export default function AnimalMore() {
//     return (
//         <div className="min-h-screen bg-orange-50 p-8">
// <h1>animal more</h1>
//         </div>
//     );
// }
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function AnimalMore() {
	const { animalId } = useParams(); // Get the animal_id from the URL
	const [animal, setAnimal] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function fetchAnimalData() {
			try {
				const res = await fetch(`${import.meta.env.VITE_API_URL}/public/animal`);
				if (!res.ok) {
					console.error("Failed to fetch data", res);
					return;
				}

				const data = await res.json();
				const selectedAnimal = data.data.find((a) => a.animal_id === parseInt(animalId, 10));
				setAnimal(selectedAnimal);
			} catch (error) {
				console.error("Error fetching animal data:", error);
			} finally {
				setIsLoading(false);
			}
		}

		fetchAnimalData();
	}, [animalId]);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (!animal) {
		return <div>Animal not found.</div>;
	}

	return (
		<div className="min-h-screen bg-orange-50 p-8">
			<h1 className="text-5xl font-bold text-center mb-8 text-orange-800">{animal.name}</h1>
			<div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
				<img src={animal.image_cloud_link} alt={animal.name} className="w-full h-96 object-cover" />
				<div className="p-8">
					<h2 className="text-3xl font-semibold mb-4">Scientific Name: {animal.scientific_name}</h2>
					<p className="text-gray-700 mb-4"><strong>Fact:</strong> {animal.animal_fact}</p>
					<p className="text-gray-700 mb-4"><strong>Origin:</strong> {animal.origin}</p>
					<p className="text-gray-700 mb-4"><strong>Conservation Status:</strong> {animal.conservation_status}</p>
					<p className="text-gray-700 mb-4"><strong>Geographic Range:</strong> {animal.geographic_range}</p>
					<p className="text-gray-700 mb-4"><strong>Height:</strong> {animal.height} ft</p>
					<p className="text-gray-700"><strong>Weight:</strong> {animal.weight} lbs</p>
				</div>
			</div>
		</div>
	);
}
