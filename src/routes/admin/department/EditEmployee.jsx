import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeftIcon } from "lucide-react";
import Datepicker from "react-tailwindcss-datepicker";
import Loading from "@/components/Loading";
import { sqlDateConverter } from "@/utils/convertToDateSQL";

export default function EditEmployee() {
	const { department_id, employee_id } = useParams();
	const [employeeInfo, setEmployeeInfo] = useState({
		first_name: "",
		middle_initial: "",
		last_name: "",
		email: "",
		phone_number: "",
		address: "",
	});

	const [dateOfBirth, setDateOfBirth] = useState({
		startDate: null,
		endDate: null,
	});

	const [isLoading, setIsLoading] = useState(true);
	const navigate = useNavigate();

	async function handleSubmit(e) {
		e.preventDefault();

		setIsLoading(true);
		const res = await fetch(
			`${import.meta.env.VITE_API_URL}/admin/employee_personal`,
			{
				method: "PUT",
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
					date_of_birth: sqlDateConverter(dateOfBirth.startDate),
					employee_id: employee_id,
				}),
			}
		);

		setIsLoading(false);

		if (!res.ok) {
			const errData = await res.json();

			if (errData.error_message) {
				toast.error(errData.error_message);
			} else {
				toast.error("Error updating employee");
				console.error("Error updating employee: ", res);
			}

			return;
		}

		toast.success("Employee updated successfully");
	}

	useEffect(() => {
		async function fetchData() {
			const empRes = await fetch(
				`${import.meta.env.VITE_API_URL}/admin/employee/:${employee_id}`
			);
			setIsLoading(false);

			if (!empRes.ok) {
				console.error("Error fetching data: ", empRes);
				return;
			}

			const empData = await empRes.json();
			console.log(empData.data);
			setEmployeeInfo((prev) => {
				return {
					...prev,
					first_name: empData.data.first_name,
					middle_initial: empData.data.middle_initial,
					last_name: empData.data.last_name,
					email: empData.data.email,
					phone_number: empData.data.phone_number,
					address: empData.data.address,
				};
			});

			setDateOfBirth({
				startDate: new Date(empData.data.date_of_birth),
				endDate: new Date(empData.data.date_of_birth),
			});
		}
		fetchData();
	}, [employee_id]);

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
