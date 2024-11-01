import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "lucide-react";
import Loading from "@/components/Loading";

export default function CreatePricing() {
	const [isLoading, setIsLoading] = useState(false);
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
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					category: pricingInfo.category,
					price: parseFloat(pricingInfo.price),
				}),
			}
		);

		setIsLoading(false);
		if (!res.ok) {
			console.error("Failed to create ticket pricing.");
			toast.error("Failed to create ticket pricing");
			return;
		}

		setPricingInfo({
			category: "",
			price: "",
		});

		toast.success("Ticket pricing created successfully.");
	};

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
				<h1 className="text-3xl font-semibold text-gray-800">Create Pricing</h1>
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
						/>
					</div>

					<div className="mt-4">
						<Label htmlFor="pricing">Pricing</Label>
						<Input
							value={pricingInfo.pricing}
							onChange={(e) =>
								setPricingInfo({ ...pricingInfo, pricing: e.target.value })
							}
							type="text"
							name="pricing"
							id="pricing"
							placeholder="3.50"
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
						Create
					</Button>
				</div>
			</form>
		</>
	);
}
