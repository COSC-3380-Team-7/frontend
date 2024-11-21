import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, ArrowRight, PlusIcon } from "lucide-react";
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
import Loading from "@/components/Loading";
import { formatDate, convertTo12Hour } from "@/utils/dateCalcs";

export default function EventAdminView() {
	const [paginationSize] = useState(10);
	const [leftIndex, setLeftIndex] = useState(0);
	const [rightIndex, setRightIndex] = useState(paginationSize);
	const [currentPage, setCurrentPage] = useState(1);
	const navigate = useNavigate();
	// look here
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function fetchData() {
			const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/event`);
			setIsLoading(false);

			if (!res.ok) {
				console.error("Failed to fetch data", res);
				return;
			}

			const data = await res.json();
			console.log(data.data);
			setData(data.data);

			setIsLoading(false);
		}

		fetchData();
	}, []);

	if (isLoading) {
		return <Loading />;
	}
	// until here
	return (
		<>
			<div className="flex items-center justify-between w-full mb-10">
				<h1 className="text-3xl font-semibold text-gray-800">Events</h1>
				<Button
					asChild
					className="flex items-center gap-2 font-semibold bg-secondaryBg hover:bg-secondaryBg"
				>
					<Link to="create">
						<PlusIcon className="h-5 w-5" /> Create Event
					</Link>
				</Button>
			</div>

			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[120px]">Event Id</TableHead>
						<TableHead>Name</TableHead>
						<TableHead>Start Time</TableHead>
						<TableHead>End Time</TableHead>
						<TableHead>Event Date</TableHead>
						<TableHead>Created At</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{data.map((el) => (
						<TableRow
							key={el.event_id}
							onClick={() => {
								navigate(`${el.event_id}/edit`);
							}}
							className="cursor-pointer"
						>
							<TableCell className="font-medium">{el.event_id}</TableCell>
							<TableCell>{el.name}</TableCell>
							<TableCell>{convertTo12Hour(el.start_time)}</TableCell>
							<TableCell>{convertTo12Hour(el.end_time)}</TableCell>
							<TableCell>{formatDate(el.event_date)}</TableCell>
							<TableCell>{formatDate(el.created_at)}</TableCell>
						</TableRow>
					))}
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
	);
}
