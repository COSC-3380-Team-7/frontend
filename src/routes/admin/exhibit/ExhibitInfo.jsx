import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
	ArrowLeftIcon,
	ArrowRight,
	PencilIcon,
	PlusIcon,
	UserIcon,
} from "lucide-react";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loading from "@/components/Loading";

export default function ExhibitInfo() {
	const navigate = useNavigate();
	const { exhibit_id } = useParams();
	const paginationSize = 10;
	const [leftIndex, setLeftIndex] = useState(0);
	const [rightIndex, setRightIndex] = useState(paginationSize);
	const [currentPage, setCurrentPage] = useState(1);
	const [habitatData, setHabitatData] = useState([]);
	const [exhibitData, setExhibitData] = useState({});
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		async function fetchData() {
			try {
				setIsLoading(true);
				const res1 = await fetch(
					`${import.meta.env.VITE_API_URL}/admin/exhibit/:${exhibit_id}`
				);

				if (!res1.ok) {
					console.error("Error fetching data: ", res1);
					setIsLoading(false);
					return;
				}
				const data1 = await res1.json();
				console.log(data1.data);
				setExhibitData(data1.data);

				const response = await fetch(
					`${
						import.meta.env.VITE_API_URL
					}/admin/exhibit_habitats/:${exhibit_id}`
				);

				if (!response.ok) {
					console.error("Error fetching data: ", response);
					setIsLoading(false);
					return;
				}
				const data = await response.json();

				console.log(data.data);
				setHabitatData(data.data);
				setIsLoading(false);
			} catch (error) {
				console.error("Error fetching data: ", error);
			}
		}
		fetchData();
	}, [exhibit_id]);

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
						onClick={() => navigate("/admin/exhibit")}
					>
						<ArrowLeftIcon className="h-5 w-5" />
					</Button>
					<h1 className="text-3xl font-semibold text-gray-800">
						{exhibitData.name} Exhibit
					</h1>
				</div>

				<Button
					asChild
					className="flex items-center gap-2 font-semibold bg-secondaryBg hover:bg-secondaryBg"
				>
					<Link to="habitat/create">
						<PlusIcon className="h-5 w-5" /> Create Habitat
					</Link>
				</Button>
			</div>

			<div className="flex items-center gap-4 mb-6">
				<Button
					asChild
					variant="outline"
					className="flex items-center gap-2 border-gray-500 w-40"
				>
					<Link to="edit">
						<PencilIcon className="w-4 h-4" /> Edit Information
					</Link>
				</Button>

				<Button
					asChild
					variant="outline"
					className="flex items-center gap-2 border-gray-500 w-42"
				>
					<Link to="assignment">
						<UserIcon className="w-4 h-4" /> Assign Employees
					</Link>
				</Button>
			</div>

			<h1 className="text-gray-800 text-xl font-semibold w-full border-b border-b-gray-400 pb-2">
				Habitats
			</h1>

			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Habitat Id</TableHead>
						<TableHead>Name</TableHead>
						<TableHead>Description</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{habitatData.map((el) => (
						<TableRow
							key={el.habitat_id}
							onClick={() => {
								navigate(`habitat/${el.habitat_id}`);
							}}
							className="cursor-pointer"
						>
							<TableCell className="font-medium">{el.habitat_id}</TableCell>
							<TableCell>{el.name}</TableCell>
							<TableCell className="max-w-xs text-ellipsis">
								{el.description}
							</TableCell>
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
					disabled={rightIndex >= habitatData.length - 1}
				>
					Next
					<ArrowRight className="h-5 w-5" />
				</Button>
			</div>
		</>
	);
}
