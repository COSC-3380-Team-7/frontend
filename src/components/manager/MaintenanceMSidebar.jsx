import { Link, useLocation } from "react-router-dom";
import { HammerIcon, PawPrint, PencilRuler, User } from "lucide-react";

export default function MaintenanceMSidebar() {
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
			href: "/manager/maintenance/employee",
			icon: <User className="h-6 w-6 mr-1" />,
			name: "Supervised Employees",
		},
		{
			href: "/manager/maintenance/exhibit",
			icon: <PawPrint className="h-6 w-6 mr-1" />,
			name: "Exhibits",
		},
		{
			href: "/manager/maintenance/maintenance_report",
			icon: <HammerIcon className="h-6 w-6 mr-1" />,
			name: "Maintenance Reports",
		},
		{
			href: "/manager/maintenance/search",
			icon: <PencilRuler className="h-6 w-6 mr-1" />,
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
