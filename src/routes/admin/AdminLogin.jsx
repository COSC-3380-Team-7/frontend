import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAdminStore } from "@/state_management/adminStore";

export default function AdminLogin() {
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();
	const { setAdminState } = useAdminStore();

	async function handleSubmit(e) {
		e.preventDefault();
		const formData = new FormData(e.target);
		const email = formData.get("email");
		const password = formData.get("password");

		setIsLoading(true);
		const response = await fetch(
			`${import.meta.env.VITE_API_URL}/admin/login`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email, password }),
			}
		);
		setIsLoading(false);

		if (!response.ok) {
			toast.error("Invalid login credentials");
			return;
		}

		const data = await response.json();
		console.log(data);
		setAdminState(data.employee_id);

		toast.success("Login successful");
		navigate("/admin/department");
	}

	return (
		<div className="flex items-center justify-center py-60">
			<div className="w-full max-w-96">
				<div className="mb-7">
					<p className="text-2xl font-semibold mb-2">Admin Portal</p>
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
						{isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}{" "}
						Sign in
					</Button>
				</form>
			</div>
		</div>
	);
}
