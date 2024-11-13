

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

	// Destructure userData with default values
	const {
		name,
		email,
		membership,
		memberSince,
		currentTickets = 0,
		balance = 0,
		favoriteAnimal = "Unknown",
		visits = [],
		pastPurchases = [],
	} = userData;

	return (
		<div className="min-h-screen bg-gradient-to-b from-gray-200 to-gray-50 p-10 flex justify-center items-center">
			<div className="bg-white w-full max-w-4xl p-10 rounded-lg shadow-lg">
				<div className="text-center mb-10">
					<h2 className="text-3xl font-bold text-gray-800">{name}</h2>
					<p className="text-gray-600">{email}</p>
					<div className="flex justify-center space-x-4 mt-2">
						<span className="bg-yellow-300 text-yellow-800 font-semibold px-3 py-1 rounded-full text-sm">
							{membership} 🌟
						</span>
						<span className="text-sm text-gray-500">Member since {memberSince}</span>
					</div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					<div className="bg-gray-100 p-6 rounded-lg shadow-sm">
						<h3 className="text-xl font-bold text-green-600 mb-4">Account Summary</h3>
						<p><strong>Current Tickets:</strong> {currentTickets}</p>
						<p><strong>Account Balance:</strong> {balance}</p>
					</div>

					<div className="bg-gray-100 p-6 rounded-lg shadow-sm">
						<h3 className="text-xl font-bold text-green-600 mb-4">Visits</h3>
						<p><strong>Favorite Animal:</strong> {favoriteAnimal}</p>
						<ul className="mt-2">
							{visits.length > 0 ? (
								visits.map((visit, index) => (
									<li key={index} className="text-gray-700">
										<strong>{visit.date}:</strong> {visit.activities.join(", ")}
									</li>
								))
							) : (
								<p className="text-gray-500">No visits recorded.</p>
							)}
						</ul>
					</div>

					<div className="md:col-span-2 bg-gray-100 p-6 rounded-lg shadow-sm">
						<h3 className="text-xl font-bold text-green-600 mb-4">Past Purchases</h3>
						<ul>
							{pastPurchases.length > 0 ? (
								pastPurchases.map((purchase, index) => (
									<li key={index} className="flex justify-between text-gray-700 mb-2">
										<span>{purchase.item} - {purchase.date}</span>
										<span>{purchase.price}</span>
									</li>
								))
							) : (
								<p className="text-gray-500">No past purchases recorded.</p>
							)}
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


// import { useLocation, useNavigate } from "react-router-dom";
// import { useEffect } from "react";

// export default function UserProfile() {
// 	const navigate = useNavigate();
// 	const location = useLocation();
// 	const userData = location.state; // Access user data passed from LoginPage

// 	// Log user data to the console
// 	useEffect(() => {
// 		if (userData) {
// 			console.log("User Data:", userData);
// 		} else {
// 			console.log("User data not found.");
// 		}
// 	}, [userData]);

// 	// Redirect or display an error if userData is not available
// 	if (!userData) {
// 		return (
// 			<div className="min-h-screen flex items-center justify-center">
// 				<p>User data not found. Please log in again.</p>
// 				<button 
// 					onClick={() => navigate("/member/login")} 
// 					className="ml-4 bg-blue-500 text-white px-4 py-2 rounded"
// 				>
// 					Go to Login
// 				</button>
// 			</div>
// 		);
// 	}

// 	return (
// 		<div className="min-h-screen flex items-center justify-center">
// 			<p>Check the console for user data.</p>
// 		</div>
// 	);
// }
