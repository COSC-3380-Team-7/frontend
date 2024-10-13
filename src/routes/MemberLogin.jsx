import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

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
						<label
							htmlFor="email"
							className="block text-sm font-semibold leading-6 text-gray-800"
						>
							Email
						</label>
						<div className="relative mt-2 rounded-md shadow-sm">
							<input
								type="email"
								name="email"
								id="email"
								className="block w-full bg-white rounded-md text-gray-900 py-1.5 px-3 border border-gray-700  placeholder:text-gray-700 focus:ring-2 focus:outline-none focus:ring-inputHover sm:text-sm sm:leading-6 transition-colors"
								placeholder="person@gmail.com"
								required
							/>
						</div>
					</div>

					<div className="mt-4">
						<label
							htmlFor="password"
							className="block text-sm font-semibold leading-6 text-gray-800"
						>
							Password
						</label>
						<div className="relative mt-2 rounded-md shadow-sm">
							<input
								type="password"
								name="password"
								id="password"
								className="block w-full bg-white rounded-md text-gray-900 py-1.5 px-3 border border-gray-700  placeholder:text-gray-700 focus:ring-2 focus:outline-none focus:ring-inputHover sm:text-sm sm:leading-6 transition-colors"
								placeholder="••••••••••"
								required
							/>
						</div>
					</div>

					<Button
						disabled={isLoading}
						className="w-full bg-primaryBg mt-8 rounded-md border border-primaryBorder hover:bg-primaryBorder py-5
						 transition-colorstext-white text-base font-medium disabled:cursor-not-allowed"
					>
						Sign in
					</Button>
				</form>
			</div>
		</div>
	);
}
