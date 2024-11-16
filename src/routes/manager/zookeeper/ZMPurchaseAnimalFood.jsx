import { useEffect, useState } from "react";
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

export default function ZMPurchaseAnimalFood() {
	const [isLoading, setIsLoading] = useState(false);
	const [foodInfo, setFoodInfo] = useState([]);
	const [vendorInfo, setVendorInfo] = useState({
		vendor_name: "",
		purchased_price: "",
		quantity: "",
		animal_food_id: "",
	});

	const navigate = useNavigate();

	async function handleSubmit(e) {
		e.preventDefault();

		if (vendorInfo.vendor_name.length > 100) {
			toast.error("Food name cannot be more than 100 characters");
			return;
		}

		setIsLoading(true);
		const response = await fetch(
			`${import.meta.env.VITE_API_URL}/manager/purchase_animal_food`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					vendor_name: vendorInfo.vendor_name,
					purchased_price: parseFloat(vendorInfo.purchased_price),
					quantity: parseInt(vendorInfo.quantity),
					animal_food_id: vendorInfo.animal_food_id,
				}),
			}
		);
		setIsLoading(false);

		if (!response.ok) {
			console.error("Error buying animal food: ", response);
			toast.error("Error buying animal food");
			return;
		}

		const data = await response.json();
		console.log(data);
		toast.success("Animal food purchased successfully");

		setVendorInfo({
			vendor_name: "",
			purchased_price: "",
			quantity: "",
			animal_food_id: "",
		});
	}

	useEffect(() => {
		async function fetchData() {
			const res = await fetch(
				`${import.meta.env.VITE_API_URL}/manager/food_for_animal`
			);
			setIsLoading(false);

			if (!res.ok) {
				console.error("Error fetching data: ", res);
				return;
			}
			const data = await res.json();
			console.log(data.data);
			setFoodInfo(data.data);
		}
		fetchData();
	}, []);

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
					Purchase Animal Food
				</h1>
			</div>

			<form onSubmit={handleSubmit}>
				<div className="max-w-2xl">
					<h1 className="text-gray-800 text-xl font-semibold w-full border-b border-b-gray-400 pb-2">
						Vendor Information
					</h1>

					<div className="mt-4">
						<Label htmlFor="vendor_name">Name</Label>
						<Input
							value={vendorInfo.vendor_name}
							onChange={(e) =>
								setVendorInfo({ ...vendorInfo, vendor_name: e.target.value })
							}
							type="text"
							name="vendor_name"
							id="vendor_name"
							placeholder="Animal Food Vendor"
							required
						/>
					</div>

					<div className="mt-4">
						<Label htmlFor="purchased_price">Purchase Price per Item</Label>
						<Input
							value={vendorInfo.purchased_price}
							onChange={(e) =>
								setVendorInfo({
									...vendorInfo,
									purchased_price: e.target.value,
								})
							}
							type="number"
							step="0.01"
							name="purchased_price"
							id="purchased_price"
							placeholder="0.00"
							min="0"
							max="100"
							required
						/>
					</div>

					<div className="mt-4">
						<Label htmlFor="quantity">Quantity</Label>
						<Input
							value={vendorInfo.quantity}
							onChange={(e) =>
								setVendorInfo({ ...vendorInfo, quantity: e.target.value })
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
							value={vendorInfo.animal_food_id}
							onValueChange={(value) =>
								setVendorInfo((prev) => ({ ...prev, animal_food_id: value }))
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
							Purchase
						</Button>
					</div>
				</div>
			</form>
		</>
	);
}
