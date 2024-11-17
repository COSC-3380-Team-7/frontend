import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
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

export default function EditExhibit() {
	const { exhibit_id } = useParams();
	const navigate = useNavigate();

	const [isLoading, setIsLoading] = useState(true);
	const [exhibitInfo, setExhibitInfo] = useState({
		name: "",
		description: "",
		department_id: "",
	});
	const [departmentData, setDepartmentData] = useState([]);

	async function handleSubmit(e) {
		e.preventDefault();
		setIsLoading(true);

		const response = await fetch(
			`${import.meta.env.VITE_API_URL}/admin/exhibit/:${exhibit_id}`,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name: exhibitInfo.name,
					description: exhibitInfo.description,
					department_id: +exhibitInfo.department_id,
				}),
			}
		);

		if (!response.ok) {
			const errRes = await response.json();

			if (errRes.error_message) {
				console.error("Error updating exhibit: ", errRes.error_message);
				setIsLoading(false);
				toast.error(errRes.error_message);
				return;
			}

			console.error("Error updating exhibit: ", response);
			setIsLoading(false);
			toast.error("Error updating exhibit");
			return;
		}

		setIsLoading(false);

		toast.success("Exhibit updated successfully");
	}

	useEffect(() => {
		async function fetchData() {
			const departmentResponse = await fetch(
				`${import.meta.env.VITE_API_URL}/admin/department`
			);

			if (!departmentResponse.ok) {
				console.error("Error fetching data: ", departmentResponse);
				setIsLoading(false);
				return;
			}

			const dData = await departmentResponse.json();
			console.log(dData.data);
			setDepartmentData(dData.data);

			const exhibitResponse = await fetch(
				`${import.meta.env.VITE_API_URL}/admin/exhibit/:${exhibit_id}`
			);
			if (!exhibitResponse.ok) {
				console.error("Error fetching data: ", exhibitResponse);
				setIsLoading(false);
				return;
			}

			const exhibitData = await exhibitResponse.json();
			console.log(exhibitData.data);
			setExhibitInfo({
				name: exhibitData.data.name,
				description: exhibitData.data.description,
				department_id: exhibitData.data.department_id.toString(),
			});

			setIsLoading(false);
		}
		fetchData();
	}, [exhibit_id]);

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
							maxLength="100"
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
							maxLength="500"
						/>
					</div>

					<div className="mt-4">
						<Label htmlFor="gender">Department</Label>
						<Select
							value={exhibitInfo.department_id}
							onValueChange={(value) =>
								setExhibitInfo((prev) => ({ ...prev, department_id: value }))
							}
							required
						>
							<SelectTrigger className="max-w-52 border-gray-500">
								<SelectValue placeholder="Select department" />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectLabel>Department</SelectLabel>
									{departmentData.map((el) => (
										<SelectItem
											key={el.department_id}
											value={el.department_id.toString()}
										>
											{el.name}
										</SelectItem>
									))}
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
						Save
					</Button>
				</div>
			</form>
		</>
	);
}
