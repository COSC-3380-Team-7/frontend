export default function Map() {
	return (
		<div className="min-h-screen bg-gray-100 p-8">
			<h1 className="text-4xl font-bold text-center mb-8">Zoo Map</h1>
			<p className="text-center text-lg mb-6">
				Explore the Houston Zoo with our interactive map! Discover all the exhibits, attractions, and facilities we have to offer.
			</p>

			<div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
				<img
					src="https://s28164.pcdn.co/files/ZooBoo2024_GateMap_Web_Page.png" // Replace with the actual map image URL
					alt="Houston Zoo Map"
					className="w-full h-auto"
				/>
			</div>

			<div className="mt-6 text-center">
				<h2 className="text-2xl font-semibold">Key Areas</h2>
				<ul className="list-disc list-inside text-lg mt-4">
					<li>Exhibits: African Forest, Kipp Aquarium, Reptile House</li>
					<li>Attractions: Children’s Zoo, Gift Shops, Restaurants</li>
					<li>Rest Areas: Picnic Areas, Playgrounds</li>
				</ul>
			</div>
		</div>
	);
}
