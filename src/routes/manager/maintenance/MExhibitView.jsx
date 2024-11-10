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
import Loading from "@/components/Loading";

export default function MExhibitView() {
	const paginationSize = 5;
	const [leftIndex, setLeftIndex] = useState(0);
	const [rightIndex, setRightIndex] = useState(paginationSize);
	const [currentPage, setCurrentPage] = useState(1);
	const navigate = useNavigate();
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function fetchData() {
			const response = await fetch(
				`${import.meta.env.VITE_API_URL}/admin/exhibit`
			);

			if (!response.ok) {
				console.error("Error fetching data: ", response);
				setIsLoading(false);
				return;
			}

			const data = await response.json();
			console.log(data.data);
			setData(data.data);
			setIsLoading(false);
		}
		fetchData();
	}, []);

	if (isLoading) {
		return <Loading />;
	}

	return (
		<>
			<div className="flex items-center justify-between w-full mb-10">
				<h1 className="text-3xl font-semibold text-gray-800">Exhibits</h1>
			</div>

			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Exhibit Id</TableHead>
						<TableHead>Name</TableHead>
						<TableHead>Department</TableHead>
						<TableHead>Description</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{data.map((el) => (
						<TableRow
							key={el.exhibit_id}
							onClick={() => {
								navigate(`${el.exhibit_id}`);
							}}
							className="cursor-pointer"
						>
							<TableCell>{el.exhibit_id}</TableCell>
							<TableCell>{el.exhibit_name}</TableCell>
							<TableCell>{el.department_name}</TableCell>
							<TableCell className="max-w-xs text-ellipsis">
								{el.description}
							</TableCell>
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
					disabled={rightIndex >= data.length - 1}
				>
					Next
					<ArrowRight className="h-5 w-5" />
				</Button>
			</div>
		</>
	);
}
