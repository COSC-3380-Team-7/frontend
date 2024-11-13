import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, ArrowRight } from "lucide-react";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import Datepicker from "react-tailwindcss-datepicker";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Loading from "@/components/Loading";
import { sqlDateConverter } from "@/utils/convertToDateSQL";
import { formatDate } from "@/utils/dateCalcs";
import { toast } from "sonner";

export default function EVVetReportsView() {
	const paginationSize = 10;
	const [leftIndex, setLeftIndex] = useState(0);
	const [rightIndex, setRightIndex] = useState(paginationSize);
	const [currentPage, setCurrentPage] = useState(1);
	const navigate = useNavigate();

	// const vetReport = {
	// 	animal_id: "",
	// 	animal_name: "",
	// nickname: "",
	// 	checkup_date: "",
	// 	created_at: "",
	// 	diagnosis: "",
	// 	first_name: "",
	// 	health_status: "",
	// 	last_name: "",
	// 	measured_weight: "",
	// 	symptoms: "",
	// 	title: "",
	// 	treatment: "",
	// 	updated_at: "",
	// 	vet_report_id: "",
	// 	veterinarian_id: "",
	// };

	const [data, setData] = useState([]);

	const [startDate, setStartDate] = useState({
		startDate: null,
		endDate: null,
	});
	const [endDate, setEndDate] = useState({
		startDate: null,
		endDate: null,
	});
	const [animalInfo, setAnimalInfo] = useState({
		name: "",
		nickname: "",
	});
	const [isLoading, setIsLoading] = useState(false);

	async function handleSubmit(e) {
		e.preventDefault();

		setIsLoading(true);

		const response = await fetch(
			`${import.meta.env.VITE_API_URL}/admin/queried_vet_report?name=${
				animalInfo.name
			}&nickname=${animalInfo.nickname}
			&start_date=${sqlDateConverter(
				startDate.startDate
			)}&end_date=${sqlDateConverter(endDate.startDate)}`
		);

		setIsLoading(false);

		if (!response.ok) {
			console.log("Error fetching data", response);
			return;
		}

		const data = await response.json();
		if (data.data.length === 0) {
			console.log("No data found");
			toast.error(`Reports of ${animalInfo.name} could not be found`);
			return;
		}
		console.log(data.data);
		setData(data.data);
	}

	if (isLoading) {
		return <Loading />;
	}

	return (
		<>
			<div className="flex items-center justify-between w-full mb-10">
				<h1 className="text-3xl font-semibold text-gray-800">
					Veterinarian Reports
				</h1>
			</div>

			<form onSubmit={handleSubmit} className="flex items-center gap-8 mb-8">
				<div className="flex flex-col gap-1 max-w-52">
					<Label htmlFor="name">Animal Name</Label>
					<Input
						value={animalInfo.name}
						onChange={(e) =>
							setAnimalInfo({ ...animalInfo, name: e.target.value })
						}
						type="text"
						name="name"
						id="name"
						placeholder="African Lion"
						required
					/>
				</div>

				<div className="flex flex-col gap-1 max-w-52">
					<Label htmlFor="nickname">Animal Nickname</Label>
					<Input
						value={animalInfo.nickname}
						onChange={(e) =>
							setAnimalInfo({ ...animalInfo, nickname: e.target.value })
						}
						type="text"
						name="nickname"
						id="nickname"
						placeholder="Larry"
						required
					/>
				</div>

				<div className="flex flex-col gap-1 max-w-52">
					<Label>Checkup Start Date</Label>
					<Datepicker
						inputClassName="w-full rounded-md border border-gray-500 bg-background px-3 py-2 text-sm ring-offset-background file:border-0 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
						primaryColor="lime"
						useRange={false}
						asSingle={true}
						value={startDate}
						onChange={(newValue) => setStartDate(newValue)}
						required
					/>
				</div>

				<div className="flex flex-col gap-1 max-w-52">
					<Label>Checkup End Date</Label>
					<Datepicker
						inputClassName="w-full rounded-md border border-gray-500 bg-background px-3 py-2 text-sm ring-offset-background file:border-0 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
						primaryColor="lime"
						useRange={false}
						asSingle={true}
						value={endDate}
						onChange={(newValue) => setEndDate(newValue)}
						required
					/>
				</div>

				<Button
					className="
                    flex items-center self-end p-3 gap-1 font-semibold bg-buttonBg hover:bg-buttonHoverBg
                    "
				>
					Search
				</Button>
			</form>

			{data.length > 0 && (
				<>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Report Id</TableHead>
								<TableHead>Animal</TableHead>
								<TableHead>Nickname</TableHead>
								<TableHead>Health Status</TableHead>
								<TableHead>Created By</TableHead>
								<TableHead>Checkup Date</TableHead>
								<TableHead>Created At</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{data.slice(leftIndex, rightIndex).map((el) => {
								return (
									<TableRow
										key={el.vet_report_id}
										onClick={() => {
											navigate(`${el.vet_report_id}`);
										}}
										className="cursor-pointer"
									>
										<TableCell>{el.vet_report_id}</TableCell>
										<TableCell>{el.animal_name}</TableCell>
										<TableCell>{el.nickname}</TableCell>
										<TableCell>{el.health_status}</TableCell>
										<TableCell>
											Dr. {el.first_name} {el.last_name}
										</TableCell>
										<TableCell>{formatDate(el.checkup_date)}</TableCell>
										<TableCell>{formatDate(el.created_at)}</TableCell>
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
					<div className="flex w-full justify-end items-center gap-2 mt-4">
						<Button
							className="flex items-center p-3 gap-1 font-semibold bg-buttonBg hover:bg-buttonHoverBg"
							onClick={() => {
								setLeftIndex(leftIndex - paginationSize);
								setRightIndex(rightIndex - paginationSize);
								setCurrentPage(currentPage - 1);
							}}
							disabled={leftIndex === 0}
						>
							<ArrowLeftIcon className="h-5 w-5" /> Previous
						</Button>
						<Button
							className="flex items-center p-3 gap-1 font-semibold bg-buttonBg hover:bg-buttonHoverBg"
							onClick={() => {
								setLeftIndex(leftIndex + paginationSize);
								setRightIndex(rightIndex + paginationSize);
								setCurrentPage(currentPage + 1);
							}}
							disabled={rightIndex >= data.length - 1}
						>
							Next
							<ArrowRight className="h-5 w-5" />
						</Button>
					</div>
				</>
			)}
		</>
	);
}
