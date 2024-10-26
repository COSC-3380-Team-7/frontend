import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeftIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import Loading from "@/components/Loading";

export default function EditExhibit() {
	const { exhibit_id } = useParams();
	const navigate = useNavigate();

	const [isLoading, setIsLoading] = useState(false);
	const [exhibitInfo, setExhibitInfo] = useState({
		name: "African Forest",
		location: "B34",
		description:
			"Your adventure begins as you enter the African Forest, trekking down a path that emerges into a village trading outpost. You explore the small, round huts that surround a fire pit.",
	});

	async function handleSubmit(e) {
		e.preventDefault();
		/*
			Form Data {
				first_name: "John",
				middle_initial: "D",
				last_name: "Doe",
				phone_number: "123456789",
				address: "1234 Main St",
				email: "email",
				salary: "50000",
				password: """
			}
		*/
		console.log(exhibitInfo);
		toast.success("Employee created successfully.");
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
					onClick={() => navigate(`/admin/exhibit/${exhibit_id}`)}
				>
					<ArrowLeftIcon className="h-5 w-5" />
				</Button>
				<h1 className="text-3xl font-semibold text-gray-800">Edit Exhibit</h1>
			</div>

			<form onSubmit={handleSubmit}>
				<div className="max-w-2xl">
					<div className="mt-4">
						<Label htmlFor="name">Exhibit Name</Label>
						<Input
							value={exhibitInfo.name}
							onChange={(e) =>
								setExhibitInfo({ ...exhibitInfo, name: e.target.value })
							}
							type="text"
							name="name"
							id="name"
							placeholder="African Forest"
							required
						/>
					</div>

					<div className="mt-4">
						<Label htmlFor="location">Exhibit Location</Label>
						<Input
							value={exhibitInfo.location}
							onChange={(e) =>
								setExhibitInfo({ ...exhibitInfo, location: e.target.value })
							}
							type="text"
							name="location"
							id="location"
							placeholder="A26"
							required
						/>
					</div>

					<div className="mt-4">
						<Label htmlFor="description">Description</Label>
						<Textarea
							value={exhibitInfo.description}
							onChange={(e) =>
								setExhibitInfo({ ...exhibitInfo, description: e.target.value })
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
