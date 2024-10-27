import SideBar from "@/components/admin/Sidebar";
import { Button } from "@/components/ui/button";
import { Link, Outlet } from "react-router-dom";

export default function Admin() {
	return (
		<div className="h-screen">
			<nav className="fixed w-full flex items-center justify-end h-16 px-6 bg-primaryBg z-50">
				<Button
					asChild
					variant="outline"
					className="py-1 text-xs font-semibold"
				>
					<Link to="/admin/login">Log Out</Link>
				</Button>
			</nav>
			<div className="flex">
				<SideBar />
				<div className="flex-1 min-h-custom overflow-y-auto mt-16">
					<Outlet />
				</div>
			</div>
		</div>
	);
}
