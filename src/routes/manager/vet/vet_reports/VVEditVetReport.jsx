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
import { calculateAge, formatDate } from "@/utils/dateCalcs";

export default function VVEditVetReport() {
	const { employee_id } = useManagerStore();
	console.log(employee_id);
	const { vet_report_id } = useParams();
	const [animalInfo, setAnimalInfo] = useState({
		animal_id: "",
		name: "",
		scientific_name: "",
		nickname: "",
		age: "",
		height: "",
		weight: "",
		arrival_date: "",
		date_of_birth: "",
		gender: "",
		conservation_status: "", // 'Stable', 'Threatened', 'Endangered'
		availability_status: "", // 'Present', 'Transferred', 'Deceased'
		origin: "",
		geographic_range: "",
		animal_fact: "",
		image_cloud_link: "",
	});
	const [reportInfo, setReportInfo] = useState({
		title: "",
		measured_weight: "",
		measured_height: "",
		diagnosis: "",
		symptoms: "",
		treatment: "",
		health_status: "",
	});
	const [checkupDate, setCheckupDate] = useState({
		startDate: null,
		endDate: null,
	});

	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	async function handleSubmit(e) {
		e.preventDefault();
		setIsLoading(true);

		console.log(animalInfo.animal_id);

		const response = await fetch(
			`${import.meta.env.VITE_API_URL}/admin/vet_report`,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					...reportInfo,
					animal_id: animalInfo.animal_id,
					veterinarian_id: employee_id,
					vet_report_id: vet_report_id,
					checkup_date: sqlDateConverter(checkupDate.startDate),
					created_at: sqlDateConverter(new Date()),
					updated_at: sqlDateConverter(new Date()),
				}),
			}
		);
		setIsLoading(false);

		if (!response.ok) {
			console.error("Error updating report: ", response);
			toast.error("Error updating report");
			return;
		}

		setReportInfo({
			title: "",
			measured_weight: "",
			measured_height: "",
			diagnosis: "",
			symptoms: "",
			treatment: "",
			health_status: "",
		});
		setCheckupDate({ startDate: null, endDate: null });
		toast.success("Report updated successfully");
	}

	useEffect(() => {
		async function fetchData() {
			const repRes = await fetch(
				`${import.meta.env.VITE_API_URL}/admin/vet_report/:${vet_report_id}`
			);

			if (!repRes.ok) {
				console.error("Error fetching reportData: ", repRes);
				setIsLoading(false);
				return;
			}

			const rd = await repRes.json();
			console.log(rd.data);
			setReportInfo({
				title: rd.data.title,
				measured_weight: rd.data.measured_weight,
				measured_height: rd.data.measured_height,
				diagnosis: rd.data.diagnosis,
				symptoms: rd.data.symptoms,
				treatment: rd.data.treatment,
				health_status: rd.data.health_status,
			});

			setCheckupDate({
				startDate: new Date(rd.data.checkup_date),
				endDate: new Date(rd.data.checkup_date),
			});

			const animal_id = rd.data.animal_id;

			const animalResponse = await fetch(
				`${import.meta.env.VITE_API_URL}/admin/animal/:${animal_id}`
			);

			if (!animalResponse.ok) {
				console.error("Error fetching animalData: ", animalResponse);
				setIsLoading(false);
				return;
			}

			const ad = await animalResponse.json();

			console.log(ad.data);
			setAnimalInfo({
				animal_id: ad.data.animal_id,
				name: ad.data.name,
				scientific_name: ad.data.scientific_name,
				nickname: ad.data.nickname,
				age: calculateAge(ad.data.date_of_birth),
				weight: ad.data.weight,
				height: ad.data.height,
				animal_fact: ad.data.animal_fact,
				conservation_status: ad.data.conservation_status,
				availability_status: ad.data.availability_status,
				gender: ad.data.gender,
				origin: ad.data.origin,
				geographic_range: ad.data.geographic_range,
				arrival_date: formatDate(ad.data.arrival_date),
				date_of_birth: formatDate(ad.data.date_of_birth),
				image_cloud_link: ad.data.image_cloud_link,
			});
			setIsLoading(false);
		}
		fetchData();
	}, [vet_report_id]);

	if (isLoading) {
		return <Loading />;
	}

	return (
		<>
			<div className="flex items-center gap-2 w-full mb-10">
				<Button
					size="icon"
					variant="outline"
					onClick={() => navigate(`/manager/vet/vet_report/${vet_report_id}`)}
				>
					<ArrowLeftIcon className="h-5 w-5" />
				</Button>
				<h1 className="text-3xl font-semibold text-gray-800">
					Edit Veterinary Report for {animalInfo.nickname} the {animalInfo.name}
				</h1>
			</div>

			<h1 className="text-gray-800 text-xl font-semibold w-full border-b border-b-gray-400 pb-2 mb-2">
				Animal Information
			</h1>

			<div className="flex flex-col gap-4 max-w-2xl mb-6">
				<div className="flex flex-col gap-1">
					<h3 className="text-base font-semibold text-gray-800">Name</h3>
					<span className="text-gray-700">{animalInfo.name}</span>
				</div>

				<div className="flex flex-col gap-1">
					<h3 className="text-base font-semibold text-gray-800">
						Scientific Name
					</h3>
					<span className="text-gray-700">{animalInfo.scientific_name}</span>
				</div>

				<div className="flex flex-col gap-1">
					<h3 className="text-base font-semibold text-gray-800">Nickname</h3>
					<span className="text-gray-700">{animalInfo.nickname}</span>
				</div>

				<div className="flex flex-col gap-1">
					<h3 className="text-base font-semibold text-gray-800">Height (ft)</h3>
					<span className="text-gray-700">{animalInfo.height}</span>
				</div>

				<div className="flex flex-col gap-1">
					<h3 className="text-base font-semibold text-gray-800">Weight (kg)</h3>
					<span className="text-gray-700">{animalInfo.weight}</span>
				</div>

				<div className="flex flex-col gap-1">
					<h3 className="text-base font-semibold text-gray-800">Age</h3>
					<span className="text-gray-700">
						{calculateAge(animalInfo.date_of_birth)}
					</span>
				</div>

				<div className="flex flex-col gap-1">
					<h3 className="text-base font-semibold text-gray-800">Gender</h3>
					<span className="text-gray-700">{animalInfo.gender}</span>
				</div>
			</div>

			<h1 className="text-gray-800 text-xl font-semibold w-full border-b border-b-gray-400 pb-2">
				Enter Report Details
			</h1>

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
							placeholder="Weekly Checkup"
							maxLength="200"
							required
						/>
					</div>

					<div className="mt-4">
						<Label htmlFor="measured_weight">Measured Weight (kg)</Label>
						<Input
							value={reportInfo.measured_weight}
							onChange={(e) =>
								setReportInfo({
									...reportInfo,
									measured_weight: e.target.value,
								})
							}
							type="number"
							step="0.1"
							min="0"
							max="1000"
							name="measured_weight"
							id="measured_weight"
							placeholder="23.5"
							required
						/>
					</div>

					<div className="mt-4">
						<Label htmlFor="measured_height">Measured Height (ft)</Label>
						<Input
							value={reportInfo.measured_height}
							onChange={(e) =>
								setReportInfo({
									...reportInfo,
									measured_height: e.target.value,
								})
							}
							type="number"
							step="0.1"
							min="0"
							max="100"
							name="measured_height"
							id="measured_height"
							placeholder="13.5"
							required
						/>
					</div>

					<div className="mt-4">
						<Label htmlFor="health_status">Health Status</Label>
						<Select
							value={reportInfo.health_status}
							onValueChange={(value) =>
								setReportInfo((prev) => ({ ...prev, health_status: value }))
							}
							required
						>
							<SelectTrigger className="max-w-52 border-gray-500">
								<SelectValue placeholder="Select status" />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectLabel>Status</SelectLabel>
									<SelectItem value="Healthy">Healthy</SelectItem>
									<SelectItem value="Sick">Sick</SelectItem>
									<SelectItem value="Injured">Injured</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>

					<div className="mt-4">
						<Label htmlFor="diagnosis">Diagnosis</Label>
						<Textarea
							value={reportInfo.diagnosis}
							onChange={(e) =>
								setReportInfo({ ...reportInfo, diagnosis: e.target.value })
							}
							type="text"
							name="diagnosis"
							id="diagnosis"
							placeholder="Enter diagnosis"
							className="border-gray-500"
							maxLength="1000"
							required
						/>
					</div>

					{reportInfo.health_status &&
						reportInfo.health_status !== "Healthy" && (
							<>
								<div className="mt-4">
									<Label htmlFor="symptoms">Symptoms</Label>
									<Textarea
										value={reportInfo.symptoms}
										onChange={(e) =>
											setReportInfo({ ...reportInfo, symptoms: e.target.value })
										}
										type="text"
										name="symptoms"
										id="symptoms"
										placeholder="Enter symptoms"
										className="border-gray-500"
										maxLength="1000"
										required
									/>
								</div>

								<div className="mt-4">
									<Label htmlFor="treatment">Treatment</Label>
									<Textarea
										value={reportInfo.treatment}
										onChange={(e) =>
											setReportInfo({
												...reportInfo,
												treatment: e.target.value,
											})
										}
										type="text"
										name="treatment"
										id="treatment"
										placeholder="Enter treatment"
										className="border-gray-500"
										maxLength="1000"
										required
									/>
								</div>
							</>
						)}

					<div className="mt-4 flex flex-col gap-1 max-w-52">
						<Label>Checkup Date</Label>
						<Datepicker
							inputClassName="w-full rounded-md border border-gray-500 bg-background px-3 py-2 text-sm ring-offset-background file:border-0 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
							primaryColor="lime"
							useRange={false}
							asSingle={true}
							value={checkupDate}
							onChange={(newValue) => setCheckupDate(newValue)}
							required
						/>
					</div>
				</div>

				<div className="flex w-full justify-end max-w-2xl">
					<Button
						disabled={isLoading}
						className="w-24 bg-buttonBg mt-8 rounded-md border border-primaryBorder hover:bg-primaryBorder py-5
						 transition-colorstext-white font-semibold disabled:cursor-not-allowed"
					>
						Save
					</Button>
				</div>
			</form>
		</>
	);
}
