import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useManagerStore } from "@/state_management/managerStore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function ManagerLogin() {
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();
	const { setManagerState } = useManagerStore();

	async function handleSubmit(e) {
		e.preventDefault();
		const formData = new FormData(e.target);
		const email = formData.get("email");
		const password = formData.get("password");
		console.log(email);
		console.log(password);

		setIsLoading(true);
		const res = await fetch(`${import.meta.env.VITE_API_URL}/manager/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email, password }),
		});

		setIsLoading(false);

		if (!res.ok) {
			toast.error("Invalid email or password");
			return;
		}

		const data = await res.json();
		console.log(data.data);

		const { employee_id, occupation } = data.data;
		console.log(employee_id, occupation);
		setManagerState(employee_id);

		toast.success("Logged in successfully");
		if (occupation === "Maintenance Worker") {
			navigate("/manager/maintenance");
		} else if (occupation === "Zookeeper") {
			navigate("/manager/zookeeper");
		} else if (occupation === "Veterinarian") {
			navigate("/manager/vet");
		}
	}

	return (
		<div className="flex items-center justify-center py-60">
			<div className="w-full max-w-96">
				<div className="mb-7">
					<p className="text-2xl font-semibold mb-2">Manager Portal</p>
					<p className="text-base font-semibold text-gray-800">
						Sign in to your account
					</p>
				</div>

				<form onSubmit={handleSubmit}>
					<div className="mt-4">
						<div className="mt-4">
							<Label htmlFor="email">Email</Label>
							<Input
								type="email"
								name="email"
								id="email"
								placeholder="user@gmail.com"
								required
							/>
						</div>
					</div>

					<div className="mt-4">
						<Label htmlFor="password">Password</Label>
						<Input
							type="password"
							name="password"
							id="password"
							placeholder="••••••••••"
							required
						/>
					</div>

					<Button
						disabled={isLoading}
						className="w-full bg-buttonBg mt-8 rounded-md border border-primaryBorder hover:bg-primaryBorder py-5
						 transition-colorstext-white text-base font-medium disabled:cursor-not-allowed"
					>
						Sign in
					</Button>
				</form>
			</div>
		</div>
	);
}
