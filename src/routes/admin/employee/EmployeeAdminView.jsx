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

export default function EmployeeAdminView() {
	const paginationSize = 10;
	const [leftIndex, setLeftIndex] = useState(0);
	const [rightIndex, setRightIndex] = useState(paginationSize);
	const [currentPage, setCurrentPage] = useState(1);
	const navigate = useNavigate();
	const data = [
		{
			first_name: "James",
			last_name: "Doe",
			employee_id: "INV001",
			salary: "$250.00",
		},
		{
			first_name: "James2",
			last_name: "Doe",
			employee_id: "INV001",
			salary: "$250.00",
		},
		{
			first_name: "James3",
			last_name: "Doe",
			employee_id: "INV001",
			salary: "$250.00",
		},
		{
			first_name: "James4",
			last_name: "Doe",
			employee_id: "INV001",
			salary: "$250.00",
		},
		{
			first_name: "James5",
			last_name: "Doe",
			employee_id: "INV001",
			salary: "$250.00",
		},
		{
			first_name: "James",
			last_name: "Doe",
			employee_id: "INV001",
			salary: "$250.00",
		},
		{
			first_name: "James2",
			last_name: "Doe",
			employee_id: "INV001",
			salary: "$250.00",
		},
		{
			first_name: "James3",
			last_name: "Doe",
			employee_id: "INV001",
			salary: "$250.00",
		},
		{
			first_name: "James4",
			last_name: "Doe",
			employee_id: "INV001",
			salary: "$250.00",
		},
		{
			first_name: "James5",
			last_name: "Doe",
			employee_id: "INV001",
			salary: "$250.00",
		},
		{
			first_name: "James",
			last_name: "Doe",
			employee_id: "INV001",
			salary: "$250.00",
		},
		{
			first_name: "James2",
			last_name: "Doe",
			employee_id: "INV001",
			salary: "$250.00",
		},
		{
			first_name: "James3",
			last_name: "Doe",
			employee_id: "INV001",
			salary: "$250.00",
		},
		{
			first_name: "James4",
			last_name: "Doe",
			employee_id: "INV001",
			salary: "$250.00",
		},
		{
			first_name: "James5",
			last_name: "Doe",
			employee_id: "INV001",
			salary: "$250.00",
		},
	];
	return (
		<>
			<div className="flex items-center justify-between w-full mb-10">
				<h1 className="text-3xl font-semibold text-gray-800">Employees</h1>
				<Button
					asChild
					className="flex items-center gap-2 font-semibold bg-secondaryBg hover:bg-secondaryBg"
				>
					<Link to="/admin/employee/create">
						<PlusIcon className="h-5 w-5" /> Create Employee
					</Link>
				</Button>
			</div>

			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[120px]">Employee Id</TableHead>
						<TableHead>First Name</TableHead>
						<TableHead>Last Name</TableHead>
						<TableHead className="text-right">Salary</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{data.slice(leftIndex, rightIndex).map((item, index) => {
						return (
							<TableRow
								key={index}
								// key={item.employee_id}
								onClick={() => {
									navigate(`/admin/employee/${item.employee_id}`);
								}}
								className="cursor-pointer"
							>
								<TableCell className="font-medium">
									{item.employee_id}
								</TableCell>
								<TableCell>{item.first_name}</TableCell>
								<TableCell>{item.last_name}</TableCell>
								<TableCell className="text-right">{item.salary}</TableCell>
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
