import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, ArrowRight, ShoppingBasket } from "lucide-react";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Link, useNavigate } from "react-router-dom";
import Loading from "@/components/Loading";

export default function ZMAnimalFood() {
	const navigate = useNavigate();
	const paginationSize = 10;
	const [leftIndex, setLeftIndex] = useState(0);
	const [rightIndex, setRightIndex] = useState(paginationSize);
	const [currentPage, setCurrentPage] = useState(1);
	const [foodData, setFoodData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function fetchData() {
			setIsLoading(true);
			const res1 = await fetch(
				`${import.meta.env.VITE_API_URL}/admin/food_for_animal`
			);
			setIsLoading(false);

			if (!res1.ok) {
				console.error("Error fetching data: ", res1);
				return;
			}
			const data1 = await res1.json();
			console.log(data1.data);
			setFoodData(data1.data);
		}
		fetchData();
	}, []);

	if (isLoading) {
		return <Loading />;
	}

	return (
		<>
			<div className="flex items-center w-full justify-between mb-4">
				<div className="flex items-center gap-2 w-full">
					<h1 className="text-3xl font-semibold text-gray-800">Animal Food</h1>
				</div>
			</div>

			<div className="flex items-center gap-4 mb-6">
				<Button
					asChild
					className="flex items-center gap-2 font-semibold bg-secondaryBg hover:bg-secondaryBg"
				>
					<Link to="purchase">
						<ShoppingBasket className="h-5 w-5" /> Purchase Animal Food
					</Link>
				</Button>
			</div>

			<h1 className="text-gray-800 text-xl font-semibold w-full border-b border-b-gray-400 pb-2 mt-4">
				Food
			</h1>

			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Food Id</TableHead>
						<TableHead>Name</TableHead>
						<TableHead>Stock</TableHead>
						<TableHead>Category</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{foodData.map((el) => (
						<TableRow
							key={el.animal_food_id}
							onClick={() => {
								navigate(`${el.animal_food_id}`);
							}}
							className="cursor-pointer"
						>
							<TableCell className="font-medium">{el.animal_food_id}</TableCell>
							<TableCell>{el.food_name}</TableCell>
							<TableCell>{el.stock}</TableCell>
							<TableCell>{el.food_type}</TableCell>
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
					disabled={rightIndex >= foodData.length - 1}
				>
					Next
					<ArrowRight className="h-5 w-5" />
				</Button>
			</div>
		</>
	);
}
