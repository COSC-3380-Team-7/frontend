import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function VetReportInfo() {
	const { vet_report_id } = useParams();
	const navigate = useNavigate();
	const [reportInfo, setReportInfo] = useState({
		vet_report_id: "12345678",
		title: "Tiger Weekly Health Checkup",
		animal_id: "56789",
		health_status: "Healthy", // 'Healthy', 'Sick', 'Injured'
		symptoms: "fever",
		animal: "Tiger",
		employee_id: "456789", // Veterinarian's employee ID
		veterinarian_name: "Dr. John Doe",
		diagnosis: "chicken pox",
		measured_weight: "23",
		created_at: "10/22/2024",
		updated_at: "10/22/2024",
	});

	return (
		<>
			<div className="flex items-center gap-2 w-full mb-3">
				<Button
					size="icon"
					variant="outline"
					onClick={() => navigate(`/admin/vet_report`)}
				>
					<ArrowLeftIcon className="h-5 w-5" />
				</Button>
				<h1 className="text-3xl font-semibold text-gray-800">
					Veterinarian Report {vet_report_id}
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
