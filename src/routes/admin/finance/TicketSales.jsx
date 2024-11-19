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
	TableFooter,
} from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import Loading from "@/components/Loading";
import { formatDate } from "@/utils/dateCalcs";
import { toast } from "sonner";
import Datepicker from "react-tailwindcss-datepicker";
import { sqlDateConverter } from "@/utils/convertToDateSQL";
import { Input } from "@/components/ui/input";

export default function TicketSales() {
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

	const [ticketsPurchased, setTicketsPurchased] = useState([]);
	const [complaintsData, setComplaintsData] = useState([]);
	const [performanceData, setPerformanceData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const [exhibitName, setExhibitName] = useState("");

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

		const ticketsRes = await fetch(
			`${
				import.meta.env.VITE_API_URL
			}/admin/pm_tickets?exhibit_name=${exhibitName}&start_date=${sDate}&end_date=${eDate}`
		);

		if (!ticketsRes.ok) {
			toast.error("Error fetching data");
			console.error("Error fetching data: ", ticketsRes);
			setIsLoading(false);
			return;
		}

		const complaintsRes = await fetch(
			`${
				import.meta.env.VITE_API_URL
			}/admin/performance_complaints?exhibit_name=${exhibitName}&start_date=${sDate}&end_date=${eDate}`
		);

		if (!complaintsRes.ok) {
			toast.error("Error fetching data");
			console.error("Error fetching data: ", complaintsRes);
			setIsLoading(false);
			return;
		}

		const analysisRes = await fetch(
			`${
				import.meta.env.VITE_API_URL
			}/admin/pm_exhibit?exhibit_name=${exhibitName}&start_date=${sDate}&end_date=${eDate}`
		);

		if (!analysisRes.ok) {
			toast.error("Error fetching data");
			console.error("Error fetching data: ", analysisRes);
			setIsLoading(false);
			return;
		}

		const ticketsPurchased = await ticketsRes.json();
		console.log("Tickets Report", ticketsPurchased.data);
		const complaintsData = await complaintsRes.json();
		console.log("Complaints Report", complaintsData.data);
		const performanceData = await analysisRes.json();
		console.log("Performance data", performanceData.data);

		if (
			ticketsPurchased.data.length === 0 ||
			complaintsData.data.length === 0 ||
			performanceData.data.length === 0
		) {
			toast.error("No data found for the selected date range");
			setIsLoading(false);
			return;
		}

		setPerformanceData(performanceData.data);
		setComplaintsData(complaintsData.data);
		setTicketsPurchased(ticketsPurchased.data);

		setIsLoading(false);
	}

	useEffect(() => {
		async function fetchData() {
			const ticketsRes = await fetch(
				`${import.meta.env.VITE_API_URL}/admin/pm_tickets`
			);

			if (!ticketsRes.ok) {
				console.error("Error fetching data: ", ticketsRes);
				setIsLoading(false);
				return;
			}

			const ticketsPurchased = await ticketsRes.json();
			console.log("Tickets Report", ticketsPurchased.data);
			setTicketsPurchased(ticketsPurchased.data);

			const complaintsRes = await fetch(
				`${import.meta.env.VITE_API_URL}/admin/performance_complaints`
			);

			if (!complaintsRes.ok) {
				console.error("Error fetching data: ", complaintsRes);
				setIsLoading(false);
				return;
			}

			const complaintsData = await complaintsRes.json();
			console.log("Complaints Report", complaintsData.data);
			setComplaintsData(complaintsData.data);

			const analysisRes = await fetch(
				`${import.meta.env.VITE_API_URL}/admin/pm_exhibit`
			);

			if (!analysisRes.ok) {
				console.error("Error fetching data: ", analysisRes);
				setIsLoading(false);
				return;
			}

			const performanceData = await analysisRes.json();

			console.log("Performance data", performanceData.data);
			setPerformanceData(performanceData.data);

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
					Exhibit Performance Report
				</h1>
			</div>

			<form onSubmit={fetchDataRange} className="flex items-center  gap-8 mb-8">
				<div className="">
					<Label htmlFor="exhibit_name">Exhibit Name</Label>
					<Input
						value={exhibitName}
						onChange={(e) => setExhibitName(e.target.value)}
						type="text"
						name="exhibit_name"
						id="exhibit_name"
						placeholder="Exhibit Name"
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
				Ticket Purchase Per Exhibit Data
			</h1>

			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Exhibit Name</TableHead>
						<TableHead>Ticket Type</TableHead>
						<TableHead>Ticket Price</TableHead>
						<TableHead>Amount Sold</TableHead>
						<TableHead>Revenue Generated</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{ticketsPurchased
						.slice(animalfoodLeftIndex, animalfoodRightIndex)
						.map((el, indx) => {
							return (
								<TableRow key={indx}>
									<TableCell className="font-medium">
										{el.ExhibitName}
									</TableCell>
									<TableCell>{el.TicketCategory}</TableCell>
									<TableCell>$ {el.TicketPrice.toFixed(2)}</TableCell>
									<TableCell>{el.TicketsSoldByType}</TableCell>
									<TableCell>$ {el.TotalProfit.toFixed(2)}</TableCell>
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
					disabled={animalfoodRightIndex > ticketsPurchased.length - 1}
				>
					Next
					<ArrowRight className="h-5 w-5" />
				</Button>
			</div>

			<h1 className="text-gray-800 text-xl font-semibold w-full border-b border-b-gray-400 pb-2">
				Complaints Per Exhibit Data
			</h1>

			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Exhibit Name</TableHead>
						<TableHead>Complaint Title</TableHead>
						<TableHead>Complaint Details</TableHead>
						<TableHead>Visitor Name</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{complaintsData.slice(rawLeftIndex, rawRightIndex).map((el, indx) => {
						return (
							<TableRow key={indx}>
								<TableCell>{el.ExhibitName}</TableCell>
								<TableCell>{el.ComplaintTitle}</TableCell>
								<TableCell>{el.ComplaintDetails}</TableCell>
								<TableCell>{el.VisitorName}</TableCell>
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
					disabled={rawRightIndex > ticketsPurchased.length - 1}
				>
					Next
					<ArrowRight className="h-5 w-5" />
				</Button>
			</div>

			<h1 className="text-gray-800 text-xl font-semibold w-full border-b border-b-gray-400 pb-2">
				Exhibit Performance Report
			</h1>

			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Exhibit Name</TableHead>
						<TableHead>Number of Complaints</TableHead>
						<TableHead>Tickets Sold</TableHead>
						<TableHead>Revenue</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{performanceData
						.slice(healthLeftIndex, healthRightIndex)
						.map((el, indx) => {
							return (
								<TableRow key={indx}>
									<TableCell>{el.exhibit_name}</TableCell>
									<TableCell>{el.number_of_complaints}</TableCell>
									<TableCell>{el.tickets_sold}</TableCell>
									<TableCell>$ {el.total_profit.toFixed(2)}</TableCell>
								</TableRow>
							);
						})}
				</TableBody>
				<TableFooter>
					<TableRow>
						<TableCell colSpan={3}>Total Profit</TableCell>
						<TableCell className="text-right">
							{" "}
							${" "}
							{performanceData
								.reduce((acc, el) => acc + el.total_profit, 0)
								.toFixed(2)}
						</TableCell>
					</TableRow>
				</TableFooter>
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
					disabled={healthRightIndex > performanceData.length - 1}
				>
					Next
					<ArrowRight className="h-5 w-5" />
				</Button>
			</div>
		</>
	);
}
