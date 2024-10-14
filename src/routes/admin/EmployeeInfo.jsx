import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

export default function EmployeeInfo() {
	const { id } = useParams();
	const navigate = useNavigate();
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
			<div className="flex items-center justify-between w-full mb-10">
				<h1 className="text-3xl font-semibold text-gray-800">
					Employee ID: {id}
				</h1>
			</div>
		</div>
	);
}
