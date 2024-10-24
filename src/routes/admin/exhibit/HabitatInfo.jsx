import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, ArrowRight, PencilIcon, PlusIcon } from "lucide-react";
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

export default function HabitatInfo() {
	const paginationSize = 10;
	const [leftIndex, setLeftIndex] = useState(0);
	const [rightIndex, setRightIndex] = useState(paginationSize);
	const [currentPage, setCurrentPage] = useState(1);
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();
	const { exhibit_id, habitat_id } = useParams();
	console.log("exhibit_id", exhibit_id, "habitat_id", habitat_id);

	const [data, setData] = useState([
		{
			animal_id: "An001",
			name: "Tiger",
			location: "A23",
			department: "Department 1",
		},
	]);

	if (isLoading) {
		return <Loading text="Initializing..." />;
	}

	return (
		<>
			<div className="flex items-center w-full justify-between mb-4">
				<div className="flex items-center gap-2 w-full">
					<Button
						size="icon"
						variant="outline"
						onClick={() => navigate(`/admin/exhibit/${exhibit_id}`)}
					>
						<ArrowLeftIcon className="h-5 w-5" />
					</Button>
					<h1 className="text-3xl font-semibold text-gray-800">
						Habitat {habitat_id}
					</h1>
				</div>

				<Button
					asChild
					className="flex items-center gap-2 font-semibold bg-secondaryBg hover:bg-secondaryBg"
				>
					<Link to="animal/create">
						<PlusIcon className="h-5 w-5" /> Add Animal
					</Link>
				</Button>
			</div>

			<div className="mb-6">
				<Button
					asChild
					variant="outline"
					className="flex items-center gap-2 border-gray-500 w-40"
				>
					<Link to="edit">
						<PencilIcon className="w-4 h-4" /> Edit Information
					</Link>
				</Button>
			</div>

			<h1 className="text-gray-800 text-xl font-semibold w-full border-b border-b-gray-400 pb-2">
				Animals
			</h1>

			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[120px]">Animal Id</TableHead>
						<TableHead>Name</TableHead>
						<TableHead>Location</TableHead>
						<TableHead>Department</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{data.map((el) => (
						<TableRow
							key={el.animal_id}
							onClick={() => {
								navigate(`animal/${el.animal_id}`);
							}}
							className="cursor-pointer"
						>
							<TableCell className="font-medium">{el.animal_id}</TableCell>
							<TableCell>{el.name}</TableCell>
							<TableCell>{el.location}</TableCell>
							<TableCell>{el.department}</TableCell>
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
					disabled={rightIndex >= data.length - 1}
				>
					Next
					<ArrowRight className="h-5 w-5" />
				</Button>
			</div>
		</>
	);
}
