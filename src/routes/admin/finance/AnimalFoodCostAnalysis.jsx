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
import { Label } from "@/components/ui/label";
import Datepicker from "react-tailwindcss-datepicker";

export default function AnimalFoodCostAnalysis() {
	const paginationSize = 10;
	const [leftIndex, setLeftIndex] = useState(0);
	const [rightIndex, setRightIndex] = useState(paginationSize);
	const [currentPage, setCurrentPage] = useState(1);
	const navigate = useNavigate();
	const [data, setData] = useState([]);

	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");

	return (
		<>
			<div className="flex items-center gap-2 w-full mb-10">
				<Button
					size="icon"
					variant="outline"
					onClick={() => navigate("/admin/finance")}
				>
					<ArrowLeftIcon className="h-5 w-5" />
				</Button>
				<h1 className="text-3xl font-semibold text-gray-800">
					Animal Food Purchases
				</h1>
			</div>

			<form className="flex items-center gap-8 mb-8">
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

			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Category</TableHead>
						<TableHead>Price</TableHead>
						<TableHead>Quantity Sold</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{data.map((el) => (
						<TableRow key={el.ticket_type_id}>
							<TableCell>{el.category}</TableCell>
							<TableCell>${el.price}</TableCell>
							<TableCell>{el.quantity_sold}</TableCell>
						</TableRow>
					))}
					<TableRow>
						<TableCell>Total</TableCell>
						<TableCell>
							{data
								.reduce((acc, curr) => acc + parseFloat(curr.price), 0)
								.toPrecision(2)}
						</TableCell>
						<TableCell>
							{data.reduce((acc, curr) => acc + curr.quantity_sold, 0)}
						</TableCell>
					</TableRow>
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
	);
}
