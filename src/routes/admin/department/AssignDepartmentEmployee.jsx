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
import { useNavigate, useParams } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Loading from "@/components/Loading";
import { toast } from "sonner";

export default function AssignDepartmentEmployee() {
	const { department_id } = useParams();
	const [paginationSize] = useState(10);
	const [leftIndex, setLeftIndex] = useState(0);
	const [rightIndex, setRightIndex] = useState(paginationSize);
	const [currentPage, setCurrentPage] = useState(1);
	const navigate = useNavigate();
	const [data, setData] = useState([]);
	const [departmentInfo, setDepartmentInfo] = useState({});

	const [employeeInfoSearch, setEmployeeInfoSearch] = useState({
		first_name: "",
		last_name: "",
	});
	const [selectedEmployee, setSelectedEmployee] = useState({
		employee_id: "",
		first_name: "",
		last_name: "",
		occupation_name: "",
		title: "",
	});
	const [isLoading, setIsLoading] = useState(false);

	async function handleSubmit(e) {
		e.preventDefault();
		setIsLoading(true);

		console.log(employeeInfoSearch);

		const response = await fetch(
			`${
				import.meta.env.VITE_API_URL
			}/admin/other_department_employees?first_name=${
				employeeInfoSearch.first_name
			}&last_name=${
				employeeInfoSearch.last_name
			}&department_id=${department_id}`
		);
		setIsLoading(false);

		if (!response.ok) {
			toast.error("Employees could not be found");
			return;
		}

		const data = await response.json();

		if (data.data.length === 0) {
			toast.error("Employees could not be found");
			return;
		}

		console.log(data.data);
		setData(data.data);
	}

	async function assignEmployee(e) {
		e.preventDefault();
		setIsLoading(true);

		const response = await fetch(
			`${import.meta.env.VITE_API_URL}/admin/assign_employee_department`,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					employee_id: selectedEmployee.employee_id,
					department_id: department_id,
				}),
			}
		);
		setIsLoading(false);

		if (!response.ok) {
			toast.error("Employee could not be assigned to department");
			return;
		}

		setData([]);
		setSelectedEmployee({});
		setEmployeeInfoSearch({
			first_name: "",
			last_name: "",
		});

		toast.success("Employee assigned to department successfully");
	}

	useEffect(() => {
		async function fetchDepartment() {
			setIsLoading(true);

			const departmentResponse = await fetch(
				`${import.meta.env.VITE_API_URL}/admin/department/:${department_id}`
			);
			setIsLoading(false);

			if (!departmentResponse.ok) {
				setIsLoading(false);
				console.log(departmentResponse);
				return;
			}

			const data = await departmentResponse.json();
			console.log(data.data);
			setDepartmentInfo(data.data);
		}

		fetchDepartment();
	}, [department_id]);

	if (isLoading) {
		return <Loading />;
	}

	return (
		<>
			<div className="flex items-center gap-2 w-full mb-6">
				<Button
					size="icon"
					variant="outline"
					onClick={() => navigate(`/admin/department/${department_id}`)}
				>
					<ArrowLeftIcon className="h-5 w-5" />
				</Button>
				<h1 className="text-3xl font-semibold text-gray-800">
					Assign Employees to {departmentInfo.name} Department
				</h1>
			</div>

			<form onSubmit={handleSubmit} className="flex items-center gap-8 mb-8">
				<div className="mt-4">
					<Label htmlFor="first_name">First Name</Label>
					<Input
						value={employeeInfoSearch.first_name}
						onChange={(e) =>
							setEmployeeInfoSearch((prev) => ({
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
						value={employeeInfoSearch.last_name}
						onChange={(e) =>
							setEmployeeInfoSearch((prev) => ({
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
				<>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Employee Id</TableHead>
								<TableHead>First Name</TableHead>
								<TableHead>Last Name</TableHead>
								<TableHead>Occupation</TableHead>
								<TableHead>Position</TableHead>
								<TableHead>Assigned Department</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{data.slice(leftIndex, rightIndex).map((el) => {
								return (
									<TableRow
										key={el.employee_id}
										onClick={() => {
											setSelectedEmployee({
												employee_id: el.employee_id,
												first_name: el.first_name,
												last_name: el.last_name,
												occupation_name: el.occupation_name,
												title: el.title,
											});
										}}
									>
										<TableCell className="font-medium">
											{el.employee_id}
										</TableCell>
										<TableCell>{el.first_name}</TableCell>
										<TableCell>{el.last_name}</TableCell>
										<TableCell>{el.occupation_name}</TableCell>
										<TableCell>{el.title}</TableCell>
										<TableCell>{el.department_name}</TableCell>
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
							disabled={rightIndex > data.length - 1}
						>
							Next
							<ArrowRight className="h-5 w-5" />
						</Button>
					</div>

					{selectedEmployee.employee_id && (
						<div className="mt-8">
							<h1 className="text-gray-800 text-xl font-semibold w-full border-b border-b-gray-400 pb-2">
								Selected Employee
							</h1>

							<div className="flex flex-col gap-4 mt-4 font-semibold mb-3">
								<p>Employee Id: {selectedEmployee.employee_id}</p>
								<p>First Name: {selectedEmployee.first_name}</p>
								<p>Last Name: {selectedEmployee.last_name}</p>
								<p>Occupation: {selectedEmployee.occupation_name}</p>
								<p>Position: {selectedEmployee.title}</p>
							</div>

							<Button
								onClick={assignEmployee}
								className="flex items-center p-3 gap-1 font-semibold bg-buttonBg hover:bg-buttonHoverBg"
							>
								Assign to Department
							</Button>
						</div>
					)}
				</>
			)}
		</>
	);
}
