import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Habitat() {
	const navigate = useNavigate();
	const [habitats, setHabitats] = useState([
		{
			name: "Aquarium",
			description:
				"The aquarium is home to many species of fish and other aquatic animals.",
		},
	]);
	return (
		<div className="py-8 px-8 w-full">
			<div className="flex items-center gap-2 w-full mb-8">
				<h1 className="text-3xl font-semibold text-gray-800">Habitats</h1>
			</div>

			{habitats.map((exhibit) => {
				return (
					<div
						onClick={() => navigate(`${exhibit.name}/habitat`)}
						key={exhibit.name}
						className="border border-gray-300 rounded-md cursor-pointer bg-primaryBorder p-4 mb-4"
					>
						<h2 className="text-xl font-semibold">{exhibit.name}</h2>
						<p className="text-gray">{exhibit.description} </p>
					</div>
				);
			})}
		</div>
	);
}