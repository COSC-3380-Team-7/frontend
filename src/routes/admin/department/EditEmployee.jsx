import { useState } from "react";
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

export default function EditEmployee() {
	const { department_id, employee_id } = useParams();
	const [employee, setEmployee] = useState({
		first_name: "John",
		middle_initial: "D",
		last_name: "Doe",
		phone_number: "123-456-7890",
		address: "1234 Main St",
		email: "email@gmail.com",
		salary: "50000",
		password: "password",
		department: "Houston Zookeepers",
		occupation: "Veterinarian",
		manager: "manager",
	});

	const [hireDate, setHireDate] = useState({
		startDate: null,
		endDate: null,
	});
	const [dateOfBirth, setDateOfBirth] = useState({
		startDate: null,
		endDate: null,
	});

	console.log(dateOfBirth);
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
				<div className="max-w-2xl">
					<h1 className="text-xl font-semibold w-full border-b border-b-gray-400 pb-2">
						Personal Information
					</h1>

					<div className="mt-4">
						<Label htmlFor="first_name">First Name</Label>
						<Input
							value={employee.first_name}
							onChange={(e) =>
								setEmployee({ ...employee, first_name: e.target.value })
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
							value={employee.middle_initial}
							onChange={(e) =>
								setEmployee({ ...employee, middle_initial: e.target.value })
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
							value={employee.last_name}
							onChange={(e) =>
								setEmployee({ ...employee, last_name: e.target.value })
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
							value={employee.address}
							onChange={(e) =>
								setEmployee({ ...employee, address: e.target.value })
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
							value={employee.email}
							onChange={(e) =>
								setEmployee({ ...employee, email: e.target.value })
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
							value={employee.phone_number}
							onChange={(e) =>
								setEmployee({ ...employee, phone_number: e.target.value })
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
							value={employee.department}
							onValueChange={(value) =>
								setEmployee((prev) => ({ ...prev, department: value }))
							}
							required
						>
							<SelectTrigger className="max-w-52 border-gray-500">
								<SelectValue placeholder="Select Department" />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectItem value="Houston Zookeepers">
										Houston Zookeepers
									</SelectItem>
									<SelectItem value="Houston Vets">Houston Vets</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>

					{employee.department !== "" && (
						<>
							<div className="mt-4">
								<Label htmlFor="occupation">Occupation</Label>

								<Select
									value={employee.occupation}
									onValueChange={(value) =>
										setEmployee((prev) => ({ ...prev, occupation: value }))
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
											<SelectItem value="Zookeeper">Zookeeper</SelectItem>
											<SelectItem value="Veterinarian">Veterinarian</SelectItem>
										</SelectGroup>
									</SelectContent>
								</Select>
							</div>

							<div className="mt-4">
								<Label htmlFor="salary">Salary</Label>
								<Input
									value={employee.salary}
									onChange={(e) =>
										setEmployee({ ...employee, salary: e.target.value })
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

								<Select name="manager" id="manager" required>
									<SelectTrigger className="max-w-52 border-gray-500">
										<SelectValue placeholder="Select a manager" />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											<SelectLabel>North America</SelectLabel>
											<SelectItem value="est">
												Eastern Standard Time (EST)
											</SelectItem>
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
