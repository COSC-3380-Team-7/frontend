import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, ArrowRight } from "lucide-react";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "@/components/Loading";
import { calculateAge } from "@/utils/dateCalcs";

export default function EVHabitatInfo() {
	const [paginationSize] = useState(10);
	const [leftIndex, setLeftIndex] = useState(0);
	const [rightIndex, setRightIndex] = useState(paginationSize);
	const [currentPage, setCurrentPage] = useState(1);
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();
	const { exhibit_id, habitat_id } = useParams();

	const [habitatData, setHabitatData] = useState({});
	const [animalData, setAnimalData] = useState([]);

	useEffect(() => {
		async function fetchData() {
			try {
				setIsLoading(true);
				const habitatResponse = await fetch(
					`${import.meta.env.VITE_API_URL}/admin/habitat/:${habitat_id}`
				);

				if (!habitatResponse.ok) {
					console.error("Error fetching habitatData: ", habitatResponse);
					setIsLoading(false);
					return;
				}

				const hd = await habitatResponse.json();
				console.log(hd.data);
				setHabitatData(hd.data);

				const animalResponse = await fetch(
					`${import.meta.env.VITE_API_URL}/admin/habitat_animals/:${habitat_id}`
				);

				if (!animalResponse.ok) {
					console.error("Error fetching animalData: ", animalResponse);
					setIsLoading(false);
					return;
				}

				const ad = await animalResponse.json();
				console.log(ad.data);
				setAnimalData(ad.data);
				setIsLoading(false);
			} catch (error) {
				console.error("Error fetching animalData: ", error);
			}
		}
		fetchData();
	}, [habitat_id]);

	if (isLoading) {
		return <Loading />;
	}

	return (
		<>
			<div className="flex items-center w-full justify-between mb-4">
				<div className="flex items-center gap-2 w-full">
					<Button
						size="icon"
						variant="outline"
						onClick={() => navigate(`/employee/vet/exhibit/${exhibit_id}`)}
					>
						<ArrowLeftIcon className="h-5 w-5" />
					</Button>
					<h1 className="text-3xl font-semibold text-gray-800">
						{habitatData.name} Habitat
					</h1>
				</div>
			</div>

			<h1 className="text-gray-800 text-xl font-semibold w-full border-b border-b-gray-400 pb-2">
				Animals
			</h1>

			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Animal Id</TableHead>
						<TableHead>Name</TableHead>
						<TableHead>Nickname</TableHead>
						<TableHead>Scientific Name</TableHead>
						<TableHead>Gender</TableHead>
						<TableHead>Age</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{animalData.map((el) => (
						<TableRow
							key={el.animal_id}
							onClick={() => {
								navigate(`animal/${el.animal_id}`);
							}}
							className="cursor-pointer"
						>
							<TableCell>{el.animal_id}</TableCell>
							<TableCell>{el.name}</TableCell>
							<TableCell>{el.nickname}</TableCell>
							<TableCell>{el.scientific_name}</TableCell>
							<TableCell>{el.gender}</TableCell>
							<TableCell>{calculateAge(el.date_of_birth)}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>

			<div className="flex w-full justify-end items-center gap-2 mt-4">
				<Button
					className="flex items-center p-3 gap-1 font-semibold bg-buttonBg hover:bg-buttonHoverBg"
					onClick={() => {
						setLeftIndex(leftIndex - paginationSize);
						setRightIndex(rightIndex - paginationSize);
						setCurrentPage(currentPage - 1);
					}}
					disabled={leftIndex === 0}
				>
					<ArrowLeftIcon className="h-5 w-5" /> Previous
				</Button>
				<Button
					className="flex items-center p-3 gap-1 font-semibold bg-buttonBg hover:bg-buttonHoverBg"
					onClick={() => {
						setLeftIndex(leftIndex + paginationSize);
						setRightIndex(rightIndex + paginationSize);
						setCurrentPage(currentPage + 1);
					}}
					disabled={rightIndex > animalData.length - 1}
				>
					Next
					<ArrowRight className="h-5 w-5" />
				</Button>
			</div>
		</>
	);
}
