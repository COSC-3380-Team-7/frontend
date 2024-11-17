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

export default function AnimalFoodCostAnalysis() {
	const [paginationSize] = useState(10);
	const [rawLeftIndex, setRawLeftIndex] = useState(0);
	const [rawRightIndex, setRawRightIndex] = useState(paginationSize);
	const [rawCurrentPage, setRawCurrentPage] = useState(1);

	const [costLeftIndex, setCostLeftIndex] = useState(0);
	const [costRightIndex, setCostRightIndex] = useState(paginationSize);
	const [costCurrentPage, setCostCurrentPage] = useState(1);

	const navigate = useNavigate();

	const [rawCostData, setRawCostData] = useState([]);
	const [costAnalysisData, setCostAnalysisData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

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

		const rawRes = await fetch(
			`${
				import.meta.env.VITE_API_URL
			}/admin/raw_cost_analysis_animal_food?start_date=${sDate}&end_date=${eDate}`
		);

		if (!rawRes.ok) {
			console.error("Error fetching data: ", rawRes);
			setIsLoading(false);
			return;
		}

		const analysisRes = await fetch(
			`${
				import.meta.env.VITE_API_URL
			}/admin/cost_analysis_animal_food?start_date=${sDate}&end_date=${eDate}`
		);

		if (!analysisRes.ok) {
			console.error("Error fetching data: ", analysisRes);
			setIsLoading(false);
			return;
		}

		const costAnalysisData = await analysisRes.json();
		const rawCostData = await rawRes.json();

		if (costAnalysisData.data.length === 0 || rawCostData.data.length === 0) {
			toast.error("No data found for the selected date range");
			setIsLoading(false);
			return;
		}

		console.log(rawCostData.data);
		setRawCostData(rawCostData.data);

		console.log(costAnalysisData.data);
		setCostAnalysisData(costAnalysisData.data);

		setIsLoading(false);
	}

	useEffect(() => {
		async function fetchData() {
			const rawRes = await fetch(
				`${import.meta.env.VITE_API_URL}/admin/raw_cost_analysis_animal_food`
			);

			if (!rawRes.ok) {
				console.error("Error fetching data: ", rawRes);
				setIsLoading(false);
				return;
			}

			const rawCostData = await rawRes.json();
			console.log(rawCostData.data);
			setRawCostData(rawCostData.data);

			const analysisRes = await fetch(
				`${import.meta.env.VITE_API_URL}/admin/cost_analysis_animal_food`
			);

			if (!analysisRes.ok) {
				console.error("Error fetching data: ", analysisRes);
				setIsLoading(false);
				return;
			}

			const costAnalysisData = await analysisRes.json();

			console.log(costAnalysisData.data);
			setCostAnalysisData(costAnalysisData.data);

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
					Animal Food Cost Analysis Report
				</h1>
			</div>

			<form onSubmit={fetchDataRange} className="flex items-center gap-8 mb-8">
				<div className="mt-4 flex flex-col gap-1 max-w-52">
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

				<div className="mt-4 flex flex-col gap-1 max-w-52">
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
				Raw Cost Animal Food Data
			</h1>

			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Animal Name</TableHead>
						<TableHead>Food Name</TableHead>
						<TableHead>Food Type</TableHead>
						<TableHead>Amount Food Eaten</TableHead>
						<TableHead>Feeding Date</TableHead>
						<TableHead>Amount Purchased</TableHead>
						<TableHead>Total Cost</TableHead>
						<TableHead>Date Purchased</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{rawCostData.slice(rawLeftIndex, rawRightIndex).map((el, indx) => {
						return (
							<TableRow key={indx}>
								<TableCell className="font-medium">{el.name}</TableCell>
								<TableCell>{el.food_name}</TableCell>
								<TableCell>{el.food_type}</TableCell>
								<TableCell>{el.food_eaten}</TableCell>
								<TableCell>{formatDate(el.feeding_date)}</TableCell>
								<TableCell>{el.quantity}</TableCell>
								<TableCell>$ {el.purchased_price.toFixed(2)}</TableCell>
								<TableCell>{formatDate(el.date_purchased)}</TableCell>
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
					disabled={rawRightIndex > rawCostData.length - 1}
				>
					Next
					<ArrowRight className="h-5 w-5" />
				</Button>
			</div>

			<h1 className="text-gray-800 text-xl font-semibold w-full border-b border-b-gray-400 pb-2">
				Cost Analysis of Animal Food Data
			</h1>

			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Animal Name</TableHead>
						<TableHead>Food Name</TableHead>
						<TableHead>Food Type</TableHead>
						<TableHead>Amount of Food Eaten</TableHead>
						<TableHead>Amount Food Eaten Cost</TableHead>
						<TableHead>Cumulative Purchase Cost</TableHead>
						<TableHead>Cost Utilization Percentage</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{costAnalysisData
						.slice(costLeftIndex, costRightIndex)
						.map((el, indx) => {
							return (
								<TableRow key={indx}>
									<TableCell>{el.name}</TableCell>
									<TableCell>{el.food_name}</TableCell>
									<TableCell>{el.food_type}</TableCell>
									<TableCell>{el.food_eaten}</TableCell>
									<TableCell>$ {el.food_eaten_cost.toFixed(2)}</TableCell>
									<TableCell>
										$ {el.cumulative_purchase_cost.toFixed(2)}
									</TableCell>
									<TableCell>
										{(
											(el.food_eaten_cost / el.cumulative_purchase_cost) *
											100
										).toFixed(2)}
										%
									</TableCell>
								</TableRow>
							);
						})}
				</TableBody>
			</Table>
			<div className="flex w-full justify-end items-center gap-2 mt-4">
				<Button
					className="flex items-center p-3 gap-1 font-semibold bg-buttonBg hover:bg-buttonHoverBg"
					onClick={() => {
						setCostLeftIndex(costLeftIndex - paginationSize);
						setCostRightIndex(costRightIndex - paginationSize);
						setCostCurrentPage(costCurrentPage - 1);
					}}
					disabled={costLeftIndex === 0}
				>
					<ArrowLeftIcon className="h-5 w-5" /> Previous
				</Button>
				<Button
					className="flex items-center p-3 gap-1 font-semibold bg-buttonBg hover:bg-buttonHoverBg"
					onClick={() => {
						setCostLeftIndex(costLeftIndex + paginationSize);
						setCostRightIndex(costRightIndex + paginationSize);
						setCostCurrentPage(costCurrentPage + 1);
					}}
					disabled={costRightIndex > costAnalysisData.length - 1}
				>
					Next
					<ArrowRight className="h-5 w-5" />
				</Button>
			</div>
		</>
	);
}
