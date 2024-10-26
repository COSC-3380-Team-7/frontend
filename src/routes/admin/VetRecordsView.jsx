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
			vet_report_ID:"12345678",
			title:"8976543",
			animal_id:'56789',
			healthStat_ID:"34567890",
			created_at:'10/22/2024',
			updated_at:'10/22/2024',
			symptoms:"feaver", 
			animal:"turkey",
			Employee_ID:"456789",
			diagnosis:"chicken pox",
			measured_weight:"23 lbs", 

		},
	];
	return (
		<>
			<div className="flex items-center justify-between w-full mb-10">
				<h1 className="text-3xl font-semibold text-gray-800">Vet Records</h1>
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
						{/* <TableHead className="w-[120px]">Vet Record ID</TableHead> */}
						<TableHead >Employee ID</TableHead>
						<TableHead>healthStat ID</TableHead>
						<TableHead>created at</TableHead>
						<TableHead>updated at</TableHead>
						<TableHead >symptoms</TableHead>
						<TableHead>animal ID</TableHead>
						<TableHead>Animal</TableHead>
                        <TableHead >diagnosis</TableHead> 
                        <TableHead >vet report ID</TableHead>                       

						<TableHead >measured weight</TableHead>
                        <TableHead >title</TableHead>                       

						{/* <TableHead className="text-right">Salary</TableHead> */}

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
									{item.Employee_ID}
								</TableCell>
								<TableCell>{item.healthStat_ID}</TableCell>
								<TableCell>{item.created_at}</TableCell>
								<TableCell>{item.updated_at}</TableCell>
								<TableCell>{item.symptoms}</TableCell>
								<TableCell>{item.animal_id}</TableCell>
								<TableCell>{item.animal}</TableCell>
								<TableCell>{item.diagnosis}</TableCell>
								<TableCell>{item.vet_report_ID}</TableCell>
								<TableCell>{item.measured_weight}</TableCell>
								<TableCell>{item.title}</TableCell>
								{/* <TableCell className="text-right">{item.salary}</TableCell> */}
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
