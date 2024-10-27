import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	ArrowLeftIcon,
	ArrowRight,
	PencilIcon,
	PlusIcon,
	User,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { useNavigate, useParams } from "react-router-dom";

export default function DepartmentInfo() {
	const paginationSize = 10;
	const [leftIndex, setLeftIndex] = useState(0);
	const [rightIndex, setRightIndex] = useState(paginationSize);
	const [currentPage, setCurrentPage] = useState(1);
	const navigate = useNavigate();
	const { department_id } = useParams();
	const [data, setData] = useState([
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
	]);
	return (
		<>
			<div className="flex items-center w-full justify-between mb-4">
				<div className="flex items-center gap-2 w-full">
					<Button
						size="icon"
						variant="outline"
						onClick={() => navigate("/admin/department")}
					>
						<ArrowLeftIcon className="h-5 w-5" />
					</Button>
					<h1 className="text-3xl font-semibold text-gray-800">
						Department {department_id}
					</h1>
				</div>

				<Button
					asChild
					className="flex items-center gap-2 font-semibold bg-secondaryBg hover:bg-secondaryBg"
				>
					<Link to="employee/create">
						<PlusIcon className="h-5 w-5" /> Create Employee
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
						<User className="w-4 h-4" /> Assign Employees
					</Link>
				</Button>
			</div>

			<h1 className="text-gray-800 text-xl font-semibold w-full border-b border-b-gray-400 pb-2">
				Department Employees
			</h1>

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
									navigate(`employee/${item.employee_id}`);
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
