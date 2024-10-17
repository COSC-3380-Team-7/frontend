import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { Link } from "react-router-dom";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { useNavigate } from "react-router-dom";

export default function EmployeeAdminView() {
	const navigate = useNavigate();
	const data = [
		{
			first_name: "James",
			last_name: "Doe",
			employee_id: "INV001",
			salary: "$250.00",
		},
	];
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

			<Table>
				{/* <TableCaption>A list of your recent invoices.</TableCaption> */}
				<TableHeader>
					<TableRow>
						<TableHead className="w-[120px]">Employee ID</TableHead>
						<TableHead>First Name</TableHead>
						<TableHead>Last Name</TableHead>
						<TableHead className="text-right">Salary</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{data.map((item) => (
						<TableRow
							key={item.employee_id}
							onClick={() => {
								navigate(`/admin/employee/${item.employee_id}`);
							}}
						>
							<TableCell className="font-medium">{item.employee_id}</TableCell>
							<TableCell>{item.first_name}</TableCell>
							<TableCell>{item.last_name}</TableCell>
							<TableCell className="text-right">{item.salary}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
