export default function MembershipPage() {
	return (
        <div>
<li><a href="/" className="hover:underline">back to home </a></li>

		<div className="h-screen bg-green-50 flex items-center justify-center">

			<div className="w-full max-w-4xl p-6">
				<h1 className="text-3xl font-bold text-center mb-6">Zoo Membership Types</h1>

				<div className="space-y-4">
					{/* Basic Membership */}
					<div className="p-4 bg-white rounded-lg shadow-md">
						<h2 className="text-2xl font-semibold mb-2">Basic Membership</h2>
						<p className="text-gray-700 mb-4">
							Enjoy unlimited visits for one adult and access to special events throughout the year.
						</p>
						<ul className="list-disc list-inside mb-4">
							<li>Free admission for one adult</li>
							<li>Invitations to member-only events</li>
							<li>10% discount at the gift shop</li>
						</ul>
						<button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
							Select Membership
						</button>
					</div>

					{/* Family Membership */}
					<div className="p-4 bg-white rounded-lg shadow-md">
						<h2 className="text-2xl font-semibold mb-2">Family Membership</h2>
						<p className="text-gray-700 mb-4">
							Perfect for families! Unlimited visits for two adults and up to three children.
						</p>
						<ul className="list-disc list-inside mb-4">
							<li>Free admission for two adults and three children</li>
							<li>Invitations to member-only events</li>
							<li>15% discount at the gift shop and cafes</li>
							<li>Early access to new exhibits</li>
						</ul>
						<button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
							Select Membership
						</button>
					</div>

					{/* Premium Membership */}
					<div className="p-4 bg-white rounded-lg shadow-md">
						<h2 className="text-2xl font-semibold mb-2">Premium Membership</h2>
						<p className="text-gray-700 mb-4">
							All-access membership with special perks, behind-the-scenes tours, and exclusive events.
						</p>
						<ul className="list-disc list-inside mb-4">
							<li>Free admission for the whole family and two guests</li>
							<li>Behind-the-scenes tours and VIP events</li>
							<li>20% discount at the gift shop and cafes</li>
							<li>Exclusive animal meet-and-greet opportunities</li>
						</ul>
						<button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
							Select Membership
						</button>
					</div>
				</div>
			</div>
		</div>

        </div>
	);
}
