export default function Parking() {
	return (
		<div className="min-h-screen bg-gray-100 p-8">
			<h1 className="text-4xl font-bold text-center mb-8">Parking Information</h1>

			<div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
				<h2 className="text-2xl font-semibold mb-4">Parking Lots and Locations</h2>
				<p className="text-gray-700 mb-6">
					The zoo offers multiple parking options for visitors, including on-site lots and nearby parking garages. For easy access, we recommend arriving early, especially on weekends and holidays.
				</p>

				<div className="mb-8">
					<h3 className="text-xl font-semibold mb-2">Main Parking Lot</h3>
					<p className="text-gray-700">Located at the entrance to the zoo, this lot fills up quickly during peak hours. Parking is $15 per vehicle.</p>
				</div>

				<div className="mb-8">
					<h3 className="text-xl font-semibold mb-2">Overflow Parking Garage</h3>
					<p className="text-gray-700">
						Just a short walk from the zoo entrance, the overflow garage offers additional parking for $10 per vehicle. Follow signs for the pedestrian path leading to the main entrance.
					</p>
				</div>

				<div className="mb-8">
					<h3 className="text-xl font-semibold mb-2">Accessible Parking</h3>
					<p className="text-gray-700">
						Accessible parking spaces are available near the entrance for guests with disabilities. These spaces are limited, so early arrival is recommended.
					</p>
				</div>

				<div className="bg-green-50 border-l-4 border-green-400 p-4 mb-8">
					<p className="text-green-700">
						<strong>Tip:</strong> Consider using public transportation or rideshare options on weekends and holidays to avoid parking delays.
					</p>
				</div>

				<div className="mb-8">
					<h3 className="text-xl font-semibold mb-2">Hours and Rates</h3>
					<ul className="text-gray-700 list-disc ml-5 space-y-2">
						<li><strong>Parking Hours:</strong> 8:00 AM to 8:00 PM</li>
						<li><strong>Rates:</strong> $15 for main lot, $10 for overflow garage</li>
					</ul>
				</div>

				{/* <div className="text-center">
					<button className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition duration-300">
						Plan Your Visit
					</button>
				</div> */}
			</div>
		</div>
	);
}
