
// export default function UserProfile() {
// 	// Simulated data for multiple users
// 	const usersData = [
// 		{
// 			id: 1,
// 			name: "John Doe",
// 			email: "johndoe@example.com",
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
// 			id: 2,
// 			name: "Jane Smith",
// 			email: "janesmith@example.com",
// 			membership: "Silver Member",
// 			memberSince: "May 2022",
// 			favoriteAnimal: "Elephant",
// 			visits: [
// 				{ date: "October 1, 2023", activities: ["Elephant Walk", "Monkey Forest"] },
// 				{ date: "September 10, 2023", activities: ["Reptile House", "Giraffe Feeding"] },
// 			],
// 			currentTickets: 2,
// 			balance: "$30.00",
// 			pastPurchases: [
// 				{ item: "Elephant Plush Toy", date: "October 1, 2023", price: "$20.00" },
// 			],
// 		},
// 	];

// 	// Simulated current user ID (in practice, this would come from user authentication state)
// 	const currentUserId = 1;

// 	// Find the current user based on user ID
// 	const userData = usersData.find(user => user.id === currentUserId);

// 	if (!userData) {
// 		return <p>User not found</p>;
// 	}

// 	return (
// 		<div className="min-h-screen bg-gradient-to-b from-gray-200 to-gray-50 p-10 flex justify-center items-center">
// 			<div className="bg-white w-full max-w-4xl p-10 rounded-lg shadow-lg">
// 				<div className="text-center mb-10">
// 					<h2 className="text-3xl font-bold text-gray-800">{userData.name}</h2>
// 					<p className="text-gray-600">{userData.email}</p>
// 					<div className="flex justify-center space-x-4 mt-2">
// 						<span className="bg-yellow-300 text-yellow-800 font-semibold px-3 py-1 rounded-full text-sm">
// 							{userData.membership} 🌟
// 						</span>
// 						<span className="text-sm text-gray-500">Member since {userData.memberSince}</span>
// 					</div>
// 				</div>

// 				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
// 					<div className="bg-gray-100 p-6 rounded-lg shadow-sm">
// 						<h3 className="text-xl font-bold text-green-600 mb-4">Account Summary</h3>
// 						<p><strong>Current Tickets:</strong> {userData.currentTickets}</p>
// 						<p><strong>Account Balance:</strong> {userData.balance}</p>
// 					</div>

// 					<div className="bg-gray-100 p-6 rounded-lg shadow-sm">
// 						<h3 className="text-xl font-bold text-green-600 mb-4">Visits</h3>
// 						<p><strong>Favorite Animal:</strong> {userData.favoriteAnimal}</p>
// 						<ul className="mt-2">
// 							{userData.visits.map((visit, index) => (
// 								<li key={index} className="text-gray-700">
// 									<strong>{visit.date}:</strong> {visit.activities.join(", ")}
// 								</li>
// 							))}
// 						</ul>
// 					</div>

// 					<div className="md:col-span-2 bg-gray-100 p-6 rounded-lg shadow-sm">
// 						<h3 className="text-xl font-bold text-green-600 mb-4">Past Purchases</h3>
// 						<ul>
// 							{userData.pastPurchases.map((purchase, index) => (
// 								<li key={index} className="flex justify-between text-gray-700 mb-2">
// 									<span>{purchase.item} - {purchase.date}</span>
// 									<span>{purchase.price}</span>
// 								</li>
// 							))}
// 						</ul>
// 					</div>
// 				</div>

// 				<div className="flex justify-center mt-10 space-x-4">
// 					<button className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition">
// 						Edit Profile
// 					</button>
// 					<button className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition">
// 						Log Out
// 					</button>
// 				</div>
// 			</div>
// 		</div>
// 	);
// }
import { useLocation, useNavigate } from "react-router-dom";

export default function UserProfile() {
	const navigate = useNavigate();
	const location = useLocation();
	const userData = location.state; // Access user data passed from LoginPage

	// Redirect or display an error if userData is not available
	if (!userData) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<p>User data not found. Please log in again.</p>
				<button 
					onClick={() => navigate("/member/login")} 
					className="ml-4 bg-blue-500 text-white px-4 py-2 rounded"
				>
					Go to Login
				</button>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gradient-to-b from-gray-200 to-gray-50 p-10 flex justify-center items-center">
			<div className="bg-white w-full max-w-4xl p-10 rounded-lg shadow-lg">
				<div className="text-center mb-10">
					<h2 className="text-3xl font-bold text-gray-800">{userData.name}</h2>
					<p className="text-gray-600">{userData.email}</p>
					<div className="flex justify-center space-x-4 mt-2">
						<span className="bg-yellow-300 text-yellow-800 font-semibold px-3 py-1 rounded-full text-sm">
							{userData.membership} 🌟
						</span>
						<span className="text-sm text-gray-500">Member since {userData.memberSince}</span>
					</div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					<div className="bg-gray-100 p-6 rounded-lg shadow-sm">
						<h3 className="text-xl font-bold text-green-600 mb-4">Account Summary</h3>
						<p><strong>Current Tickets:</strong> {userData.currentTickets}</p>
						<p><strong>Account Balance:</strong> {userData.balance}</p>
					</div>

					<div className="bg-gray-100 p-6 rounded-lg shadow-sm">
						<h3 className="text-xl font-bold text-green-600 mb-4">Visits</h3>
						<p><strong>Favorite Animal:</strong> {userData.favoriteAnimal}</p>
						<ul className="mt-2">
							{userData.visits.map((visit, index) => (
								<li key={index} className="text-gray-700">
									<strong>{visit.date}:</strong> {visit.activities.join(", ")}
								</li>
							))}
						</ul>
					</div>

					<div className="md:col-span-2 bg-gray-100 p-6 rounded-lg shadow-sm">
						<h3 className="text-xl font-bold text-green-600 mb-4">Past Purchases</h3>
						<ul>
							{userData.pastPurchases.map((purchase, index) => (
								<li key={index} className="flex justify-between text-gray-700 mb-2">
									<span>{purchase.item} - {purchase.date}</span>
									<span>{purchase.price}</span>
								</li>
							))}
						</ul>
					</div>
				</div>

				<div className="flex justify-center mt-10 space-x-4">
					<button className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition">
						Edit Profile
					</button>
					<button 
						onClick={() => navigate("/login")} 
						className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition"
					>
						Log Out
					</button>
				</div>
			</div>
		</div>
	);
}
