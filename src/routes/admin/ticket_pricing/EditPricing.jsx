import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeftIcon } from "lucide-react";
import Loading from "@/components/Loading";

export default function EditPricing() {
	const { ticket_id } = useParams();
	const [isLoading, setIsLoading] = useState(true);
	const [pricingInfo, setPricingInfo] = useState({
		category: "",
		price: "",
	});

	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		setIsLoading(true);

		const res = await fetch(
			`${import.meta.env.VITE_API_URL}/admin/ticket_type`,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					ticket_type_id: ticket_id,
					category: pricingInfo.category,
					price: pricingInfo.price,
				}),
			}
		);

		setIsLoading(false);

		if (!res.ok) {
			const errRes = await res.json();
			if (errRes.error_message) {
				console.error(errRes.error_message);
				toast.error(errRes.error_message);
				return;
			}

			console.error("Failed to create ticket pricing.");
			toast.error("Failed to update ticket pricing");
			return;
		}

		toast.success("Ticket pricing updated successfully");
	};

	useEffect(() => {
		async function fetchData() {
			const res = await fetch(
				`${import.meta.env.VITE_API_URL}/admin/ticket_type/:${ticket_id}`
			);
			setIsLoading(false);

			if (!res.ok) {
				console.error("Failed to fetch data", res);
				return;
			}

			const data = await res.json();
			console.log(data.data);
			setPricingInfo(data.data);
		}
		fetchData();
	}, [ticket_id]);

	if (isLoading) {
		return <Loading />;
	}

	return (
		<>
			<div className="flex items-center gap-2 w-full mb-6">
				<Button
					size="icon"
					variant="outline"
					onClick={() => navigate(`/admin/ticket`)}
				>
					<ArrowLeftIcon className="h-5 w-5" />
				</Button>
				<h1 className="text-3xl font-semibold text-gray-800">Edit Pricing</h1>
			</div>

			<form onSubmit={handleSubmit}>
				<div className="max-w-2xl">
					<h1 className="text-gray-800 text-xl font-semibold w-full border-b border-b-gray-400 pb-2">
						Pricing Information
					</h1>

					<div className="mt-4">
						<Label htmlFor="category">Category</Label>
						<Input
							value={pricingInfo.category}
							onChange={(e) =>
								setPricingInfo({ ...pricingInfo, category: e.target.value })
							}
							type="text"
							category="category"
							id="category"
							placeholder="Adult"
							required
							maxLength="20"
						/>
					</div>

					<div className="mt-4">
						<Label htmlFor="price">Price</Label>
						<Input
							value={pricingInfo.price}
							onChange={(e) =>
								setPricingInfo((prev) => ({ ...prev, price: e.target.value }))
							}
							type="number"
							name="price"
							id="price"
							placeholder="3.50"
							step="0.01"
							min="0.01"
							max="100.00"
							required
						/>
					</div>
				</div>

				<div className="flex w-full justify-end max-w-2xl">
					<Button
						disabled={isLoading}
						className="w-28 bg-buttonBg mt-8 rounded-md border border-primaryBorder hover:bg-primaryBorder py-5
						 transition-colorstext-white font-bold disabled:cursor-not-allowed"
					>
						Save
					</Button>
				</div>
			</form>
		</>
	);
}
