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

export default function CreateEmployee() {
	const { department_id } = useParams();
	const [employeeInfo, setEmployeeInfo] = useState({
		first_name: "",
		middle_initial: "",
		last_name: "",
		email: "",
		phone_number: "",
		address: "",
		salary: "",
		password: "",
		confirm_password: "",
		department_id: "",
		occupation_id: "",
	});

	const [departments, setDepartments] = useState([]);
	const [occupations, setOccupations] = useState([]);
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
		const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/employee`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				first_name: employeeInfo.first_name,
				middle_initial: employeeInfo.middle_initial
					? employeeInfo.middle_initial
					: null,
				last_name: employeeInfo.last_name,
				email: employeeInfo.email,
				phone_number: employeeInfo.phone_number,
				address: employeeInfo.address,
				salary: employeeInfo.salary,
				password: employeeInfo.password,
				department_id: employeeInfo.department_id,
				occupation_id: employeeInfo.occupation_id,
				auth_level_id: 2,
				employment_status: "Employed",
				hire_date: sqlDateConverter(hireDate.startDate),
				date_of_birth: sqlDateConverter(dateOfBirth.startDate),
			}),
		});

		setIsLoading(false);

		if (!res.ok) {
			const data = await res.json();
			console.error("Error creating employee: ", res);
			if (data.error_message) {
				toast.error(data.error_message);
			} else {
				toast.error("Error creating employee");
			}

			return;
		}

		toast.success("Employee created successfully");
		setEmployeeInfo({
			first_name: "",
			middle_initial: "",
			last_name: "",
			email: "",
			phone_number: "",
			address: "",
			salary: "",
			password: "",
			confirm_password: "",
			department_id: "",
			occupation_id: "",
		});
		setHireDate({ startDate: null, endDate: null });
		setDateOfBirth({ startDate: null, endDate: null });
	}

	useEffect(() => {
		async function fetchData() {
			try {
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
			<div className="flex items-center gap-2 w-full mb-6">
				<Button
					size="icon"
					variant="outline"
					onClick={() => navigate(`/admin/department/${department_id}`)}
				>
					<ArrowLeftIcon className="h-5 w-5" />
				</Button>
				<h1 className="text-3xl font-semibold text-gray-800">
					Create Employee
				</h1>
			</div>

			<form onSubmit={handleSubmit}>
				<div className="max-w-2xl">
					<h1 className="text-xl font-semibold w-full border-b border-b-gray-400 pb-2">
						Personal Information
					</h1>

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
							maxLength="20"
						/>
					</div>

					<div className="mt-4">
						<Label htmlFor="middle_initial">Middle Initial</Label>
						<Input
							value={employeeInfo.middle_initial}
							onChange={(e) =>
								setEmployeeInfo((prev) => ({
									...prev,
									middle_initial: e.target.value,
								}))
							}
							type="text"
							name="middle_initial"
							id="middle_initial"
							placeholder="D"
							maxLength="1"
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
							maxLength="20"
						/>
					</div>

					<div className="mt-4 flex flex-col gap-1 max-w-52">
						<Label>Date of Birth</Label>
						<Datepicker
							inputClassName="w-full rounded-md border border-gray-500 bg-background px-3 py-2 text-sm ring-offset-background file:border-0 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
							primaryColor="lime"
							useRange={false}
							asSingle={true}
							value={dateOfBirth}
							onChange={(newValue) => setDateOfBirth(newValue)}
							required
						/>
					</div>

					<div className="mt-4">
						<Label htmlFor="address">Address</Label>
						<Input
							value={employeeInfo.address}
							onChange={(e) =>
								setEmployeeInfo((prev) => ({
									...prev,
									address: e.target.value,
								}))
							}
							type="text"
							name="address"
							id="address"
							placeholder="1234 Main St"
							required
							maxLength="100"
						/>
					</div>

					<div className="mt-4">
						<Label htmlFor="email">Email</Label>
						<Input
							value={employeeInfo.email}
							onChange={(e) =>
								setEmployeeInfo((prev) => ({ ...prev, email: e.target.value }))
							}
							type="email"
							name="email"
							id="email"
							placeholder="user@gmail.com"
							required
							maxLength="50"
						/>
					</div>

					<div className="mt-4">
						<Label htmlFor="phone_number">Phone Number</Label>
						<Input
							value={employeeInfo.phone_number}
							onChange={(e) =>
								setEmployeeInfo((prev) => ({
									...prev,
									phone_number: e.target.value,
								}))
							}
							type="tel"
							name="phone_number"
							id="phone_number"
							placeholder="1234567899"
							pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
							required
							maxLength="10"
						/>
					</div>

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
							id="salary"
							placeholder="50000"
							min="0"
							max="2000000"
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
							required
							maxLength="50"
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
							required
							maxLength="50"
						/>
					</div>
				</div>

				<div className="flex w-full justify-end max-w-2xl">
					<Button
						disabled={isLoading}
						className="w-28 bg-buttonBg mt-8 rounded-md border border-primaryBorder hover:bg-primaryBorder py-5
						 transition-colorstext-white font-bold disabled:cursor-not-allowed"
					>
						Create
					</Button>
				</div>
			</form>
		</>
	);
}
