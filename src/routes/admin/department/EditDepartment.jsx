import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeftIcon } from "lucide-react";
import Loading from "@/components/Loading";

export default function EditDepartment() {
	const { department_id } = useParams();
	const [departmentInfo, setDepartmentInfo] = useState({
		name: "",
		location: "",
	});
	const [form, setForm] = useState({
		name: "",
		location: "",
	});
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	async function handleSubmit(e) {
		e.preventDefault();

		setIsLoading(true);

		const response = await fetch(
			`${import.meta.env.VITE_API_URL}/admin/department/:${department_id}`,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(form),
			}
		);

		setIsLoading(false);

		if (!response.ok) {
			console.error("Error updating department: ", response);
			toast.error("Error updating department.");
			return;
		}

		setDepartmentInfo({
			name: form.name,
			location: form.location,
		});
		toast.success("Updated department successfully");
	}

	useEffect(() => {
		async function fetchData() {
			try {
				setIsLoading(true);
				const response = await fetch(
					`${import.meta.env.VITE_API_URL}/admin/department/:${department_id}`
				);

				if (!response.ok) {
					console.error("Error fetching data: ", response);
					setIsLoading(false);
					return;
				}

				const data = await response.json();
				console.log(data.data);
				setDepartmentInfo(data.data);
				setForm(data.data);
				setIsLoading(false);
			} catch (error) {
				console.error("Error fetching data: ", error);
			}
		}
		fetchData();
	}, [department_id]);

	if (isLoading) {
		return <Loading text="Initializing..." />;
	}

	return (
		<>
			<div className="flex items-center gap-2 w-full mb-10">
				<Button
					size="icon"
					variant="outline"
					onClick={() => navigate(`/admin/department/${department_id}`)}
				>
					<ArrowLeftIcon className="h-5 w-5" />
				</Button>
				<h1 className="text-3xl font-semibold text-gray-800">
					Edit Department
				</h1>
			</div>

			<form onSubmit={handleSubmit}>
				<div className="max-w-2xl">
					<div className="mt-4">
						<Label htmlFor="name">Department Name</Label>
						<Input
							value={form.name}
							onChange={(e) => setForm({ ...form, name: e.target.value })}
							type="text"
							name="name"
							id="name"
							placeholder="Zookeeper Department"
							required
							maxLength="100"
						/>
					</div>

					<div className="mt-4">
						<Label htmlFor="location">Department Location</Label>
						<Input
							value={form.location}
							onChange={(e) =>
								setForm({
									...form,
									location: e.target.value,
								})
							}
							type="text"
							name="location"
							id="location"
							placeholder="West Avenue"
							required
							maxlength="20"
						/>
					</div>
				</div>

				<div className="flex w-full justify-end max-w-2xl">
					<Button
						disabled={
							isLoading ||
							(form.name == departmentInfo.name &&
								form.location == departmentInfo.location)
						}
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
