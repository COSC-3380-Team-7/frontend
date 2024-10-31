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

export default function CreateEmployee() {
	const { department_id } = useParams();
	const [employeeInfo, setEmployeeInfo] = useState({
		first_name: "",
		middle_initial: "",
		last_name: "",
		phone_number: "",
		address: "",
		email: "",
		salary: "",
		password: "",
		department: "",
		occupation: "",
		manager: "",
	});
	console.log(employeeInfo);

	const [departmentManagers, setDepartmentManagers] = useState([
		{
			id: "1234567",
			first_name: "John",
			last_name: "Doe",
		},
	]);
	const [occupations, setOccupations] = useState([]);
	console.log(occupations);

	const [hireDate, setHireDate] = useState({
		startDate: null,
		endDate: null,
	});
	const [dateOfBirth, setDateOfBirth] = useState({
		startDate: null,
		endDate: null,
	});

	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		/*
			Form Data {
				first_name: "John",
				middle_initial: "D",
				last_name: "Doe",
				phone_number: "123456789",
				address: "1234 Main St",
				email: "email",
				salary: "50000",
				password: """
			}
		*/
		const formData = new FormData(e.target);
		const data = Object.fromEntries(formData.entries());
		console.log(data);
		toast.success("Employee created successfully.");
	};

	useEffect(() => {
		async function fetchData() {
			try {
				setIsLoading(true);
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
							placeholder="123-456-7899"
							pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
							required
						/>
					</div>

					<h1 className="text-xl font-semibold w-full border-b border-b-gray-400 pb-2 mt-8">
						Employment Information
					</h1>

					<div className="mt-4">
						<Label htmlFor="department">Department</Label>

						<Select
							name="department"
							id="department"
							value={employeeInfo.department}
							onValueChange={(value) =>
								setEmployeeInfo((prev) => ({ ...prev, department: value }))
							}
							required
						>
							<SelectTrigger className="max-w-52 border-gray-500">
								<SelectValue placeholder="Select Department" />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectItem value="Wildlife">Wildlife</SelectItem>
									<SelectItem value="Houston Vets">Houston Vets</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>

					{employeeInfo.department !== "" && (
						<>
							<div className="mt-4">
								<Label htmlFor="occupation">Occupation</Label>

								<Select
									value={employeeInfo.occupation}
									onValueChange={(value) =>
										setEmployeeInfo((prev) => ({ ...prev, occupation: value }))
									}
									name="occupation"
									id="occupation"
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
									type="text"
									name="salary"
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
								<Label htmlFor="manager">Assigned Manager</Label>

								<Select
									value={employeeInfo.manager}
									onValueChange={(value) =>
										setEmployeeInfo((prev) => ({ ...prev, manager: value }))
									}
									name="manager"
									id="manager"
									required
								>
									<SelectTrigger className="max-w-52 border-gray-500">
										<SelectValue placeholder="Select a manager" />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											<SelectLabel>Managers</SelectLabel>
											{departmentManagers.map((manager) => (
												<SelectItem
													key={manager.id}
													value={manager.id.toString()}
												>
													{manager.first_name} {manager.last_name}
												</SelectItem>
											))}
										</SelectGroup>
									</SelectContent>
								</Select>
							</div>

							<div className="mt-4">
								<Label htmlFor="password">Password</Label>
								<Input
									type="password"
									name="password"
									id="password"
									placeholder="••••••••••"
									required
								/>
							</div>
						</>
					)}
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
