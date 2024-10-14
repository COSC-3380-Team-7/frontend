import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function MemberLogin() {
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	async function handleSubmit(e) {
		e.preventDefault();
		const formData = new FormData(e.target);
		const email = formData.get("email");
		const password = formData.get("password");
		console.log(email);
		console.log(password);

		toast.success("Login successful");

		// try {
		// 	const response = await fetch("http://localhost:4000/api/auth/login", {
		// 		method: "POST",
		// 		headers: {
		// 			"Content-Type": "application/json",
		// 		},
		// 		body: JSON.stringify({ email, password }),
		// 	});

		// 	const data = await response.json();
		// 	console.log(data);
		// } catch (error) {
		// 	console.error(error);
		// }
	}

	return (
		<div className="flex items-center justify-center py-60">
			<div className="w-full max-w-96">
				<div className="mb-7">
					<p className="text-2xl font-semibold mb-2">Welcome back</p>
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
