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
import { Input } from "@/components/ui/input";
import Loading from "@/components/Loading";
import { toast } from "sonner";

export default function HabitatSearch() {
	const paginationSize = 10;
	const [leftIndex, setLeftIndex] = useState(0);
	const [rightIndex, setRightIndex] = useState(paginationSize);
	const [currentPage, setCurrentPage] = useState(1);
	const navigate = useNavigate();

	const [data, setData] = useState([]);

	const [habitatInfo, setHabitatInfo] = useState({
		name: "",
	});
	const [isLoading, setIsLoading] = useState(false);

	async function handleSubmit(e) {
		e.preventDefault();

		setIsLoading(true);

		const response = await fetch(
			`${import.meta.env.VITE_API_URL}/admin/query_habitat_name?name=${
				habitatInfo.name
			}`
		);

		setIsLoading(false);

		if (!response.ok) {
			console.log("Error fetching data", response);
			return;
		}

		const data = await response.json();
		if (data.data.length === 0) {
			console.log("No data found");
			toast.error(`Habitat could not be found`);
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
					Create Maintenance Report
				</h1>
			</div>

			<form onSubmit={handleSubmit} className="flex items-center gap-8 mb-8">
				<div className="flex flex-col gap-1 max-w-52">
					<Label htmlFor="name">Habitat Name</Label>
					<Input
						value={habitatInfo.name}
						onChange={(e) =>
							setHabitatInfo({ ...habitatInfo, name: e.target.value })
						}
						type="text"
						name="name"
						id="name"
						placeholder="Jaguar Den"
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
								<TableHead>Habitat Id</TableHead>
								<TableHead>Name</TableHead>
								<TableHead>Description</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{data.map((el) => (
								<TableRow
									onClick={() => {
										navigate(`${el.habitat_id}/create`);
									}}
									key={el.habitat_id}
									className="cursor-pointer"
								>
									<TableCell className="font-medium">{el.habitat_id}</TableCell>
									<TableCell>{el.name}</TableCell>
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
			)}
		</>
	);
}
