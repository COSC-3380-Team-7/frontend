import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeftIcon } from "lucide-react";
import Loading from "@/components/Loading";

export default function PromoteEmployee() {
	const { department_id, employee_id } = useParams();
	const navigate = useNavigate();
	const [employeeInfo, setEmployeeInfo] = useState({
		employment_status: "",
	});
	const [positions, setPositions] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	async function handleSubmit(e) {
		e.preventDefault();
	}

	useEffect(() => {
		async function fetchPositions() {
			const posRes = await fetch(
				`${import.meta.env.VITE_API_URL}/admin/auth_levels`
			);

			if (!posRes.ok) {
				console.error("Error fetching data: ", posRes);
				setIsLoading(false);
				return;
			}

			const posData = await posRes.json();
			console.log(posData.data);
			setPositions(posData.data);
		}

		fetchPositions();
	}, []);

	if (isLoading) {
		return <Loading />;
	}

	return (
		<div>
			<div className="flex items-center gap-2 w-full mb-3">
				<Button
					size="icon"
					variant="outline"
					onClick={() =>
						navigate(
							`/admin/department/${department_id}/employee/${employee_id}`
						)
					}
				>
					<ArrowLeftIcon className="h-5 w-5" />
				</Button>
				<h1 className="text-3xl font-semibold text-gray-800">
					Employee ID: {employee_id}
				</h1>
			</div>

			<form onSubmit={handleSubmit} className="mt-4">
				<div className="mt-4">
					<Label htmlFor="auth_level_id">Position</Label>

					<Select
						value={employeeInfo.auth_level_id}
						onValueChange={(value) =>
							setEmployeeInfo((prev) => ({ ...prev, auth_level_id: value }))
						}
						name="auth_level_id"
						id="auth_level_id"
						required
					>
						<SelectTrigger className="max-w-52 border-gray-500">
							<SelectValue placeholder="Select Position" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectLabel>Position</SelectLabel>
								{positions.map((p) => (
									<SelectItem
										key={p.auth_level_id}
										value={p.auth_level_id.toString()}
									>
										{p.title}
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
						 transition-colorstext-white font-bold disabled:cursor-not-allowed"
					>
						Save
					</Button>
				</div>
			</form>
		</div>
	);
}
