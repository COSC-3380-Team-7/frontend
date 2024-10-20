import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogClose,
} from "@/components/ui/dialog";
import { ArrowLeftIcon, PencilIcon, UserX } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EmployeeInfo() {
	const { employee_id } = useParams();
	const navigate = useNavigate();

	return (
		<>
			<div className="flex items-center gap-2 w-full mb-3">
				<Button
					size="icon"
					variant="outline"
					onClick={() => navigate("/admin/employee")}
				>
					<ArrowLeftIcon className="h-5 w-5" />
				</Button>
				<h1 className="text-3xl font-semibold text-gray-800">
					Employee ID: {employee_id}
				</h1>
			</div>

			<div className="flex items-center gap-3">
				<Button
					asChild
					variant="outline"
					className="flex items-center gap-2 border-gray-500"
				>
					<Link to="edit">
						<PencilIcon className="w-4 h-4" /> Edit Information
					</Link>
				</Button>

				<Dialog>
					<DialogTrigger asChild>
						<Button
							variant="outline"
							className="flex items-center gap-2 border-gray-500"
						>
							<UserX className="w-4 h-4" /> Remove Employee
						</Button>
					</DialogTrigger>
					<DialogContent className="max-w-lg">
						<DialogHeader>
							<DialogTitle className="text-xl">Remove Employee</DialogTitle>
							<DialogDescription className="text-gray-700 text-base">
								Are you sure you want to remove this employee?
							</DialogDescription>
						</DialogHeader>

						<DialogFooter>
							<DialogClose asChild>
								<Button variant="destructive">Remove</Button>
							</DialogClose>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</div>

			<div className="mt-5">
				<div className="flex flex-col gap-3">
					<div>
						<h3 className="text-lg text-gray-700 font-semibold">
							Employement Status
						</h3>
						<p className="text-gray-800 font-medium">Employed</p>
					</div>
					<div>
						<h3 className="text-lg text-gray-700 font-semibold">First Name</h3>
						<p className="text-gray-800 font-medium">John</p>
					</div>
					<div>
						<h3 className="text-lg text-gray-700 font-semibold">Last Name</h3>
						<p className="text-gray-800 font-medium">Doe</p>
					</div>
					<div>
						<h3 className="text-lg text-gray-700 font-semibold">Email</h3>
						<p className="text-gray-800 font-medium">email</p>
					</div>
					<div>
						<h3 className="text-lg text-gray-700 font-semibold">
							Phone Number
						</h3>
						<p className="text-gray-800 font-medium">123456789</p>
					</div>
					<div>
						<h3 className="text-lg text-gray-700 font-semibold">Address</h3>
						<p className="text-gray-800 font-medium">1234 Main St</p>
					</div>
					<div>
						<h3 className="text-lg text-gray-700 font-semibold">Hire Date</h3>
						<p className="text-gray-800 font-medium">2021-10-10</p>
					</div>
					<div>
						<h3 className="text-lg text-gray-700 font-semibold">Occupation</h3>
						<p className="text-gray-800 font-medium">Zoo Keeper</p>
					</div>
					<div>
						<h3 className="text-lg text-gray-700 font-semibold">Salary</h3>
						<p className="text-gray-800 font-medium">$50000</p>
					</div>
				</div>
			</div>
		</>
	);
}
