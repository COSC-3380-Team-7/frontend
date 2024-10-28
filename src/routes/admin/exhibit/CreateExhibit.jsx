import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
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
import { Input } from "@/components/ui/input";

export default function CreateExhibit() {
	const [exhibitInfo, setExhibitInfo] = useState({
		name: "",
		location: "",
		description: "",
		department: "",
	});
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();
	console.log(exhibitInfo);

	async function handleSubmit(e) {
		e.preventDefault();
		console.log(exhibitInfo);
		// toast.success("Employee created successfully.");
	}

	if (isLoading) {
		return <Loading text="Initializing..." />;
	}

	return (
		<>
			<div className="flex items-center gap-2 w-full mb-10">
				<Button
					size="icon"
					variant="outline"
					onClick={() => navigate("/admin/exhibit")}
				>
					<ArrowLeftIcon className="h-5 w-5" />
				</Button>
				<h1 className="text-3xl font-semibold text-gray-800">Create Exhibit</h1>
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

					<div className="mt-4">
						<Label htmlFor="gender">Department</Label>
						<Select
							value={exhibitInfo.department}
							onValueChange={(value) =>
								setExhibitInfo((prev) => ({ ...prev, department: value }))
							}
							required
						>
							<SelectTrigger className="max-w-52 border-gray-500">
								<SelectValue placeholder="Select department" />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectLabel>Department</SelectLabel>
									<SelectItem value="WildLife">WildLife</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>
				</div>

				<div className="flex w-full justify-end max-w-2xl">
					<Button
						disabled={isLoading}
						className="w-24 bg-buttonBg mt-8 rounded-md border border-primaryBorder hover:bg-primaryBorder py-5
						 transition-colorstext-white font-semibold disabled:cursor-not-allowed"
					>
						Create
					</Button>
				</div>
			</form>
		</>
	);
}
