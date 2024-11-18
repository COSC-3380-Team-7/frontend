import { useEffect, useState } from "react";
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
import { Label } from "@/components/ui/label";
import Loading from "@/components/Loading";
import { formatDate } from "@/utils/dateCalcs";
import { toast } from "sonner";
import Datepicker from "react-tailwindcss-datepicker";
import { sqlDateConverter } from "@/utils/convertToDateSQL";
import { Input } from "@/components/ui/input";

export default function AnimalHealthPerformance() {
	const [paginationSize] = useState(10);
	const [rawLeftIndex, setRawLeftIndex] = useState(0);
	const [rawRightIndex, setRawRightIndex] = useState(paginationSize);
	const [rawCurrentPage, setRawCurrentPage] = useState(1);

	const [animalfoodLeftIndex, setanimalfoodLeftIndex] = useState(0);
	const [animalfoodRightIndex, setanimalfoodRightIndex] =
		useState(paginationSize);
	const [animalfoodCurrentPage, setanimalfoodCurrentPage] = useState(1);

	const [healthLeftIndex, setHealthLeftIndex] = useState(0);
	const [healthRightIndex, setHealthRightIndex] = useState(paginationSize);
	const [healthCurrentPage, setHealthCurrentPage] = useState(1);

	const navigate = useNavigate();

	const [rawFoodEatenData, setRawFoodEatenData] = useState([]);
	const [rawVetCheckupData, setRawVetCheckupData] = useState([]);
	const [healthAnalysisData, setHealthAnalysisData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const [animalName, setAnimalName] = useState("");
	const [animalNickName, setAnimalNickName] = useState("");

	const [startDate, setStartDate] = useState({
		startDate: null,
		endDate: null,
	});
	const [endDate, setEndDate] = useState({
		startDate: null,
		endDate: null,
	});

	async function fetchDataRange(e) {
		e.preventDefault();

		if (startDate > endDate) {
			toast.error("Start date cannot be greater than end date");
			return;
		}

		const sDate = sqlDateConverter(startDate.startDate);
		const eDate = sqlDateConverter(endDate.startDate);

		setIsLoading(true);

		const rawFoodRes = await fetch(
			`${
				import.meta.env.VITE_API_URL
			}/admin/raw_health_food_eaten_metrics?animal_name=${animalName}&start_date=${sDate}&end_date=${eDate}&nickname=${animalNickName}`
		);

		if (!rawFoodRes.ok) {
			console.error("Error fetching data: ", rawFoodRes);
			toast.error("Error fetching data");
			setIsLoading(false);
			return;
		}

		const rawVetRes = await fetch(
			`${
				import.meta.env.VITE_API_URL
			}/admin/raw_health_performance_metrics?animal_name=${animalName}&start_date=${sDate}&end_date=${eDate}&nickname=${animalNickName}`
		);

		if (!rawVetRes.ok) {
			console.error("Error fetching data: ", rawVetRes);
			toast.error("Error fetching data");
			setIsLoading(false);
			return;
		}

		const analysisRes = await fetch(
			`${
				import.meta.env.VITE_API_URL
			}/admin/health_performance_metrics?animal_name=${animalName}&start_date=${sDate}&end_date=${eDate}&nickname=${animalNickName}`
		);

		if (!analysisRes.ok) {
			console.error("Error fetching data: ", analysisRes);
			toast.error("Error fetching data");
			setIsLoading(false);
			return;
		}

		const rawFoodEatenData = await rawFoodRes.json();
		const rawVetCheckupData = await rawVetRes.json();
		const healthAnalysisData = await analysisRes.json();

		if (
			rawFoodEatenData.data.length === 0 ||
			rawVetCheckupData.data.length === 0 ||
			healthAnalysisData.data.length === 0
		) {
			toast.error("No data found for the selected date range");
			setIsLoading(false);
			return;
		}

		console.log("Food Report", rawFoodEatenData.data);
		console.log("Vet Report", rawVetCheckupData.data);
		console.log(healthAnalysisData.data);

		setRawFoodEatenData(rawFoodEatenData.data);
		setRawVetCheckupData(rawVetCheckupData.data);
		setHealthAnalysisData(healthAnalysisData.data);

		setIsLoading(false);
	}

	useEffect(() => {
		async function fetchData() {
			const rawRes = await fetch(
				`${import.meta.env.VITE_API_URL}/admin/raw_health_food_eaten_metrics`
			);

			if (!rawRes.ok) {
				console.error("Error fetching data: ", rawRes);
				setIsLoading(false);
				return;
			}

			const rawFoodEatenData = await rawRes.json();
			console.log(rawFoodEatenData.data);
			setRawFoodEatenData(rawFoodEatenData.data);

			const vetReportRes = await fetch(
				`${import.meta.env.VITE_API_URL}/admin/raw_health_performance_metrics`
			);

			if (!vetReportRes.ok) {
				console.error("Error fetching data: ", vetReportRes);
				setIsLoading(false);
				return;
			}

			const rawVetCheckupData = await vetReportRes.json();
			console.log("Vet Report", rawVetCheckupData.data);
			setRawVetCheckupData(rawVetCheckupData.data);

			const analysisRes = await fetch(
				`${import.meta.env.VITE_API_URL}/admin/health_performance_metrics`
			);

			if (!analysisRes.ok) {
				console.error("Error fetching data: ", analysisRes);
				setIsLoading(false);
				return;
			}

			const healthAnalysisData = await analysisRes.json();

			console.log(healthAnalysisData.data);
			setHealthAnalysisData(healthAnalysisData.data);

			const foodEatenRes = await fetch(
				`${import.meta.env.VITE_API_URL}/admin/raw_health_food_eaten_metrics`
			);

			if (!foodEatenRes.ok) {
				console.error("Error fetching data: ", foodEatenRes);
				setIsLoading(false);
				return;
			}

			const foodEatenData = await foodEatenRes.json();
			console.log(foodEatenData.data);
			setRawFoodEatenData(foodEatenData.data);

			setIsLoading(false);
		}
		fetchData();
	}, []);

	if (isLoading) {
		return <Loading />;
	}

	return (
		<>
			<div className="flex items-center gap-2 w-full mb-4">
				<Button
					size="icon"
					variant="outline"
					onClick={() => navigate("/admin/finance")}
				>
					<ArrowLeftIcon className="h-5 w-5" />
				</Button>
				<h1 className="text-3xl font-semibold text-gray-800">
					Animal Health Performance Report
				</h1>
			</div>

			<form onSubmit={fetchDataRange} className="flex items-center  gap-8 mb-8">
				<div className="">
					<Label htmlFor="animal_name">Animal Name</Label>
					<Input
						value={animalName}
						onChange={(e) => setAnimalName(e.target.value)}
						type="text"
						name="animal_name"
						id="animal_name"
						placeholder="Jaguar"
						maxLength="50"
						required
					/>
				</div>

				<div className="">
					<Label htmlFor="animal_nickname">Animal Nickname</Label>
					<Input
						value={animalNickName}
						onChange={(e) => setAnimalNickName(e.target.value)}
						type="text"
						name="animal_nickname"
						id="animal_nickname"
						placeholder="Jerry"
						maxLength="50"
						required
					/>
				</div>

				<div className="flex flex-col gap-3 max-w-52">
					<Label>Start Date</Label>
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

				<div className="flex flex-col gap-3 max-w-52">
					<Label>End Date</Label>
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

			<h1 className="text-gray-800 text-xl font-semibold w-full border-b border-b-gray-400 pb-2">
				Animal Food Eaten Data
			</h1>

			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Animal Name</TableHead>
						<TableHead>Animal Nickname</TableHead>
						<TableHead>Food Name</TableHead>
						<TableHead>Food Type</TableHead>
						<TableHead>Amount Food Eaten</TableHead>
						<TableHead>Feeding Date</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{rawFoodEatenData
						.slice(animalfoodLeftIndex, animalfoodRightIndex)
						.map((el, indx) => {
							return (
								<TableRow key={indx}>
									<TableCell className="font-medium">
										{el.animal_name}
									</TableCell>
									<TableCell>{el.nickname}</TableCell>
									<TableCell>{el.food_name}</TableCell>
									<TableCell>{el.food_type}</TableCell>
									<TableCell>{el.amount_eaten}</TableCell>
									<TableCell>{formatDate(el.feeding_date)}</TableCell>
								</TableRow>
							);
						})}
				</TableBody>
			</Table>

			<div className="flex w-full justify-end items-center gap-2 mt-4">
				<Button
					className="flex items-center p-3 gap-1 font-semibold bg-buttonBg hover:bg-buttonHoverBg"
					onClick={() => {
						setanimalfoodLeftIndex(animalfoodLeftIndex - paginationSize);
						setanimalfoodRightIndex(animalfoodRightIndex - paginationSize);
						setanimalfoodCurrentPage(animalfoodCurrentPage - 1);
					}}
					disabled={animalfoodLeftIndex === 0}
				>
					<ArrowLeftIcon className="h-5 w-5" /> Previous
				</Button>
				<Button
					className="flex items-center p-3 gap-1 font-semibold bg-buttonBg hover:bg-buttonHoverBg"
					onClick={() => {
						setanimalfoodLeftIndex(animalfoodLeftIndex + paginationSize);
						setanimalfoodRightIndex(animalfoodRightIndex + paginationSize);
						setanimalfoodCurrentPage(animalfoodCurrentPage + 1);
					}}
					disabled={animalfoodRightIndex > rawFoodEatenData.length - 1}
				>
					Next
					<ArrowRight className="h-5 w-5" />
				</Button>
			</div>

			<h1 className="text-gray-800 text-xl font-semibold w-full border-b border-b-gray-400 pb-2">
				Animal Health Checkup Metrics Data
			</h1>

			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Animal Name</TableHead>
						<TableHead>Animal Nickname</TableHead>
						<TableHead>Measured Weight (kg)</TableHead>
						<TableHead>Measured Height (ft)</TableHead>
						<TableHead>Health Status</TableHead>
						<TableHead>Checkup Date</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{rawVetCheckupData
						.slice(rawLeftIndex, rawRightIndex)
						.map((el, indx) => {
							return (
								<TableRow key={indx}>
									<TableCell>{el.animal_name}</TableCell>
									<TableCell>{el.nickname}</TableCell>
									<TableCell>{el.measured_weight}</TableCell>
									<TableCell>{el.measured_height}</TableCell>
									<TableCell>{el.health_status}</TableCell>
									<TableCell>{formatDate(el.checkup_date)}</TableCell>
								</TableRow>
							);
						})}
				</TableBody>
			</Table>

			<div className="flex w-full justify-end items-center gap-2 mt-4">
				<Button
					className="flex items-center p-3 gap-1 font-semibold bg-buttonBg hover:bg-buttonHoverBg"
					onClick={() => {
						setRawLeftIndex(rawLeftIndex - paginationSize);
						setRawRightIndex(rawRightIndex - paginationSize);
						setRawCurrentPage(rawCurrentPage - 1);
					}}
					disabled={rawLeftIndex === 0}
				>
					<ArrowLeftIcon className="h-5 w-5" /> Previous
				</Button>
				<Button
					className="flex items-center p-3 gap-1 font-semibold bg-buttonBg hover:bg-buttonHoverBg"
					onClick={() => {
						setRawLeftIndex(rawLeftIndex + paginationSize);
						setRawRightIndex(rawRightIndex + paginationSize);
						setRawCurrentPage(rawCurrentPage + 1);
					}}
					disabled={rawRightIndex > rawFoodEatenData.length - 1}
				>
					Next
					<ArrowRight className="h-5 w-5" />
				</Button>
			</div>

			<h1 className="text-gray-800 text-xl font-semibold w-full border-b border-b-gray-400 pb-2">
				Health Analysis Report
			</h1>

			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Animal Name</TableHead>
						<TableHead>Animal Nickname</TableHead>
						<TableHead>Total Amount Food Eaten</TableHead>
						<TableHead>Food Types</TableHead>
						<TableHead>Min Weight</TableHead>
						<TableHead>Max Weight</TableHead>
						<TableHead>Net Weight Change</TableHead>
						<TableHead>Min Height</TableHead>
						<TableHead>Max Height</TableHead>
						<TableHead>Net Height Change</TableHead>
						<TableHead>Sick Count</TableHead>
						<TableHead>Injured Count</TableHead>
						<TableHead>Total Checkups</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{healthAnalysisData
						.slice(healthLeftIndex, healthRightIndex)
						.map((el, indx) => {
							return (
								<TableRow key={indx}>
									<TableCell>{el.animal_name}</TableCell>
									<TableCell>{el.nickname}</TableCell>
									<TableCell>{el.total_food_quantity}</TableCell>
									<TableCell>{el.food_types}</TableCell>
									<TableCell>{el.min_weight.toFixed(2)}</TableCell>
									<TableCell>{el.max_weight.toFixed(2)}</TableCell>
									<TableCell>{el.net_weight_change.toFixed(2)}</TableCell>
									<TableCell>{el.min_height.toFixed(2)}</TableCell>
									<TableCell>{el.max_height.toFixed(2)}</TableCell>
									<TableCell> {el.net_height_change.toFixed(2)}</TableCell>
									<TableCell>{el.sick_count}</TableCell>
									<TableCell>{el.injured_count}</TableCell>
									<TableCell>{el.total_checkups}</TableCell>
								</TableRow>
							);
						})}
				</TableBody>
			</Table>
			<div className="flex w-full justify-end items-center gap-2 mt-4">
				<Button
					className="flex items-center p-3 gap-1 font-semibold bg-buttonBg hover:bg-buttonHoverBg"
					onClick={() => {
						setHealthLeftIndex(healthLeftIndex - paginationSize);
						setHealthRightIndex(healthRightIndex - paginationSize);
						setHealthCurrentPage(healthCurrentPage - 1);
					}}
					disabled={healthLeftIndex === 0}
				>
					<ArrowLeftIcon className="h-5 w-5" /> Previous
				</Button>
				<Button
					className="flex items-center p-3 gap-1 font-semibold bg-buttonBg hover:bg-buttonHoverBg"
					onClick={() => {
						setHealthLeftIndex(healthLeftIndex + paginationSize);
						setHealthRightIndex(healthRightIndex + paginationSize);
						setHealthCurrentPage(healthCurrentPage + 1);
					}}
					disabled={healthRightIndex > healthAnalysisData.length - 1}
				>
					Next
					<ArrowRight className="h-5 w-5" />
				</Button>
			</div>
		</>
	);
}
