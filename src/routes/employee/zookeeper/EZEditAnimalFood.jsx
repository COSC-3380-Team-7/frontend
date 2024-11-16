import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeftIcon } from "lucide-react";
import Loading from "@/components/Loading";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

export default function EZEditAnimalFood() {
	const [isLoading, setIsLoading] = useState(true);
	const [foodInfo, setFoodInfo] = useState({
		food_name: "",
		food_type: "",
		stock: "",
	});

	const navigate = useNavigate();
	const { animal_food_id } = useParams();

	async function handleSubmit(e) {
		e.preventDefault();

		if (foodInfo.food_name.length > 100) {
			toast.error("Food name cannot be more than 100 characters");
			return;
		}

		if (foodInfo.stock > 100) {
			toast.error("Stock cannot be more than 100");
			return;
		}

		setIsLoading(true);
		const response = await fetch(
			`${import.meta.env.VITE_API_URL}/manager/update_animal_food`,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					animal_food_id: animal_food_id,
					food_name: foodInfo.food_name,
					food_type: foodInfo.food_type,
					stock: +foodInfo.stock,
				}),
			}
		);
		setIsLoading(false);

		if (!response.ok) {
			const data = await response.json();

			if (data.error_message) {
				toast.error(data.error_message);
			} else {
				toast.error("Failed to update animal food");
			}

			return;
		}

		const data = await response.json();
		console.log(data);
		toast.success("Animal food successfully updated");
	}

	useEffect(() => {
		async function fetchData() {
			const res = await fetch(
				`${
					import.meta.env.VITE_API_URL
				}/manager/food_for_animal/:${animal_food_id}`
			);
			setIsLoading(false);

			if (!res.ok) {
				console.error("Error fetching data: ", res);
				return;
			}
			const data = await res.json();

			setFoodInfo({
				food_name: data.data.food_name,
				food_type: data.data.food_type,
				stock: data.data.stock,
			});
		}
		fetchData();
	}, [animal_food_id]);

	if (isLoading) {
		return <Loading />;
	}

	return (
		<>
			<div className="flex items-center gap-2 w-full mb-6">
				<Button
					size="icon"
					variant="outline"
					onClick={() => navigate(`/manager/zookeeper/animal_food/`)}
				>
					<ArrowLeftIcon className="h-5 w-5" />
				</Button>
				<h1 className="text-3xl font-semibold text-gray-800">
					Edit Animal Food
				</h1>
			</div>

			<form onSubmit={handleSubmit}>
				<div className="max-w-2xl">
					<h1 className="text-gray-800 text-xl font-semibold w-full border-b border-b-gray-400 pb-2">
						Animal Food Information
					</h1>

					<div className="mt-4">
						<Label htmlFor="food_name">Name</Label>
						<Input
							value={foodInfo.food_name}
							onChange={(e) =>
								setFoodInfo({ ...foodInfo, food_name: e.target.value })
							}
							type="text"
							name="food_name"
							id="name"
							placeholder="Apple"
							required
						/>
					</div>

					<div className="mt-4">
						<Label htmlFor="stock">Stock</Label>
						<Input
							value={foodInfo.stock}
							onChange={(e) =>
								setFoodInfo({ ...foodInfo, stock: e.target.value })
							}
							type="number"
							name="stock"
							id="name"
							placeholder="0"
							min="0"
							max="100"
							required
						/>
					</div>

					<div className="mt-4">
						<Label htmlFor="food_type">Category</Label>
						<Select
							value={foodInfo.food_type}
							onValueChange={(value) =>
								setFoodInfo((prev) => ({ ...prev, food_type: value }))
							}
							required
						>
							<SelectTrigger className="max-w-52 border-gray-500">
								<SelectValue placeholder="Select food category" />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectLabel>Category</SelectLabel>
									<SelectItem value="Meat">Meat</SelectItem>
									<SelectItem value="Vegetable">Vegetable</SelectItem>
									<SelectItem value="Fruit">Fruit</SelectItem>
									<SelectItem value="Fish">Fish</SelectItem>
									<SelectItem value="Insects">Insects</SelectItem>
									<SelectItem value="Nuts">Nuts</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>

					<div className="flex w-full justify-end max-w-2xl">
						<Button
							disabled={isLoading}
							className="w-28 bg-buttonBg mt-8 rounded-md border border-primaryBorder hover:bg-primaryBorder py-5
                         transition-colorstext-white font-bold disabled:cursor-not-allowed"
						>
							Update
						</Button>
					</div>
				</div>
			</form>
		</>
	);
}
