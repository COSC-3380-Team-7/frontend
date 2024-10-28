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
import { useNavigate, useParams } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function AssignExhibitEmployee() {
	const { exhibit_id } = useParams();
	const paginationSize = 10;
	const [leftIndex, setLeftIndex] = useState(0);
	const [rightIndex, setRightIndex] = useState(paginationSize);
	const [currentPage, setCurrentPage] = useState(1);
	const navigate = useNavigate();
	const [data, setData] = useState([
		{
			first_name: "James4",
			last_name: "Doe",
			employee_id: "INV001",
			assigned_exhibit: "Exhibit 1",
		},
	]);

	const [employeeInfo, setEmployeeInfo] = useState({
		first_name: "",
		last_name: "",
	});

	// Search for employee where first_name and last_name match and employee in wildlife department
	async function onSubmit(e) {
		e.preventDefault();
		// const res = await fetch(
		// 	`http://localhost:5000/api/employees?first_name=${employeeInfo.first_name}&last_name=${employeeInfo.last_name}`
		// );
		// const data = await res.json();
		// setData(data);
	}

	return (
		<>
			<div className="flex items-center gap-2 w-full mb-6">
				<Button
					size="icon"
					variant="outline"
					onClick={() => navigate(`/admin/exhibit/${exhibit_id}`)}
				>
					<ArrowLeftIcon className="h-5 w-5" />
				</Button>
				<h1 className="text-3xl font-semibold text-gray-800">
					Assign Employee
				</h1>
			</div>

			<form className="flex items-center gap-8 mb-8">
				<div className="mt-4">
					<Label htmlFor="first_name">First Name</Label>
					<Input
						value={employeeInfo.first_name}
						onChange={(e) =>
							setEmployeeInfo((prev) => ({
								...prev,
								first_name: e.target.value,
							}))
						}
						type="text"
						name="first_name"
						id="first_name"
						placeholder="John"
						required
					/>
				</div>

				<div className="mt-4">
					<Label htmlFor="last_name">Last Name</Label>
					<Input
						value={employeeInfo.last_name}
						onChange={(e) =>
							setEmployeeInfo((prev) => ({
								...prev,
								last_name: e.target.value,
							}))
						}
						type="text"
						name="last_name"
						id="last_name"
						placeholder="Doe"
						required
					/>
				</div>

				<Button
					className="
                    flex items-center self-end p-3 gap-1 font-semibold bg-buttonBg hover:bg-buttonHoverBg
                    "
				>
					Search
				</Button>
			</form>

			{data.length > 0 && (
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Employee Id</TableHead>
							<TableHead>First Name</TableHead>
							<TableHead>Last Name</TableHead>
							<TableHead>Assigned Exhibit</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{data.slice(leftIndex, rightIndex).map((el) => {
							return (
								<TableRow key={el.employee_id}>
									<TableCell className="font-medium">
										{el.employee_id}
									</TableCell>
									<TableCell>{el.first_name}</TableCell>
									<TableCell>{el.last_name}</TableCell>
									<TableCell>{el.assigned_exhibit}</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			)}

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
