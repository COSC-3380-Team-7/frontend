
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function LoginPage() {
// 	const navigate = useNavigate();

// 	// Sample data array for users
// 	const users = [
// 		{
// 			name: "John Doe",
// 			email: "johndoe@example.com",
// 			password: "password123",
// 			membership: "Gold Member",
// 			memberSince: "April 2023",
// 			favoriteAnimal: "Giraffe",
// 			visits: [
// 				{ date: "September 15, 2023", activities: ["Lion Show", "Reptile House"] },
// 				{ date: "August 22, 2023", activities: ["Bird Pavilion", "Elephant Walk"] },
// 				{ date: "July 12, 2023", activities: ["Penguin Parade", "Aquarium"] },
// 			],
// 			currentTickets: 3,
// 			balance: "$45.00",
// 			pastPurchases: [
// 				{ item: "Stuffed Animal - Giraffe", date: "September 15, 2023", price: "$15.00" },
// 				{ item: "Zoo Souvenir Mug", date: "August 22, 2023", price: "$8.00" },
// 				{ item: "Safari Hat", date: "July 12, 2023", price: "$20.00" },
// 			],
// 		},
// 		{
// 			name: "Jane Doe",
// 			email: "janedoe@example.com",
// 			password: "mypassword456",
// 			membership: "Silver Member",
// 			memberSince: "June 2022",
// 			favoriteAnimal: "Elephant",
// 			visits: [
// 				{ date: "October 5, 2023", activities: ["Tiger Exhibit", "Butterfly Garden"] },
// 				{ date: "August 15, 2023", activities: ["Reptile House", "Bird Pavilion"] },
// 			],
// 			currentTickets: 2,
// 			balance: "$30.00",
// 			pastPurchases: [
// 				{ item: "T-Shirt - Elephant", date: "October 5, 2023", price: "$12.00" },
// 				{ item: "Zoo Keychain", date: "August 15, 2023", price: "$5.00" },
// 			],
// 		},
// 	];

// 	const [email, setEmail] = useState("");
// 	const [password, setPassword] = useState("");
// 	const [error, setError] = useState("");

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

// 	return (
// 		<div className="h-screen flex items-center justify-center bg-gray-100">
// 			<div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
// 				<h1 className="text-2xl font-bold mb-4">Log In</h1>

// 				{error && <p className="text-red-500 mb-4">{error}</p>}

// 				<form onSubmit={handleLogin}>
// 					<div className="mb-4">
// 						<label className="block text-gray-700">Email:</label>
// 						<input
// 							type="email"
// 							value={email}
// 							onChange={(e) => setEmail(e.target.value)}
// 							className="w-full p-2 border border-gray-300 rounded mt-1"
// 							placeholder="Enter your email"
// 							required
// 						/>
// 					</div>
// 					<div className="mb-4">
// 						<label className="block text-gray-700">Password:</label>
// 						<input
// 							type="password"
// 							value={password}
// 							onChange={(e) => setPassword(e.target.value)}
// 							className="w-full p-2 border border-gray-300 rounded mt-1"
// 							placeholder="Enter your password"
// 							required
// 						/>
// 					</div>
// 					<button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
// 						Log In
// 					</button>

//                     <li><a href="/signup" className="hover:underline">Sign Up</a></li>
// 				</form>
// 			</div>
// 		</div>
// 	);
// }
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
	const navigate = useNavigate();

	// Sample data array for users
	const users = [
		{
			name: "John Doe",
			email: "johndoe@example.com",
			password: "password123",
			membership: "Gold Member",
			memberSince: "April 2023",
			favoriteAnimal: "Giraffe",
			visits: [
				{ date: "September 15, 2023", activities: ["Lion Show", "Reptile House"] },
				{ date: "August 22, 2023", activities: ["Bird Pavilion", "Elephant Walk"] },
				{ date: "July 12, 2023", activities: ["Penguin Parade", "Aquarium"] },
			],
			currentTickets: 3,
			balance: "$45.00",
			pastPurchases: [
				{ item: "Stuffed Animal - Giraffe", date: "September 15, 2023", price: "$15.00" },
				{ item: "Zoo Souvenir Mug", date: "August 22, 2023", price: "$8.00" },
				{ item: "Safari Hat", date: "July 12, 2023", price: "$20.00" },
			],
		},
		{
			name: "Jane Doe",
			email: "janedoe@example.com",
			password: "mypassword456",
			membership: "Silver Member",
			memberSince: "June 2022",
			favoriteAnimal: "Elephant",
			visits: [
				{ date: "October 5, 2023", activities: ["Tiger Exhibit", "Butterfly Garden"] },
				{ date: "August 15, 2023", activities: ["Reptile House", "Bird Pavilion"] },
			],
			currentTickets: 2,
			balance: "$30.00",
			pastPurchases: [
				{ item: "T-Shirt - Elephant", date: "October 5, 2023", price: "$12.00" },
				{ item: "Zoo Keychain", date: "August 15, 2023", price: "$5.00" },
			],
		},
	];

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const handleLogin = (e) => {
		e.preventDefault();

		// Find the user matching the email and password
		const user = users.find((u) => u.email === email && u.password === password);

		if (user) {
			// Redirect to profile page with user data
			navigate("/profile", { state: user });
		} else {
			// Set an error message if login fails
			setError("Invalid email or password. Please try again.");
		}
	};

	return (
		<div className="h-screen flex items-center justify-center bg-gradient-to-b from-green-200 to-green-100">
			<div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
				{/* Back to Home Button */}
				<button 
					onClick={() => navigate("/")}
					className="text-blue-600 hover:underline mb-4"
				>
					Back to home
				</button>

				<h1 className="text-3xl font-bold mb-4 text-center text-green-800">Welcome Back!</h1>
				<p className="text-center text-gray-600 mb-4">Log in to continue your adventure!</p>
				{/* <img
					src="https://via.placeholder.com/150x80?text=Zoo+Image"
					alt="Zoo Image"
					className="mx-auto mb-4"
				/> */}

				{/* Error message display */}
				{error && <p className="text-red-500 mb-4 text-center">{error}</p>}

				{/* Login form */}
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
					>
						Log In
					</button>
				</form>

				{/* Sign-up link */}
				<div className="mt-4 text-center">
					<p className="text-gray-600">Don't have an account?</p>
					<a href="/signup" className="text-green-600 hover:underline">Sign Up</a>
				</div>
			</div>
		</div>
	);
}
