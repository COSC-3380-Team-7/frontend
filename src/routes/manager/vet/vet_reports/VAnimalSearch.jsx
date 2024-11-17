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
import { formatDate } from "@/utils/dateCalcs";
import { toast } from "sonner";

export default function VAnimalSearch() {
	const [paginationSize] = useState(10);
	const [leftIndex, setLeftIndex] = useState(0);
	const [rightIndex, setRightIndex] = useState(paginationSize);
	const [currentPage, setCurrentPage] = useState(1);
	const navigate = useNavigate();

	const [data, setData] = useState([]);

	const [animalInfo, setAnimalInfo] = useState({
		name: "",
		nickname: "",
	});
	const [isLoading, setIsLoading] = useState(false);

	async function handleSubmit(e) {
		e.preventDefault();

		setIsLoading(true);

		const response = await fetch(
			`${import.meta.env.VITE_API_URL}/admin/query_animal_name?name=${
				animalInfo.name
			}&nickname=${animalInfo.nickname}`
		);

		setIsLoading(false);

		if (!response.ok) {
			console.log("Error fetching data", response);
			return;
		}

		const data = await response.json();
		if (data.data.length === 0) {
			console.log("No data found");
			toast.error(`Animal could not be found`);
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
					Create Veterinarian Report
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
								<TableHead>Animal Id</TableHead>
								<TableHead>Animal</TableHead>
								<TableHead>Nickname</TableHead>
								<TableHead>Age</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{data.slice(leftIndex, rightIndex).map((el) => {
								return (
									<TableRow
										key={el.animal_id}
										onClick={() => {
											navigate(`${el.animal_id}/create`);
										}}
										className="cursor-pointer"
									>
										<TableCell>{el.animal_id}</TableCell>
										<TableCell>{el.name}</TableCell>
										<TableCell>{el.nickname}</TableCell>
										<TableCell>{formatDate(el.date_of_birth)}</TableCell>
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
