
// // import { useState } from "react";
// // import { useNavigate } from "react-router-dom";

// // export default function LoginPage() {
// // 	const navigate = useNavigate();

// // 	// Sample data array for users
// // 	const users = [
// // 		{
// // 			name: "John Doe",
// // 			email: "johndoe@example.com",
// // 			password: "password123",
// // 			membership: "Gold Member",
// // 			memberSince: "April 2023",
// // 			favoriteAnimal: "Giraffe",
// // 			visits: [
// // 				{ date: "September 15, 2023", activities: ["Lion Show", "Reptile House"] },
// // 				{ date: "August 22, 2023", activities: ["Bird Pavilion", "Elephant Walk"] },
// // 				{ date: "July 12, 2023", activities: ["Penguin Parade", "Aquarium"] },
// // 			],
// // 			currentTickets: 3,
// // 			balance: "$45.00",
// // 			pastPurchases: [
// // 				{ item: "Stuffed Animal - Giraffe", date: "September 15, 2023", price: "$15.00" },
// // 				{ item: "Zoo Souvenir Mug", date: "August 22, 2023", price: "$8.00" },
// // 				{ item: "Safari Hat", date: "July 12, 2023", price: "$20.00" },
// // 			],
// // 		},
// // 		{
// // 			name: "Jane Doe",
// // 			email: "janedoe@example.com",
// // 			password: "mypassword456",
// // 			membership: "Silver Member",
// // 			memberSince: "June 2022",
// // 			favoriteAnimal: "Elephant",
// // 			visits: [
// // 				{ date: "October 5, 2023", activities: ["Tiger Exhibit", "Butterfly Garden"] },
// // 				{ date: "August 15, 2023", activities: ["Reptile House", "Bird Pavilion"] },
// // 			],
// // 			currentTickets: 2,
// // 			balance: "$30.00",
// // 			pastPurchases: [
// // 				{ item: "T-Shirt - Elephant", date: "October 5, 2023", price: "$12.00" },
// // 				{ item: "Zoo Keychain", date: "August 15, 2023", price: "$5.00" },
// // 			],
// // 		},
// // 	];

// // 	const [email, setEmail] = useState("");
// // 	const [password, setPassword] = useState("");
// // 	const [error, setError] = useState("");

// // 	const handleLogin = (e) => {
// // 		e.preventDefault();

// // 		// Find the user matching the email and password
// // 		const user = users.find((u) => u.email === email && u.password === password);

// // 		if (user) {
// // 			// Redirect to profile page with user data
// // 			navigate("/profile", { state: user });
// // 		} else {
// // 			// Set an error message if login fails
// // 			setError("Invalid email or password. Please try again.");
// // 		}
// // 	};

// // 	return (
// // 		<div className="h-screen flex items-center justify-center bg-gradient-to-b from-green-200 to-green-100">
// // 			<div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
// // 				{/* Back to Home Button */}
// // 				<button 
// // 					onClick={() => navigate("/")}
// // 					className="text-blue-600 hover:underline mb-4"
// // 				>
// // 					Back to home
// // 				</button>

// // 				<h1 className="text-3xl font-bold mb-4 text-center text-green-800">Welcome Back!</h1>
// // 				<p className="text-center text-gray-600 mb-4">Log in to continue your adventure!</p>
// // 				{/* <img
// // 					src="https://via.placeholder.com/150x80?text=Zoo+Image"
// // 					alt="Zoo Image"
// // 					className="mx-auto mb-4"
// // 				/> */}

// // 				{/* Error message display */}
// // 				{error && <p className="text-red-500 mb-4 text-center">{error}</p>}

// // 				{/* Login form */}
// // 				<form onSubmit={handleLogin} className="space-y-4">
// // 					<div>
// // 						<label className="block text-gray-700">Email:</label>
// // 						<input
// // 							type="email"
// // 							value={email}
// // 							onChange={(e) => setEmail(e.target.value)}
// // 							className="w-full p-3 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-green-500"
// // 							placeholder="Enter your email"
// // 							required
// // 						/>
// // 					</div>
// // 					<div>
// // 						<label className="block text-gray-700">Password:</label>
// // 						<input
// // 							type="password"
// // 							value={password}
// // 							onChange={(e) => setPassword(e.target.value)}
// // 							className="w-full p-3 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-green-500"
// // 							placeholder="Enter your password"
// // 							required
// // 						/>
// // 					</div>
// // 					<button
// // 						type="submit"
// // 						className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
// // 					>
// // 						Log In
// // 					</button>
// // 				</form>

// // 				{/* Sign-up link */}
// // 				<div className="mt-4 text-center">
// // 					<p className="text-gray-600">Don't have an account?</p>
// // 					<a href="/signup" className="text-green-600 hover:underline">Sign Up</a>
// // 				</div>
// // 			</div>
// // 		</div>
// // 	);
// // }



// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// export default function LoginPage() {
// 	const navigate = useNavigate();

// 	// State variables for users, email, password, and error message
// 	const [users, setUsers] = useState([]);
// 	const [email, setEmail] = useState("");
// 	const [password, setPassword] = useState("");
// 	const [error, setError] = useState("");
// 	const [isLoading, setIsLoading] = useState(true);

// 	// Fetch users data from an API
// 	useEffect(() => {
// 		async function fetchUsers() {
// 			try {
// 				const res = await fetch(`${import.meta.env.VITE_API_URL}/users`);
// 				setIsLoading(false);

// 				if (!res.ok) {
// 					throw new Error("Failed to fetch user data");
// 				}

// 				const data = await res.json();
// 				setUsers(data.users); // Assuming the API response is structured as { users: [...] }
// 			} catch (error) {
// 				console.error(error);
// 				setError("Unable to load users data. Please try again later.");
// 			}
// 		}

// 		fetchUsers();
// 	}, []);

// 	const handleLogin = (e) => {
// 		e.preventDefault();

// 		// Find the user matching the email and password
// 		const user = users.find((u) => u.email === email && u.password === password);

// 		if (user) {
// 			// Redirect to profile page with user data
// 			navigate("/profile", { state: user });
// 		} else {
// 			// Set an error message if login fails
// 			setError("Invalid email or password. Please try again.");
// 		}
// 	};

// 	if (isLoading) {
// 		return <p>Loading...</p>;
// 	}

// 	return (
// 		<div className="h-screen flex items-center justify-center bg-gradient-to-b from-green-200 to-green-100">
// 			<div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
// 				{/* Back to Home Button */}
// 				<button 
// 					onClick={() => navigate("/")}
// 					className="text-blue-600 hover:underline mb-4"
// 				>
// 					Back to home
// 				</button>

// 				<h1 className="text-3xl font-bold mb-4 text-center text-green-800">Welcome Back!</h1>
// 				<p className="text-center text-gray-600 mb-4">Log in to continue your adventure!</p>

// 				{/* Error message display */}
// 				{error && <p className="text-red-500 mb-4 text-center">{error}</p>}

// 				{/* Login form */}
// 				<form onSubmit={handleLogin} className="space-y-4">
// 					<div>
// 						<label className="block text-gray-700">Email:</label>
// 						<input
// 							type="email"
// 							value={email}
// 							onChange={(e) => setEmail(e.target.value)}
// 							className="w-full p-3 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-green-500"
// 							placeholder="Enter your email"
// 							required
// 						/>
// 					</div>
// 					<div>
// 						<label className="block text-gray-700">Password:</label>
// 						<input
// 							type="password"
// 							value={password}
// 							onChange={(e) => setPassword(e.target.value)}
// 							className="w-full p-3 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-green-500"
// 							placeholder="Enter your password"
// 							required
// 						/>
// 					</div>
// 					<button
// 						type="submit"
// 						className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
// 					>
// 						Log In
// 					</button>
// 				</form>

// 				{/* Sign-up link */}
// 				<div className="mt-4 text-center">
// 					<p className="text-gray-600">Don't have an account?</p>
// 					<a href="/signup" className="text-green-600 hover:underline">Sign Up</a>
// 				</div>
// 			</div>
// 		</div>
// 	);
// }



import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner"; // For showing success/error messages

export default function LoginPage() {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");

	const handleLogin = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		setError("");

		try {
			const response = await fetch(`${import.meta.env.VITE_API_URL}/member/login`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email, password }),
			});

			setIsLoading(false);

			if (!response.ok) {
				toast.error("Invalid email or password");
				setError("Invalid email or password. Please try again.");
				return;
			}

			const data = await response.json();
			console.log(data.data);

			toast.success("Login successful");
			// Pass user data to the profile page (similar to the original approach)
			navigate("/profile", { state: data });

		} catch (error) {
			setIsLoading(false);
			toast.error("An error occurred. Please try again.");
			setError("An error occurred. Please try again.");
			console.error(error);
		}
	};

	return (
		<div className="h-screen flex items-center justify-center bg-gradient-to-b from-green-200 to-green-100">
			<div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
				<button 
					onClick={() => navigate("/")}
					className="text-blue-600 hover:underline mb-4"
				>
					Back to home
				</button>

				<h1 className="text-3xl font-bold mb-4 text-center text-green-800">Welcome Back!</h1>
				<p className="text-center text-gray-600 mb-4">Log in to continue your adventure!</p>

				{error && <p className="text-red-500 mb-4 text-center">{error}</p>}

				<form onSubmit={handleLogin} className="space-y-4">
					<div>
						<label className="block text-gray-700">Email:</label>
						<input
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="w-full p-3 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-green-500"
							placeholder="Enter your email"
							required
						/>
					</div>
					<div>
						<label className="block text-gray-700">Password:</label>
						<input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="w-full p-3 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-green-500"
							placeholder="Enter your password"
							required
						/>
					</div>
					<button
						type="submit"
						className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
						disabled={isLoading}
					>
						{isLoading ? "Loading..." : "Log In"}
					</button>
				</form>

				<div className="mt-4 text-center">
					<p className="text-gray-600">Don't have an account?</p>
					<a href="/signup" className="text-green-600 hover:underline">Sign Up</a>
				</div>
			</div>
		</div>
	);
}
