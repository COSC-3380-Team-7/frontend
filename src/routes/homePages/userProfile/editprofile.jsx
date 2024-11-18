import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner"; // For showing success/error messages

export default function EditProfile() {
	const navigate = useNavigate();
	const location = useLocation();
	const userData = location.state; // Access user data passed from UserProfile

	console.log(userData);

	// Redirect to login if no user data is available
	if (!userData) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<p>User data not found. Please log in again.</p>
				<button
					onClick={() => navigate("/login")}
					className="ml-4 bg-blue-500 text-white px-4 py-2 rounded"
				>
					Go to Login
				</button>
			</div>
		);
	}

	// Extract visitor ID and initialize state for editable fields
	const visitorId = userData.data.visitor_id;
	const [firstName, setFirstName] = useState(userData.data.first_name || "");
	const [lastName, setLastName] = useState(userData.data.last_name || "");
	const [middleInitial, setMiddleInitial] = useState(
		userData.data.middle_initial || ""
	);
	const [isLoading, setIsLoading] = useState(false);

	const handleSave = async (e) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			const response = await fetch(
				`${import.meta.env.VITE_API_URL}/public/profile/${visitorId}`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						first_name: firstName,
						last_name: lastName,
						middle_initial: middleInitial,
					}),
				}
			);

			if (!response.ok) {
				throw new Error("Failed to update profile");
			}

			const updatedData = {
				...userData,
				data: {
					...userData.data,
					first_name: firstName,
					last_name: lastName,
					middle_initial: middleInitial,
				},
			};

			// Update localStorage
			localStorage.setItem("user", JSON.stringify(updatedData));

			// Pass updated data back to UserProfile
			navigate("/profile", { state: updatedData });
		} catch (error) {
			console.error(error);
			toast.error("An error occurred. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-b from-gray-200 to-gray-50 p-10 flex justify-center items-center">
			<div className="bg-white w-full max-w-lg p-8 rounded-lg shadow-lg">
				<h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
					Edit Profile
				</h2>
				<form onSubmit={handleSave} className="space-y-6">
					<div>
						<label className="block text-gray-700">First Name:</label>
						<input
							type="text"
							value={firstName}
							onChange={(e) => setFirstName(e.target.value)}
							className="w-full p-3 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
							required
						/>
					</div>
					<div>
						<label className="block text-gray-700">Last Name:</label>
						<input
							type="text"
							value={lastName}
							onChange={(e) => setLastName(e.target.value)}
							className="w-full p-3 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
							required
						/>
					</div>
					<div>
						<label className="block text-gray-700">Middle Initial:</label>
						<input
							type="text"
							value={middleInitial}
							onChange={(e) => setMiddleInitial(e.target.value)}
							className="w-full p-3 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
							maxLength="1"
						/>
					</div>
					<div className="flex justify-end space-x-4">
						<button
							type="button"
							onClick={() => navigate("/profile", { state: userData })}
							className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 transition"
						>
							Cancel
						</button>
						<button
							type="submit"
							className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
							disabled={isLoading}
						>
							{isLoading ? "Saving..." : "Save"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
