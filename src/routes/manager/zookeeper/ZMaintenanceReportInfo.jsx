import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/utils/dateCalcs";
import { ArrowLeftIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function ZMaintenanceReportInfo() {
	const { maintenance_report_id } = useParams();
	const navigate = useNavigate();
	const [reportInfo, setReportInfo] = useState({
		title: "",
		habitat_name: "",
		maintenance_cause: "",
		details: "",
		working_status: "",
		employee_name: "",
		completed_at: "",
		created_at: "",
		updated_at: "",
	});

	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function fetchReportInfo() {
			// Fetch report info from the API
			const response = await fetch(
				`${
					import.meta.env.VITE_API_URL
				}/admin/maintenance_report/:${maintenance_report_id}`
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
				habitat_name: data.data.habitat_name,
				maintenance_cause: data.data.maintenance_cause,
				details: data.data.details,
				working_status: data.data.working_status,
				employee_name: `${data.data.first_name} ${data.data.last_name}`,
				created_at: formatDate(data.data.created_at),
				completed_at: formatDate(data.data.completed_at),
				updated_at: formatDate(data.data.updated_at),
			});
		}
		fetchReportInfo();
	}, [maintenance_report_id]);

	if (isLoading) {
		return <Loading />;
	}

	return (
		<>
			<div className="flex items-center gap-2 w-full mb-3">
				<Button
					size="icon"
					variant="outline"
					onClick={() => navigate(`/manager/zookeeper/maintenance_report`)}
				>
					<ArrowLeftIcon className="h-5 w-5" />
				</Button>
				<h1 className="text-3xl font-semibold text-gray-800">
					{reportInfo.habitat_name} Maintenance Report
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
