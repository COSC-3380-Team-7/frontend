import { Link, useLocation } from "react-router-dom";
import { HeartPulseIcon, PawPrint, PillBottle, User } from "lucide-react";

export default function VetMSidebar() {
	const location = useLocation();

	function isActiveLink(link, pathname, mainDirectory) {
		if (link === pathname && pathname === mainDirectory) {
			return true;
		} else if (pathname.includes(link) && link !== mainDirectory) {
			return true;
		} else {
			return false;
		}
	}

	const navLinks = [
		{
			href: "/manager/vet/employee",
			icon: <User className="h-6 w-6 mr-1" />,
			name: "Supervised Employees",
		},
		{
			href: "/manager/vet/exhibit",
			icon: <PawPrint className="h-6 w-6 mr-1" />,
			name: "Exhibits",
		},
		{
			href: "/manager/vet/vet_report",
			icon: <HeartPulseIcon className="h-6 w-6 mr-1" />,
			name: "Veterinarian Reports",
		},
		{
			href: "/manager/vet/search",
			icon: <PillBottle className="h-6 w-6 mr-1" />,
			name: "Create Report",
		},
	];

	return (
		<div className="w-60 min-w-60 min-h-custom">
			<div className="pr-6 py-6 mt-16 fixed top-0 h-screen w-60 min-w-60 border-r border-r-gray-300">
				<ul className="flex flex-col gap-3 transition-all text-sm">
					{navLinks.map((link, index) => {
						return (
							<li key={index}>
								<Link
									to={link.href}
									className={` ${
										isActiveLink(link.href, location.pathname, "/admin")
											? "border-l-4 border-l-primaryBorder text-gray-900 rounded-l-none"
											: "border-l-4 border-l-transparent text-gray-700"
									} flex gap-2 items-center hover:text-gray-900 hover:bg-gray-100 pl-6 p-2 rounded-md`}
								>
									{link.icon}
									<p className="font-semibold text-sm">{link.name}</p>
								</Link>
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
}
