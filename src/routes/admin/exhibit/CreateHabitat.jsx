import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeftIcon } from "lucide-react";

export default function CreateHabitat() {
	const [habitatInfo, setHabitatInfo] = useState({
		name: "",
		description: "",
	});
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();
	const { exhibit_id } = useParams();

	const handleSubmit = (e) => {
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
		const formData = new FormData(e.target);
		const data = Object.fromEntries(formData.entries());
		console.log(data);
		toast.success("Employee created successfully.");
	};
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
