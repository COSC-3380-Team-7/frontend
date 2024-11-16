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

export default function EZFeedAnimals() {
	const [isLoading, setIsLoading] = useState(false);
	const [animalInfo, setAnimalInfo] = useState({
		name: "",
		nickname: "",
	});
	const [foodInfo, setFoodInfo] = useState([]);
	const [foodEaten, setFoodEaten] = useState({
		quantity: "",
		animal_food_id: "",
	});
	const { exhibit_id, habitat_id, animal_id } = useParams();

	const navigate = useNavigate();

	async function handleSubmit(e) {
		e.preventDefault();

		const food = foodInfo.find(
			(f) => parseInt(f.animal_food_id) === parseInt(foodEaten.animal_food_id)
		);

		if (foodEaten.quantity > food.stock) {
			toast.error("Not enough food in stock");
			return;
		}

		setIsLoading(true);
		const response = await fetch(
			`${import.meta.env.VITE_API_URL}/manager/feed_animal`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					animal_id: animal_id,
					quantity: parseInt(foodEaten.quantity),
					animal_food_id: foodEaten.animal_food_id,
				}),
			}
		);
		setIsLoading(false);

		if (!response.ok) {
			const errData = await response.json();

			if (errData.error_message) {
				console.error("Error feeding animal", errData.error_message);
				toast.error(errData.error_message);
			} else {
				console.error("Error feeding animal", response);
				toast.error("Error feeding animal");
			}

			return;
		}

		const data = await response.json();
		console.log(data);
		toast.success("Animal has been fed");

		setFoodEaten({
			quantity: "",
			animal_food_id: "",
		});
	}

	useEffect(() => {
		async function fetchData() {
			const res = await fetch(
				`${import.meta.env.VITE_API_URL}/manager/food_for_animal`
			);

			if (!res.ok) {
				console.error("Error fetching data: ", res);
				setIsLoading(false);
				return;
			}

			const data = await res.json();
			console.log(data.data);
			setFoodInfo(data.data);

			const animalResponse = await fetch(
				`${import.meta.env.VITE_API_URL}/admin/animal/:${animal_id}`
			);

			if (!animalResponse.ok) {
				console.error("Error fetching animalData: ", animalResponse);
				setIsLoading(false);
				return;
			}

			const ad = await animalResponse.json();

			console.log(ad.data);
			setAnimalInfo({
				name: ad.data.name,
				nickname: ad.data.nickname,
			});

			setIsLoading(false);
		}
		fetchData();
	}, [animal_id]);

	if (isLoading) {
		return <Loading />;
	}

	return (
		<>
			<div className="flex items-center gap-2 w-full mb-6">
				<Button
					size="icon"
					variant="outline"
					onClick={() =>
						navigate(
							`/manager/zookeeper/exhibit/${exhibit_id}/habitat/${habitat_id}/animal/${animal_id}`
						)
					}
				>
					<ArrowLeftIcon className="h-5 w-5" />
				</Button>
				<h1 className="text-3xl font-semibold text-gray-800">
					Feed {animalInfo.nickname} the {animalInfo.name}
				</h1>
			</div>

			<form onSubmit={handleSubmit}>
				<div className="max-w-2xl">
					<h1 className="text-gray-800 text-xl font-semibold w-full border-b border-b-gray-400 pb-2">
						Feed Animal
					</h1>

					<div className="mt-4">
						<Label htmlFor="quantity">Quantity</Label>
						<Input
							value={foodEaten.quantity}
							onChange={(e) =>
								setFoodEaten({ ...foodEaten, quantity: e.target.value })
							}
							type="number"
							name="quantity"
							id="quantity"
							placeholder="0"
							min="0"
							max="100"
							required
						/>
					</div>

					<div className="mt-4">
						<Label htmlFor="animal_food">Food</Label>
						<Select
							value={foodEaten.animal_food_id}
							onValueChange={(value) =>
								setFoodEaten((prev) => ({ ...prev, animal_food_id: value }))
							}
							required
						>
							<SelectTrigger className="max-w-52 border-gray-500">
								<SelectValue placeholder="Select food" />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectLabel>Food</SelectLabel>
									{foodInfo.map((food) => (
										<SelectItem
											key={food.animal_food_id}
											value={food.animal_food_id.toString()}
										>
											{food.food_name}
										</SelectItem>
									))}
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>

					<div className="flex w-full justify-end max-w-2xl">
						<Button
							disabled={isLoading}
							className="w-28 bg-buttonBg mt-8 rounded-md border border-primaryBorder hover:bg-primaryBorder py-5
						 transition-colors text-white font-bold disabled:cursor-not-allowed"
						>
							Feed
						</Button>
					</div>
				</div>
			</form>
		</>
	);
}
