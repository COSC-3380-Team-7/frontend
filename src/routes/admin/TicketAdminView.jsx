import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, ArrowRight, PlusIcon } from "lucide-react";
import { Link } from "react-router-dom";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { useNavigate } from "react-router-dom";

export default function ExhibitAdminView() {
	const paginationSize = 10;
	const [leftIndex, setLeftIndex] = useState(0);
	const [rightIndex, setRightIndex] = useState(paginationSize);
	const [currentPage, setCurrentPage] = useState(1);
	const navigate = useNavigate();
	const data = [
		{
			ticket_type_id: "ExINV001",
			category: "Savannah",
			price: "25$", 
		},
	];
	return (
		<>
			<div className="flex items-center justify-between w-full mb-10">
				<h1 className="text-3xl font-semibold text-gray-800">Tickets</h1>
				<Button
					asChild
					className="flex items-center gap-2 font-semibold bg-secondaryBg hover:bg-secondaryBg"
				>
					<Link to="/admin/exhibit/create">
						<PlusIcon className="h-5 w-5" /> Create Exhibit
					</Link>
				</Button>
			</div>

			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[120px]">Ticket type</TableHead>
						<TableHead>Category</TableHead>
						<TableHead>Price</TableHead> 
						
					</TableRow>
				</TableHeader>
				<TableBody>
					{data.map((el) => (
						<TableRow
							key={el.exhibit_id}
							onClick={() => {
								navigate(`${el.exhibit_id}`);
							}}
							className="cursor-pointer"
						>
							<TableCell className="font-medium">{el.ticket_type_id}</TableCell>
							<TableCell>{el.category}</TableCell>
							<TableCell>{el.price}</TableCell> 
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
