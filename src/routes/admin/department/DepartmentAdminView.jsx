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

export default function DepartmentAdminView() {
	const paginationSize = 10;
	const [leftIndex, setLeftIndex] = useState(0);
	const [rightIndex, setRightIndex] = useState(paginationSize);
	const [currentPage, setCurrentPage] = useState(1);
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const [data, setData] = useState([
		{
			name: "James",
			department_id: "INV001",
			location: "A34",
		},
		{
			name: "James2",
			department_id: "INV002",
			location: "A34",
		},
		{
			name: "James3",
			department_id: "INV003",
			location: "A34",
		},
	]);
	return (
		<>
			<div className="flex items-center justify-between w-full mb-10">
				<h1 className="text-3xl font-semibold text-gray-800">Departments</h1>
				<Button
					asChild
					className="flex items-center gap-2 font-semibold bg-secondaryBg hover:bg-secondaryBg"
				>
					<Link to="create">
						<PlusIcon className="h-5 w-5" /> Create Department
					</Link>
				</Button>
			</div>

			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[150px]">Department Id</TableHead>
						<TableHead>Name</TableHead>
						<TableHead>Location</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{data.slice(leftIndex, rightIndex).map((el, index) => {
						return (
							<TableRow
								key={index}
								// key={el.employee_id}
								onClick={() => {
									navigate(`/admin/department/${el.department_id}`);
								}}
								className="cursor-pointer"
							>
								<TableCell className="font-medium">
									{el.department_id}
								</TableCell>
								<TableCell>{el.name}</TableCell>
								<TableCell>{el.location}</TableCell>
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