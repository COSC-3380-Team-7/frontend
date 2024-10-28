export default function Ticket() { 
	const ticketOptions = [
		{
			name: "General Admission",
			description: "Access to all public exhibits and attractions.",
			price: "$20.00",
		},
		{
			name: "Children's Ticket (Ages 3-12)",
			description: "Discounted ticket for children. Free for children under 3.",
			price: "$10.00",
		},
		{
			name: "Senior Ticket (Ages 65+)",
			description: "Discounted ticket for seniors.",
			price: "$15.00",
		},
		{
			name: "Membership Pass",
			description: "Annual access with member-only perks and discounts.",
			price: "$100.00",
		},
		{
			name: "Family Pass",
			description: "Annual access for two adults and up to three children.",
			price: "$180.00",
		},
	];

	return (
		<div className="flex flex-col items-center justify-center bg-gray-100 p-6">
			<h1 className="text-2xl font-bold text-center mb-8">Tickets</h1>
			
			<div className="grid gap-6 lg:grid-cols-2">
				{ticketOptions.map((ticket, index) => (
					<div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
						<h2 className="text-xl font-semibold mb-2">{ticket.name}</h2>
						<p className="text-gray-600 mb-4">{ticket.description}</p>
						<p className="text-green-600 font-bold mb-4">{ticket.price}</p>
						<button className="bg-green-800 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
							Purchase
						</button>
					</div>
				))}
			</div>
		</div>
	);
}
