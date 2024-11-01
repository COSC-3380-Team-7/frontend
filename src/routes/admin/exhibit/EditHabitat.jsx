import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeftIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import Loading from "@/components/Loading";

export default function EditHabitat() {
	const { exhibit_id, habitat_id } = useParams();
	const navigate = useNavigate();

	const [isLoading, setIsLoading] = useState(true);
	const [habitatInfo, setHabitatInfo] = useState({
		name: "",
		description: "",
	});

	async function handleSubmit(e) {
		e.preventDefault();
		setIsLoading(true);

		const response = await fetch(
			`${import.meta.env.VITE_API_URL}/admin/habitat/:${habitat_id}`,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name: habitatInfo.name,
					description: habitatInfo.description,
					exhibit_id: +exhibit_id,
				}),
			}
		);

		if (!response.ok) {
			console.error("Error updating habitat: ", response);
			setIsLoading(false);
			toast.error("Error updating habitat");
			return;
		}

		setIsLoading(false);

		toast.success("Habitat updated successfully");
	}

	useEffect(() => {
		async function fetchData() {
			setIsLoading(true);
			const response = await fetch(
				`${import.meta.env.VITE_API_URL}/admin/habitat/:${habitat_id}`
			);

			if (!response.ok) {
				console.error("Error fetching data: ", response);
				setIsLoading(false);
				return;
			}

			const data = await response.json();
			setHabitatInfo(data.data);
			setIsLoading(false);
		}
		fetchData();
	}, [habitat_id]);

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
						navigate(`/admin/exhibit/${exhibit_id}/habitat/${habitat_id}`)
					}
				>
					<ArrowLeftIcon className="h-5 w-5" />
				</Button>
				<h1 className="text-3xl font-semibold text-gray-800">Edit Habitat</h1>
			</div>

			<form onSubmit={handleSubmit}>
				<div className="max-w-2xl">
					<div className="mt-4">
						<Label htmlFor="name">Habitat Name</Label>
						<Input
							value={habitatInfo.name}
							onChange={(e) =>
								setHabitatInfo({ ...habitatInfo, name: e.target.value })
							}
							type="text"
							name="name"
							id="name"
							placeholder="African Forest"
							required
						/>
					</div>

					<div className="mt-4">
						<Label htmlFor="description">Description</Label>
						<Textarea
							value={habitatInfo.description}
							onChange={(e) =>
								setHabitatInfo({ ...habitatInfo, description: e.target.value })
							}
							type="text"
							name="description"
							id="description"
							placeholder="Enter exhibit description"
							className="border-gray-500"
							required
						/>
					</div>
				</div>

				<div className="flex w-full justify-end max-w-2xl">
					<Button
						disabled={isLoading}
						className="w-24 bg-buttonBg mt-8 rounded-md border border-primaryBorder hover:bg-primaryBorder py-5
						 transition-colorstext-white font-semibold disabled:cursor-not-allowed"
					>
						Save
					</Button>
				</div>
			</form>
		</>
	);
}
