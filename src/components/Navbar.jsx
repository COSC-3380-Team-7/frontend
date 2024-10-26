import { Link } from "react-router-dom";

export default function Navbar() {
	return (
		<div className="flex items-center justify-between border-b border-b-gray-300 px-8 w-full h-16 shadow-sm">
			<div className="text-gray-800 font-semibold">
				<Link to="/">Houston Zoo</Link>
			</div>
			<ul className="flex items-center gap-6 text-gray-800 font-semibold">
				<li>
					<Link to="exhibit">Exhibits</Link>
				</li>
				<li>
					<Link to="animals">Animals</Link>
				</li>
				<li>
					<Link to="exhibit">Members</Link>
				</li>
			</ul>
		</div>
	);
}
