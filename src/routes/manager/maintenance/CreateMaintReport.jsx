import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeftIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import Loading from "@/components/Loading";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Datepicker from "react-tailwindcss-datepicker";
import { sqlDateConverter } from "@/utils/convertToDateSQL";
import { useManagerStore } from "@/state_management/managerStore";

export default function CreateMaintReport() {
	const { employee_id } = useManagerStore();
	console.log(employee_id);
	const { habitat_id } = useParams();
	const [habitatInfo, setHabitatInfo] = useState({
		name: "",
		description: "",
		exhibit_id: "",
	});
	const [reportInfo, setReportInfo] = useState({
		title: "",
		maintenance_cause: "",
		details: "",
		working_status: "",
	});
	const [maintenanceDate, setMaintenanceDate] = useState({
		startDate: null,
		endDate: null,
	});

	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();
	console.log(reportInfo);

	async function handleSubmit(e) {
		e.preventDefault();
		setIsLoading(true);

		const response = await fetch(
			`${import.meta.env.VITE_API_URL}/admin/maintenance_report`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					...reportInfo,
					employee_id: employee_id,
					habitat_id: habitat_id,
					maintenance_date: sqlDateConverter(maintenanceDate.startDate),
					created_at: sqlDateConverter(new Date()),
					updated_at: sqlDateConverter(new Date()),
					completed_at:
						reportInfo.working_status === "Completed"
							? sqlDateConverter(maintenanceDate.startDate)
							: null,
				}),
			}
		);
		setIsLoading(false);

		if (!response.ok) {
			console.error("Error creating report: ", response);
			toast.error("Error creating report");
			return;
		}

		setReportInfo({
			title: "",
			maintenance_cause: "",
			details: "",
			working_status: "",
		});
		setMaintenanceDate({ startDate: null, endDate: null });
		toast.success("Report created successfully");
	}

	useEffect(() => {
		async function fetchData() {
			const habitatRes = await fetch(
				`${import.meta.env.VITE_API_URL}/admin/habitat/:${habitat_id}`
			);

			if (!habitatRes.ok) {
				console.error("Error fetching habitat data: ", habitatRes);
				setIsLoading(false);
				return;
			}

			const ad = await habitatRes.json();

			console.log(ad.data);
			setHabitatInfo({
				name: ad.data.name,
				description: ad.data.description,
				exhibit_id: ad.data.exhibit_id,
			});
			setIsLoading(false);
		}
		fetchData();
	}, [habitat_id]);

	if (isLoading) {
		return <Loading />;
	}

	return (
		<>
			<div className="flex items-center gap-2 w-full mb-10">
				<Button
					size="icon"
					variant="outline"
					onClick={() => navigate("/manager/maintenance/search")}
				>
					<ArrowLeftIcon className="h-5 w-5" />
				</Button>
				<h1 className="text-3xl font-semibold text-gray-800">
					Create Maintenance Report for {habitatInfo.name} Habitat
				</h1>
			</div>

			<form onSubmit={handleSubmit}>
				<div className="max-w-2xl">
					<div className="mt-4">
						<Label htmlFor="title">Title</Label>
						<Input
							value={reportInfo.title}
							onChange={(e) =>
								setReportInfo({ ...reportInfo, title: e.target.value })
							}
							type="text"
							name="title"
							id="title"
							placeholder="Weekly Maintenance Report"
							required
						/>
					</div>

					<div className="mt-4">
						<Label htmlFor="maintenance_cause">Maintenance Cause</Label>
						<Textarea
							value={reportInfo.maintenance_cause}
							onChange={(e) =>
								setReportInfo({
									...reportInfo,
									maintenance_cause: e.target.value,
								})
							}
							type="text"
							name="maintenance_cause"
							id="maintenance_cause"
							placeholder="Enter maintenance_cause"
							className="border-gray-500"
							maxLength="1000"
							required
						/>
					</div>

					<div className="mt-4">
						<Label htmlFor="details">Maintenance Details</Label>
						<Textarea
							value={reportInfo.details}
							onChange={(e) =>
								setReportInfo({ ...reportInfo, details: e.target.value })
							}
							type="text"
							name="details"
							id="details"
							placeholder="Enter details"
							className="border-gray-500"
							maxLength="1000"
							required
						/>
					</div>

					<div className="mt-4 flex flex-col gap-1 max-w-52">
						<Label>Maintenance Date</Label>
						<Datepicker
							inputClassName="w-full rounded-md border border-gray-500 bg-background px-3 py-2 text-sm ring-offset-background file:border-0 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
							primaryColor="lime"
							useRange={false}
							asSingle={true}
							value={maintenanceDate}
							onChange={(newValue) => setMaintenanceDate(newValue)}
							required
						/>
					</div>
				</div>

				<div className="mt-4">
					<Label htmlFor="working_status">Working Status</Label>
					<Select
						value={reportInfo.working_status}
						onValueChange={(value) =>
							setReportInfo((prev) => ({ ...prev, working_status: value }))
						}
						required
					>
						<SelectTrigger className="max-w-52 border-gray-500">
							<SelectValue placeholder="Select status" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectLabel>Status</SelectLabel>
								<SelectItem value="Pending">Pending</SelectItem>
								<SelectItem value="In Progress">In Progress</SelectItem>
								<SelectItem value="Completed">Completed</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>

				<div className="flex w-full justify-end max-w-2xl">
					<Button
						disabled={isLoading}
						className="w-24 bg-buttonBg mt-8 rounded-md border border-primaryBorder hover:bg-primaryBorder py-5
						 transition-colorstext-white font-semibold disabled:cursor-not-allowed"
					>
						Create
					</Button>
				</div>
			</form>
		</>
	);
}
