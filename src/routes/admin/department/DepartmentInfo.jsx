import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, ArrowRight, PencilIcon, PlusIcon } from "lucide-react";
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
import Loading from "@/components/Loading";

export default function DepartmentInfo() {
	const [paginationSize] = useState(10);
	const [leftIndex, setLeftIndex] = useState(0);
	const [rightIndex, setRightIndex] = useState(paginationSize);
	const [currentPage, setCurrentPage] = useState(1);
	const navigate = useNavigate();
	const { department_id } = useParams();
	const [employeeData, setEmployeeData] = useState([]);
	const [departmentData, setDepartmentData] = useState({});
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function fetchData() {
			try {
				const empResponse = await fetch(
					`${
						import.meta.env.VITE_API_URL
					}/admin/department_employee/:${department_id}`
				);
				if (!empResponse.ok) {
					console.error("Error fetching data: ", empResponse);
					setIsLoading(false);
					return;
				}

				const empData = await empResponse.json();
				console.log(empData.data);
				setEmployeeData(empData.data);

				const departmentResponse = await fetch(
					`${import.meta.env.VITE_API_URL}/admin/department/:${department_id}`
				);

				if (!departmentResponse.ok) {
					console.error("Error fetching data: ", departmentResponse);
					setIsLoading(false);
					return;
				}

				const dData = await departmentResponse.json();
				console.log(dData.data);
				setDepartmentData(dData.data);

				setIsLoading(false);
			} catch (error) {
				console.error("Error fetching data: ", error);
			}
		}
		fetchData();
	}, [department_id]);

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
						onClick={() => navigate("/admin/department")}
					>
						<ArrowLeftIcon className="h-5 w-5" />
					</Button>
					<h1 className="text-3xl font-semibold text-gray-800">
						{departmentData.name} Department
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
			</div>

			<h1 className="text-gray-800 text-xl font-semibold w-full border-b border-b-gray-400 pb-2">
				Department Employees
			</h1>

			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Employee Id</TableHead>
						<TableHead>First Name</TableHead>
						<TableHead>Last Name</TableHead>
						<TableHead>Occupation</TableHead>
						<TableHead>Position</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{employeeData.slice(leftIndex, rightIndex).map((item, index) => {
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
								<TableCell>{item.occupation}</TableCell>
								<TableCell>{item.title}</TableCell>
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
					disabled={rightIndex >= employeeData.length - 1}
				>
					Next
					<ArrowRight className="h-5 w-5" />
				</Button>
			</div>
		</>
	);
}
