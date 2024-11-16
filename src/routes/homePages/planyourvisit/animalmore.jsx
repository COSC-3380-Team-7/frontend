import { useState, useEffect } from "react";
import { AdvancedImage } from "@cloudinary/react";
import { cldClientSide } from "@/lib/cloudinary";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeftIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AnimalMore() {
	const { animalId } = useParams(); // Get the animal_id from the URL
	const [animal, setAnimal] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		async function fetchAnimalData() {
			try {
				const res = await fetch(
					`${import.meta.env.VITE_API_URL}/public/animal`
				);
				if (!res.ok) {
					console.error("Failed to fetch data", res);
					return;
				}

				const data = await res.json();
				const selectedAnimal = data.data.find(
					(a) => a.animal_id === parseInt(animalId, 10)
				);
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
			<div className="max-w-2xl mx-auto shadow-lg rounded-lg overflow-hidden">
				<div className="flex items-center gap-2 w-full mb-8">
					<Button
						size="icon"
						variant="outline"
						onClick={() => navigate(`/animals`)}
					>
						<ArrowLeftIcon className="h-5 w-5" />
					</Button>
					<h1 className="ml-50 text-5xl font-bold self-center text-center text-orange-800">
						{animal.name}
					</h1>
				</div>

				<div className="w-full">
					{animal.image_cloud_link && (
						<AdvancedImage
							cldImg={cldClientSide.image(animal.image_cloud_link)}
							className="w-full object-fill"
						/>
					)}
				</div>

				<div className="p-8">
					<h2 className="text-3xl font-semibold mb-4">
						Scientific Name: {animal.scientific_name}
					</h2>
					<p className="text-gray-700 mb-4">
						<strong>Fact:</strong> {animal.animal_fact}
					</p>
					<p className="text-gray-700 mb-4">
						<strong>Origin:</strong> {animal.origin}
					</p>
					<p className="text-gray-700 mb-4">
						<strong>Conservation Status:</strong> {animal.conservation_status}
					</p>
					<p className="text-gray-700 mb-4">
						<strong>Geographic Range:</strong> {animal.geographic_range}
					</p>
					<p className="text-gray-700 mb-4">
						<strong>Height:</strong> {animal.height} ft
					</p>
					<p className="text-gray-700">
						<strong>Weight:</strong> {animal.weight} lbs
					</p>
				</div>
			</div>
		</div>
	);
}
