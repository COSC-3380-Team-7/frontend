import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { formatDate } from "@/utils/dateCalcs";

export default function VVetReportInfo() {
	const { vet_report_id } = useParams();
	const navigate = useNavigate();
	const [reportInfo, setReportInfo] = useState({
		title: "",
		animal_name: "",
		nickname: "",
		health_status: "",
		symptoms: "",
		diagnosis: "",
		measured_weight: "",
		veterinarian_name: "",
		checkup_date: "",
		created_at: "",
		updated_at: "",
	});

	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function fetchReportInfo() {
			// Fetch report info from the API
			const response = await fetch(
				`${import.meta.env.VITE_API_URL}/admin/vet_report/:${vet_report_id}`
			);
			setIsLoading(false);
			if (!response.ok) {
				console.error("Failed to fetch report info");
				return;
			}

			const data = await response.json();
			console.log(data.data);
			setReportInfo({
				title: data.data.title,
				animal_name: data.data.animal_name,
				nickname: data.data.nickname,
				health_status: data.data.health_status,
				symptoms: data.data.symptoms,
				diagnosis: data.data.diagnosis,
				measured_weight: `${data.data.measured_weight} kg`,
				veterinarian_name: `Dr. ${data.data.first_name} ${data.data.last_name}`,
				checkup_date: formatDate(data.data.checkup_date),
				created_at: formatDate(data.data.created_at),
				updated_at: formatDate(data.data.updated_at),
			});
		}
		fetchReportInfo();
	}, [vet_report_id]);

	if (isLoading) {
		return <Loading />;
	}

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
					{reportInfo.animal_name} Veterinarian Report Details
				</h1>
			</div>

			<div className="mt-5">
				<div className="flex flex-col gap-4">
					{Object.keys(reportInfo).map((key) => {
						if (!reportInfo[key]) {
							return;
						}

						return (
							<div key={key} className="flex flex-col gap-1">
								<h3 className="text-base font-semibold text-gray-800">
									{key
										.replace(/_/g, " ")
										.replace(/\b\w/g, (char) => char.toUpperCase())}
								</h3>
								<span className="text-gray-700">{reportInfo[key]}</span>
							</div>
						);
					})}
				</div>
			</div>
		</>
	);
}
