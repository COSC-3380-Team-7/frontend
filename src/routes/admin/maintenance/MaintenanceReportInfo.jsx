import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function MaintenanceReportInfo() {
	const { maintenance_report_id } = useParams();
	const navigate = useNavigate();
	const [reportInfo, setReportInfo] = useState({
		mnt_report_id: "12345678",
		title: "Damage to Tiger Habitat",
		maintenance_cause: "Tiger damaged the habitat",
		details: "Tiger broke the glass",
		working_status: "Pending", // 'Pending', 'Completed', 'In Progress'
		habitat_id: "56789",
		habitat_name: "Tiger Habitat",
		employee_id: "456789",
		employee_name: "John Doe",
		created_at: "10/22/2024",
		updated_at: "10/22/2024",
	});

	return (
		<>
			<div className="flex items-center gap-2 w-full mb-3">
				<Button
					size="icon"
					variant="outline"
					onClick={() => navigate(`/admin/maintenance_report`)}
				>
					<ArrowLeftIcon className="h-5 w-5" />
				</Button>
				<h1 className="text-3xl font-semibold text-gray-800">
					Maintenance Report {maintenance_report_id}
				</h1>
			</div>

			<div className="mt-5">
				<div className="flex flex-col gap-3">
					{Object.keys(reportInfo).map((key) => (
						<div className="mb-2" key={key}>
							<h3 className="text-lg text-gray-700 font-semibold">
								{key
									.replace(/_/g, " ")
									.replace(/\b\w/g, (char) => char.toUpperCase())}
							</h3>
							<p className="text-gray-800 font-medium">{reportInfo[key]}</p>
						</div>
					))}
				</div>
			</div>
		</>
	);
}
