

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function SignInPage() {
// 	const navigate = useNavigate();

// 	const [username, setUsername] = useState("");
// 	const [password, setPassword] = useState("");

// 	const handleSignUp = (e) => {
// 		e.preventDefault();

// 		// Create a new user object with example fields
// 		const newUser = {
// 			name: username,
// 			email: `${username}@example.com`,
// 			password: password,
// 			membership: "Bronze Member",
// 			memberSince: "October 2024",
// 			favoriteAnimal: "Panda", // default or customizable later
// 			visits: [],
// 			currentTickets: 1,
// 			balance: "$0.00",
// 			pastPurchases: [],
// 		};

// 		// Redirect to profile page with new user data
// 		navigate("/profile", { state: newUser });
// 	};

// 	return (
// 		<div className="h-screen flex items-center justify-center bg-gradient-to-b from-green-200 to-green-100">
// 			<div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg border border-gray-300">
// 				{/* Back to Home Button */}
// 				<button 
// 					onClick={() => navigate("/")}
// 					className="text-blue-600 hover:underline mb-4"
// 				>
// 					Back to home
// 				</button>
				
// 				<h1 className="text-3xl font-bold mb-4 text-center text-green-800">Join the Adventure!</h1>
// 				<p className="text-center text-gray-600 mb-4">Sign up to explore the wonders of the zoo!</p>
// 				{/* <img
// 					src="https://via.placeholder.com/150x80?text=Zoo+Image"
// 					alt="Zoo Image"
// 					className="mx-auto mb-4"
// 				/> */}
// 				<form onSubmit={handleSignUp} className="space-y-4">
// 					<input
// 						type="text"
// 						placeholder="Username"
// 						value={username}
// 						onChange={(e) => setUsername(e.target.value)}
// 						className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
// 					/>
// 					<input
// 						type="password"
// 						placeholder="Password"
// 						value={password}
// 						onChange={(e) => setPassword(e.target.value)}
// 						className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
// 					/>
// 					<button
// 						type="submit"
// 						className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
// 					>
// 						Sign Up
// 					</button>
// 				</form>

// 				<p className="mt-4 text-center text-gray-600">
// 					Already have an account?{" "}
// 					<a href="/login" className="text-green-600 hover:underline">Log In</a>
// 				</p>
// 			</div>
// 		</div>
// 	);
// }
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function SignInPage() {
	const navigate = useNavigate();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	async function handleSignUp(e) {
		e.preventDefault();

		setIsLoading(true);
		try {
			const response = await fetch(`${import.meta.env.VITE_API_URL}/user/signup`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name: username,
					email: `${username}@example.com`,
					password,
					membership: "Bronze Member",
					memberSince: new Date().toLocaleDateString("en-US", {
						year: "numeric",
						month: "long",
					}),
					favoriteAnimal: "Panda",
				}),
			});
			setIsLoading(false);

			if (!response.ok) {
				toast.error("Sign-up failed. Please try again.");
				return;
			}

			const data = await response.json();
			toast.success("Sign-up successful!");
			navigate("/profile", { state: data }); // Redirect to profile with the new user data
		} catch (error) {
			setIsLoading(false);
			toast.error("An error occurred. Please try again.");
			console.error("Sign-up error:", error);
		}
	}

	return (
		<div className="h-screen flex items-center justify-center bg-gradient-to-b from-green-200 to-green-100">
			<div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg border border-gray-300">
				<button 
					onClick={() => navigate("/")}
					className="text-blue-600 hover:underline mb-4"
				>
					Back to home
				</button>

				<h1 className="text-3xl font-bold mb-4 text-center text-green-800">Join the Adventure!</h1>
				<p className="text-center text-gray-600 mb-4">Sign up to explore the wonders of the zoo!</p>

				<form onSubmit={handleSignUp} className="space-y-4">
					<div>
						<Label htmlFor="username">Username</Label>
						<Input
							type="text"
							name="username"
							id="username"
							placeholder="Username"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							required
						/>
					</div>
					<div>
						<Label htmlFor="password">Password</Label>
						<Input
							type="password"
							name="password"
							id="password"
							placeholder="Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</div>

					<Button
						disabled={isLoading}
						className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
					>
						{isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
						Sign Up
					</Button>
				</form>

				<p className="mt-4 text-center text-gray-600">
					Already have an account?{" "}
					<a href="/login" className="text-green-600 hover:underline">Log In</a>
				</p>
			</div>
		</div>
	);
}
