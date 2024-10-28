import { useState } from "react";
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
import { useNavigate } from "react-router-dom";

export default function VetReportsView() {
	const paginationSize = 10;
	const [leftIndex, setLeftIndex] = useState(0);
	const [rightIndex, setRightIndex] = useState(paginationSize);
	const [currentPage, setCurrentPage] = useState(1);
	const navigate = useNavigate();
	const [data, setData] = useState([
		{
			vet_report_id: "12345678",
			title: "8976543",
			animal_id: "56789",
			health_status: "Healthy",
			symptoms: "fever",
			animal: "Tiger",
			employee_id: "456789", // Veterinarian's employee ID
			veterinarian_name: "Dr. John Doe",
			diagnosis: "chicken pox",
			measured_weight: "23",
			created_at: "10/22/2024",
			updated_at: "10/22/2024",
		},
	]);
	return (
		<>
			<div className="flex items-center justify-between w-full mb-10">
				<h1 className="text-3xl font-semibold text-gray-800">
					Veterinarian Reports
				</h1>
			</div>

			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Report Id</TableHead>
						<TableHead>Animal</TableHead>
						<TableHead>Health Status</TableHead>
						<TableHead>Created By</TableHead>
						<TableHead>Created At</TableHead>
						<TableHead>Updated At</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{data.slice(leftIndex, rightIndex).map((el) => {
						return (
							<TableRow
								key={el.vet_report_id}
								onClick={() => {
									navigate(`${el.vet_report_id}`);
								}}
								className="cursor-pointer"
							>
								<TableCell>{el.vet_report_id}</TableCell>
								<TableCell>{el.animal}</TableCell>
								<TableCell>{el.health_status}</TableCell>
								<TableCell>{el.veterinarian_name}</TableCell>
								<TableCell>{el.created_at}</TableCell>
								<TableCell>{el.updated_at}</TableCell>
							</TableRow>
						);
					})}
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
