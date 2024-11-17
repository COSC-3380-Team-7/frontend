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
import Loading from "@/components/Loading";
import { toast } from "sonner";
import { sqlDateConverter } from "@/utils/convertToDateSQL";
import Datepicker from "react-tailwindcss-datepicker";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { formatDate } from "@/utils/dateCalcs";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

export default function ZMaintenanceReportsView() {
	const [paginationSize] = useState(10);
	const [leftIndex, setLeftIndex] = useState(0);
	const [rightIndex, setRightIndex] = useState(paginationSize);
	const [currentPage, setCurrentPage] = useState(1);
	const navigate = useNavigate();
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [startDate, setStartDate] = useState({
		startDate: null,
		endDate: null,
	});
	const [endDate, setEndDate] = useState({
		startDate: null,
		endDate: null,
	});
	const [reportInfo, setReportInfo] = useState({
		habitat_name: "",
		working_status: "",
	});

	async function handleSubmit(e) {
		e.preventDefault();

		setIsLoading(true);

		const response = await fetch(
			`${
				import.meta.env.VITE_API_URL
			}/admin/query_maintenance_report?habitat_name=${
				reportInfo.habitat_name
			}&start_date=${sqlDateConverter(
				startDate.startDate
			)}&end_date=${sqlDateConverter(endDate.startDate)}
			&working_status=${reportInfo.working_status}
			`
		);

		setIsLoading(false);

		if (!response.ok) {
			console.log("Error fetching data", response);
			return;
		}

		const data = await response.json();
		if (data.data.length === 0) {
			console.log("No data found");
			toast.error(`Reports of ${reportInfo.habitat_name} could not be found`);
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
					Maintenance Reports
				</h1>
			</div>

			<form onSubmit={handleSubmit} className="flex items-center gap-8 mb-8">
				<div className="flex flex-col gap-1 max-w-52">
					<Label htmlFor="name">Habitat Name</Label>
					<Input
						value={reportInfo.habitat_name}
						onChange={(e) =>
							setReportInfo({ ...reportInfo, habitat_name: e.target.value })
						}
						type="text"
						name="name"
						id="name"
						placeholder="Lion Den"
						required
					/>
				</div>

				<div className="flex flex-col gap-1 w-52">
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

				<div className="flex flex-col gap-1 max-w-52">
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

				<div className="flex flex-col gap-1 max-w-52">
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

			{data.length > 0 && (
				<>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Report Id</TableHead>
								<TableHead>Title</TableHead>
								<TableHead>Habitat</TableHead>
								<TableHead>Working Status</TableHead>
								<TableHead>Created By</TableHead>
								<TableHead>Created At</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{data.slice(leftIndex, rightIndex).map((el) => {
								return (
									<TableRow
										key={el.maintenance_report_id}
										onClick={() => {
											navigate(`${el.maintenance_report_id}`);
										}}
										className="cursor-pointer"
									>
										<TableCell>{el.maintenance_report_id}</TableCell>
										<TableCell>{el.title}</TableCell>
										<TableCell>{el.habitat_name}</TableCell>
										<TableCell>{el.working_status}</TableCell>
										<TableCell>
											{el.first_name} {el.last_name}
										</TableCell>
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
							disabled={rightIndex > data.length - 1}
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
