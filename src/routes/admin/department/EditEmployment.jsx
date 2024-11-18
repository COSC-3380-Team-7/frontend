import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeftIcon } from "lucide-react";
import Datepicker from "react-tailwindcss-datepicker";
import Loading from "@/components/Loading";
import { sqlDateConverter } from "@/utils/convertToDateSQL";

export default function EditEmployment() {
	const { department_id, employee_id } = useParams();
	const [employeeInfo, setEmployeeInfo] = useState({
		salary: "",
		password: "",
		confirm_password: "",
		department_id: "",
		occupation_id: "",
		auth_level_id: "",
		manager_id: "",
		position: "",
		employment_status: "",
	});

	const [departments, setDepartments] = useState([]);
	const [occupations, setOccupations] = useState([]);

	const [departmentManagers, setDepartmentManagers] = useState([]);
	const [employeePosition, setEmployeePosition] = useState({
		position: "",
	});
	const [hireDate, setHireDate] = useState({
		startDate: null,
		endDate: null,
	});
	const [dateOfBirth, setDateOfBirth] = useState({
		startDate: null,
		endDate: null,
	});

	const [isLoading, setIsLoading] = useState(true);
	const navigate = useNavigate();

	async function handleSubmit(e) {
		e.preventDefault();

		if (employeeInfo.password !== employeeInfo.confirm_password) {
			toast.error("Passwords do not match");
			return;
		}

		setIsLoading(true);
		const res = await fetch(
			`${import.meta.env.VITE_API_URL}/admin/employee_employment`,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					salary: employeeInfo.salary,
					password: employeeInfo.password ? employeeInfo.password : null,
					department_id: employeeInfo.department_id,
					occupation_id: employeeInfo.occupation_id,
					auth_level_id: employeeInfo.auth_level_id,
					employment_status: employeeInfo.employment_status,
					hire_date: sqlDateConverter(hireDate.startDate),
					date_of_birth: sqlDateConverter(dateOfBirth.startDate),
					manager_id: employeeInfo.manager_id ? employeeInfo.manager_id : null,
					employee_id: employee_id,
				}),
			}
		);

		setIsLoading(false);

		if (!res.ok) {
			toast.error("Error updating employee");
			console.error("Error updated employee: ", res);
			return;
		}

		toast.success("Employee updated successfully");
	}

	useEffect(() => {
		async function fetchData() {
			const occRes = await fetch(
				`${import.meta.env.VITE_API_URL}/admin/occupations`
			);

			if (!occRes.ok) {
				console.error("Error fetching data: ", occRes);
				setIsLoading(false);
				return;
			}

			const occData = await occRes.json();
			console.log(occData.data);
			setOccupations(occData.data);

			const depManagerRes = await fetch(
				`${
					import.meta.env.VITE_API_URL
				}/admin/department_manager/:${department_id}`
			);

			if (!depManagerRes.ok) {
				console.error("Error fetching data: ", depManagerRes);
				setIsLoading(false);
				return;
			}

			const depManagerData = await depManagerRes.json();
			console.log(depManagerData.data);
			setDepartmentManagers(depManagerData.data);

			const depRes = await fetch(
				`${import.meta.env.VITE_API_URL}/admin/department`
			);

			if (!depRes.ok) {
				console.error("Error fetching data: ", depRes);
				setIsLoading(false);
				return;
			}

			const depData = await depRes.json();
			console.log(depData.data);
			setDepartments(depData.data);

			const empRes = await fetch(
				`${import.meta.env.VITE_API_URL}/admin/employee/:${employee_id}`
			);
			if (!empRes.ok) {
				console.error("Error fetching data: ", empRes);
				setIsLoading(false);
				return;
			}

			const empData = await empRes.json();
			console.log(empData.data);
			setEmployeeInfo((prev) => {
				return {
					...prev,
					salary: empData.data.salary,
					department_id: empData.data.department_id.toString(),
					occupation_id: empData.data.occupation_id.toString(),
					auth_level_id: empData.data.auth_level_id.toString(),
					position: empData.data.position,
					employment_status: empData.data.employment_status,
					manager_id: empData.data.manager_id
						? empData.data.manager_id.toString()
						: "",
				};
			});

			setEmployeePosition({
				position: empData.data.position,
			});

			setHireDate({
				startDate: new Date(empData.data.hire_date),
				endDate: new Date(empData.data.hire_date),
			});

			setDateOfBirth({
				startDate: new Date(empData.data.date_of_birth),
				endDate: new Date(empData.data.date_of_birth),
			});

			setIsLoading(false);
		}
		fetchData();
	}, [employee_id, department_id]);

	if (isLoading) {
		return <Loading />;
	}

	return (
		<>
			<div className="flex items-center gap-2 w-full mb-6">
				<Button
					size="icon"
					variant="outline"
					onClick={() =>
						navigate(
							`/admin/department/${department_id}/employee/${employee_id}`
						)
					}
				>
					<ArrowLeftIcon className="h-5 w-5" />
				</Button>
				<h1 className="text-3xl font-semibold text-gray-800">Edit Employee</h1>
			</div>

			<form onSubmit={handleSubmit}>
				<h1 className="text-xl font-semibold w-full border-b border-b-gray-400 pb-2 mt-8">
					Employment Information
				</h1>

				<div className="mt-4">
					<Label htmlFor="department_id">Department</Label>

					<Select
						name="department_id"
						id="department_id"
						value={employeeInfo.department_id}
						onValueChange={(value) =>
							setEmployeeInfo((prev) => ({ ...prev, department_id: value }))
						}
						required
					>
						<SelectTrigger className="max-w-52 border-gray-500">
							<SelectValue placeholder="Select Department" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								{departments.map((department) => (
									<SelectItem
										key={department.department_id}
										value={department.department_id.toString()}
									>
										{department.name}
									</SelectItem>
								))}
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>

				<div className="mt-4">
					<Label htmlFor="occupation_id">Occupation</Label>

					<Select
						value={employeeInfo.occupation_id}
						onValueChange={(value) =>
							setEmployeeInfo((prev) => ({ ...prev, occupation_id: value }))
						}
						name="occupation_id"
						id="occupation_id"
						required
					>
						<SelectTrigger className="max-w-52 border-gray-500">
							<SelectValue placeholder="Select Occupation" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectLabel>Occupation</SelectLabel>
								{occupations.map((occupation) => (
									<SelectItem
										key={occupation.occupation_id}
										value={occupation.occupation_id.toString()}
									>
										{occupation.name}
									</SelectItem>
								))}
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>

				<div className="mt-4">
					<Label htmlFor="auth_level_id">Position</Label>

					<Select
						value={employeeInfo.auth_level_id}
						onValueChange={(value) =>
							setEmployeeInfo((prev) => ({ ...prev, auth_level_id: value }))
						}
						name="auth_level_id"
						id="auth_level_id"
						required
					>
						<SelectTrigger className="max-w-52 border-gray-500">
							<SelectValue placeholder="Select Position" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectLabel>Position</SelectLabel>
								<SelectItem value="2">Employee</SelectItem>
								<SelectItem value="3">Manager</SelectItem>
								<SelectItem value="4">Admin</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>

				<div className="mt-4">
					<Label htmlFor="employment_status">Employment Status</Label>

					<Select
						value={employeeInfo.employment_status}
						onValueChange={(value) =>
							setEmployeeInfo((prev) => ({ ...prev, employment_status: value }))
						}
						name="employment_status"
						id="employment_status"
						required
					>
						<SelectTrigger className="max-w-52 border-gray-500">
							<SelectValue placeholder="Select Status" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectLabel>Status</SelectLabel>
								<SelectItem value="Employed">Employed</SelectItem>
								<SelectItem value="Former Employee">Former Employee</SelectItem>
								<SelectItem value="Fired">Fired</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>

				{/* {employeePosition.position === "Employee" && (
					<div className="mt-4">
						<Label htmlFor="manager_id">Assign Manager</Label>

						<Select
							value={employeeInfo.manager_id}
							onValueChange={(value) =>
								setEmployeeInfo((prev) => ({ ...prev, manager_id: value }))
							}
							name="manager_id"
							id="manager_id"
							required
						>
							<SelectTrigger className="max-w-52 border-gray-500">
								<SelectValue placeholder="Select manager" />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectLabel>Manager</SelectLabel>
									{departmentManagers.map((el) => (
										<SelectItem
											key={el.employee_id}
											value={el.employee_id.toString()}
										>
											{el.first_name} {el.last_name}
										</SelectItem>
									))}
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>
				)} */}

				<div className="mt-4">
					<Label htmlFor="salary">Salary</Label>
					<Input
						value={employeeInfo.salary}
						onChange={(e) =>
							setEmployeeInfo((prev) => ({
								...prev,
								salary: e.target.value,
							}))
						}
						type="number"
						name="salary"
						step="1"
						min="1"
						max="500000"
						id="salary"
						placeholder="50000"
						required
					/>
				</div>

				<div className="mt-4 flex flex-col gap-1 max-w-52">
					<Label>Hire Date</Label>
					<Datepicker
						inputClassName="w-full rounded-md border border-gray-500 bg-background px-3 py-2 text-sm ring-offset-background file:border-0 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
						primaryColor="lime"
						useRange={false}
						asSingle={true}
						value={hireDate}
						onChange={(newValue) => setHireDate(newValue)}
						required
					/>
				</div>

				<div className="mt-4">
					<Label htmlFor="password">Password</Label>
					<Input
						value={employeeInfo.password}
						onChange={(e) =>
							setEmployeeInfo((prev) => ({
								...prev,
								password: e.target.value,
							}))
						}
						type="password"
						name="password"
						id="password"
						placeholder="••••••••••"
					/>
				</div>

				<div className="mt-4">
					<Label htmlFor="confirm_password">Confirm Password</Label>
					<Input
						value={employeeInfo.confirm_password}
						onChange={(e) =>
							setEmployeeInfo((prev) => ({
								...prev,
								confirm_password: e.target.value,
							}))
						}
						type="password"
						name="confirm_password"
						id="confirm_password"
						placeholder="••••••••••"
					/>
				</div>

				<div className="flex w-full justify-end max-w-2xl">
					<Button
						disabled={isLoading}
						className="w-28 bg-buttonBg mt-8 rounded-md border border-primaryBorder hover:bg-primaryBorder py-5
						 transition-colorstext-white font-bold disabled:cursor-not-allowed"
					>
						Save
					</Button>
				</div>
			</form>
		</>
	);
}
