import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
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

export default function ZMCreateAnimalFood() {
	const [isLoading, setIsLoading] = useState(false);
	const [foodInfo, setFoodInfo] = useState({
		food_name: "",
		food_type: "",
		stock: 0,
	});

	const navigate = useNavigate();

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
			`${import.meta.env.VITE_API_URL}/manager/create_animal_food`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
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
				toast.error("Failed to create animal food");
			}

			return;
		}

		const data = await response.json();
		console.log(data);
		toast.success("Animal food successfully created");

		setFoodInfo({
			food_name: "",
			food_type: "",
			stock: "",
		});
	}

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
					Add Animal Food
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
							maxLength="100"
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
							Add
						</Button>
					</div>
				</div>
			</form>
		</>
	);
}
