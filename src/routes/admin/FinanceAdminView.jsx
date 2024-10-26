
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, ArrowRightIcon, PlusIcon } from "lucide-react";
import { Link } from "react-router-dom";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { useNavigate } from "react-router-dom";

export default function ExhibitAdminView() {
	const paginationSize = 10;
	const [leftIndex, setLeftIndex] = useState(0);
	const [rightIndex, setRightIndex] = useState(paginationSize);
	const [currentPage, setCurrentPage] = useState(1);
	const navigate = useNavigate();

	const dataTS = [
		{
			visitor_id: "3456789",
			ticket_type_id: "456789",
			date_purchased: "10/24/2024",
			expiration_date: "11/24/2024",
		},
	];

	const dataMS = [
		{
			visitor_id: "3456789",
			merch_id: "456789",
			date_purchased: "10/24/2024",
		},
	];

	const dataMB = [
		{
			merch_id: "ExINV001",
			amount: "Savannah",
			total_before_tax_shipping: "A23",
			total_after_tax_shipping: "Department 1",
			date_ordered: "09/24/2024",
			date_received: "10/24/2024",
		},
	];

	const dataSB = [
		{
			supplies_id: "ExINV001",
			amount: "Savannah",
			total_before_tax_shipping: "A23",
			total_after_tax_shipping: "Department 1",
			date_ordered: "09/24/2024",
			date_received: "10/24/2024",
		},
	];

	return (
		<>
			<div className="flex items-center justify-between w-full mb-10">
				<h1 className="text-3xl font-semibold text-gray-800">Finances</h1>
				<Button
					asChild
					className="flex items-center gap-2 font-semibold bg-secondaryBg hover:bg-secondaryBg"
				>
					<Link to="/admin/exhibit/create">
						<PlusIcon className="h-5 w-5" /> Create Exhibit
					</Link>
				</Button>
			</div>

			<h1 className="text-2xl text-green-500">Ticket Sales</h1>
			<div className="flex items-center justify-between w-full mb-10">


			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[120px]">Visitor Id</TableHead>
						<TableHead>Ticket Type Id</TableHead>
						<TableHead>Date Purchased</TableHead>
						<TableHead>Expiration Date</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{dataTS.map((el) => (
						<TableRow
							key={el.visitor_id}
							onClick={() => {
								navigate(`${el.visitor_id}`);
							}}
							className="cursor-pointer"
						>
							<TableCell className="font-medium">{el.visitor_id}</TableCell>
							<TableCell>{el.ticket_type_id}</TableCell>
							<TableCell>{el.date_purchased}</TableCell>
							<TableCell>{el.expiration_date}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
			</div>

			<h1 className="text-2xl text-green-500">Merchandise Sales</h1>
			<div className="flex items-center justify-between w-full mb-10"> 
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[120px]">Visitor Id</TableHead>
						<TableHead>Merch Id</TableHead>
						<TableHead>Date Purchased</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{dataMS.map((el) => (
						<TableRow
							key={el.visitor_id}
							onClick={() => {
								navigate(`${el.visitor_id}`);
							}}
							className="cursor-pointer"
						>
							<TableCell className="font-medium">{el.visitor_id}</TableCell>
							<TableCell>{el.merch_id}</TableCell>
							<TableCell>{el.date_purchased}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
			</div>


			<h1 className="text-2xl text-green-500">Merchandise Bought</h1>
			<div className="flex items-center justify-between w-full mb-10"> 
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[120px]">Merch Id</TableHead>
						<TableHead>Amount</TableHead>
						<TableHead>Total Before Tax Shipping</TableHead>
						<TableHead>Total After Tax Shipping</TableHead>
						<TableHead>Date Ordered</TableHead>
						<TableHead>Date Received</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{dataMB.map((el) => (
						<TableRow
							key={el.merch_id}
							onClick={() => {
								navigate(`${el.merch_id}`);
							}}
							className="cursor-pointer"
						>
							<TableCell className="font-medium">{el.merch_id}</TableCell>
							<TableCell>{el.amount}</TableCell>
							<TableCell>{el.total_before_tax_shipping}</TableCell>
							<TableCell>{el.total_after_tax_shipping}</TableCell>
							<TableCell>{el.date_ordered}</TableCell>
							<TableCell>{el.date_received}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
			</div>

			<h1 className="text-2xl text-green-500">Supplies Bought</h1>
			<div className="flex items-center justify-between w-full mb-10"> 
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[120px]">Supplies Id</TableHead>
						<TableHead>Amount</TableHead>
						<TableHead>Total Before Tax Shipping</TableHead>
						<TableHead>Total After Tax Shipping</TableHead>
						<TableHead>Date Ordered</TableHead>
						<TableHead>Date Received</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{dataSB.map((el) => (
						<TableRow
							key={el.supplies_id}
							onClick={() => {
								navigate(`${el.supplies_id}`);
							}}
							className="cursor-pointer"
						>
							<TableCell className="font-medium">{el.supplies_id}</TableCell>
							<TableCell>{el.amount}</TableCell>
							<TableCell>{el.total_before_tax_shipping}</TableCell>
							<TableCell>{el.total_after_tax_shipping}</TableCell>
							<TableCell>{el.date_ordered}</TableCell>
							<TableCell>{el.date_received}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
			</div>


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
					disabled={rightIndex >= dataTS.length - 1}
				>
					Next
					<ArrowRightIcon className="h-5 w-5" />
				</Button>
			</div>
		</>
	);
}
