import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "lucide-react";
import Loading from "@/components/Loading";

export default function CreateDepartment() {
	const [departmentInfo, setDepartmentInfo] = useState({
		name: "",
		location: "",
	});
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();
	console.log(departmentInfo);

	async function handleSubmit(e) {
		e.preventDefault();
		console.log(departmentInfo);
		toast.success("Employee created successfully.");
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
					onClick={() => navigate("/admin/department")}
				>
					<ArrowLeftIcon className="h-5 w-5" />
				</Button>
				<h1 className="text-3xl font-semibold text-gray-800">
					Create Department
				</h1>
			</div>

			<form onSubmit={handleSubmit}>
				<div className="max-w-2xl">
					<div className="mt-4">
						<Label htmlFor="name">Department Name</Label>
						<Input
							value={departmentInfo.name}
							onChange={(e) =>
								setDepartmentInfo({ ...departmentInfo, name: e.target.value })
							}
							type="text"
							name="name"
							id="name"
							placeholder="Zookeeper Department"
							required
						/>
					</div>

					<div className="mt-4">
						<Label htmlFor="location">Department Location</Label>
						<Input
							value={departmentInfo.location}
							onChange={(e) =>
								setDepartmentInfo({
									...departmentInfo,
									location: e.target.value,
								})
							}
							type="text"
							name="location"
							id="location"
							placeholder="West Avenue"
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
						Create
					</Button>
				</div>
			</form>
		</>
	);
}
