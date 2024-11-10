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
import { useNavigate } from "react-router-dom";
import Loading from "@/components/Loading";
import { useManagerStore } from "@/state_management/managerStore";

export default function MSupervisedEmployees() {
	const paginationSize = 10;
	const [leftIndex, setLeftIndex] = useState(0);
	const [rightIndex, setRightIndex] = useState(paginationSize);
	const [currentPage, setCurrentPage] = useState(1);
	const navigate = useNavigate();
	const [employeeData, setEmployeeData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const { employee_id } = useManagerStore();

	useEffect(() => {
		async function fetchData() {
			try {
				const empResponse = await fetch(
					`${
						import.meta.env.VITE_API_URL
					}/manager/supervised_employees/:${employee_id}`
				);
				if (!empResponse.ok) {
					console.error("Error fetching data: ", empResponse);
					setIsLoading(false);
					return;
				}

				const empData = await empResponse.json();
				console.log(empData.data);
				setEmployeeData(empData.data);

				setIsLoading(false);
			} catch (error) {
				console.error("Error fetching data: ", error);
			}
		}
		fetchData();
	}, [employee_id]);

	if (isLoading) {
		return <Loading />;
	}

	return (
		<>
			<div className="flex items-center w-full justify-between mb-8">
				<div className="flex items-center gap-2 w-full">
					<h1 className="text-3xl font-semibold text-gray-800">
						Supervised Employees
					</h1>
				</div>
			</div>

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
					{employeeData.slice(leftIndex, rightIndex).map((item) => {
						return (
							<TableRow
								key={item.employee_id}
								onClick={() => {
									navigate(`${item.employee_id}`);
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
