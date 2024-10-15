import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
	Select,
	SelectValue,
	SelectTrigger,
	SelectItem,
	SelectContent,
	SelectGroup,
	SelectLabel,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import DatePicker from "@/components/DatePicker";

export default function CreateEmployee() {
	const [date, setDate] = useState("");
	console.log(date);
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
		<div className="px-12 pb-12 pt-8">
			<Button
				onClick={() => {
					navigate("/admin/employee");
				}}
				variant="outline"
				className="flex items-center gap-1 font-semibold text-sm px-3 mb-2"
			>
				<ChevronLeft className="h-5 w-5" /> Back
			</Button>
			<h1 className="text-3xl font-semibold text-gray-800">Create Employee</h1>

			<form onSubmit={handleSubmit}>
				<div className="max-w-2xl">
					<div className="mt-4">
						<Label htmlFor="first_name">First Name</Label>
						<Input
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
							type="text"
							name="middle_initial"
							id="middle_initial"
							placeholder="D"
							required
						/>
					</div>

					<div className="mt-4">
						<Label htmlFor="last_name">Last Name</Label>
						<Input
							type="text"
							name="last_name"
							id="last_name"
							placeholder="Doe"
							required
						/>
					</div>

					<div className="mt-4">
						<Label htmlFor="phone_number">Phone Number</Label>
						<Input
							type="text"
							name="phone_number"
							id="phone_number"
							placeholder="123456789"
							required
						/>
					</div>

					<div className="mt-4">
						<Label htmlFor="address">Address</Label>
						<Input
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
							type="email"
							name="email"
							id="email"
							placeholder="user@gmail.com"
							required
						/>
					</div>

					<div className="mt-4">
						<Label htmlFor="salary">Salary</Label>
						<Input
							type="text"
							name="salary"
							id="salary"
							placeholder="50000"
							required
						/>
					</div>

					<div className="mt-4">
						<Label htmlFor="department">Department</Label>
						<Select name="department" id="department" required>
							<SelectTrigger className="w-[180px] border-gray-500">
								<SelectValue placeholder="Select a fruit" />
							</SelectTrigger>
							<SelectContent side="right">
								<SelectGroup>
									<SelectLabel>Fruits</SelectLabel>
									<SelectItem value="apple">Apple</SelectItem>
									<SelectItem value="banana">Banana</SelectItem>
									<SelectItem value="blueberry">Blueberry</SelectItem>
									<SelectItem value="grapes">Grapes</SelectItem>
									<SelectItem value="pineapple">Pineapple</SelectItem>
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

					<div className="mt-4 flex flex-col gap-1">
						<Label>Hire Date</Label>
						<DatePicker date={date} setDate={setDate} />
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
		</div>
	);
}
