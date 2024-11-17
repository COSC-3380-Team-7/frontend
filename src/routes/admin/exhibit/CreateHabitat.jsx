import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeftIcon } from "lucide-react";
import Loading from "@/components/Loading";

export default function CreateHabitat() {
	const [habitatInfo, setHabitatInfo] = useState({
		name: "",
		description: "",
	});
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();
	const { exhibit_id } = useParams();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);

		const response = await fetch(
			`${import.meta.env.VITE_API_URL}/admin/habitat`,
			{
				method: "POST",
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
			const errRes = await response.json();

			if (errRes.error_message) {
				console.error("Error creating habitat: ", errRes.error_message);
				setIsLoading(false);
				toast.error(errRes.error_message);
				return;
			} else {
				console.error("Error creating habitat: ", response);
				setIsLoading(false);
				toast.error("Error creating habitat");
				return;
			}
		}

		setIsLoading(false);
		setHabitatInfo({
			name: "",
			description: "",
		});
		toast.success("Habitat created successfully");
	};

	if (isLoading) {
		return <Loading />;
	}

	return (
		<>
			<div className="flex items-center gap-2 w-full mb-10">
				<Button
					size="icon"
					variant="outline"
					onClick={() => navigate(`/admin/exhibit/${exhibit_id}`)}
				>
					<ArrowLeftIcon className="h-5 w-5" />
				</Button>
				<h1 className="text-3xl font-semibold text-gray-800">Create Habitat</h1>
			</div>

			<form onSubmit={handleSubmit}>
				<div className="max-w-2xl">
					<div className="mt-4">
						<Label htmlFor="name">Name</Label>
						<Input
							value={habitatInfo.name}
							onChange={(e) =>
								setHabitatInfo({ ...habitatInfo, name: e.target.value })
							}
							type="text"
							name="name"
							id="name"
							placeholder="Tiger Habitat"
							required
							maxLength="100"
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
							placeholder="This is a habitat for tigers."
							required
							maxLength="500"
						></Textarea>
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
