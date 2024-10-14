import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { Link } from "react-router-dom";

export default function EmployeeAdminView() {
	return (
		<div className="p-12">
			<div className="flex items-center justify-between w-full mb-10">
				<h1 className="text-3xl font-semibold text-gray-800">Employees</h1>
				<Button
					asChild
					className="flex items-center gap-2 font-semibold bg-secondaryBg hover:bg-secondaryBg"
				>
					<Link to="/admin/employee/create">
						<PlusIcon className="h-5 w-5" /> Create Employee
					</Link>
				</Button>
			</div>

			<table className="text-gray-900 text-sm font-medium leading-6 w-full border border-gray-700"></table>
		</div>
	);
}
