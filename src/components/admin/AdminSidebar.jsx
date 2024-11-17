import { Link, useLocation } from "react-router-dom";
import {
	BuildingIcon,
	CalendarDays,
	ChartColumnIncreasing,
	PawPrint,
	TicketsIcon,
} from "lucide-react";

export default function AdminSidebar() {
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
			href: "/admin/department",
			icon: <BuildingIcon className="h-6 w-6 mr-1" />,
			name: "Departments",
		},
		{
			href: "/admin/exhibit",
			icon: <PawPrint className="h-6 w-6 mr-1" />,
			name: "Exhibits",
		},
		{
			href: "/admin/event",
			icon: <CalendarDays className="h-6 w-6 mr-1" />,
			name: "Events",
		},
		{
			href: "/admin/finance",
			icon: <ChartColumnIncreasing className="h-6 w-6 mr-1" />,
			name: "Reports",
		},
		{
			href: "/admin/ticket",
			icon: <TicketsIcon className="h-6 w-6 mr-1" />,
			name: "Ticket Pricing",
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
