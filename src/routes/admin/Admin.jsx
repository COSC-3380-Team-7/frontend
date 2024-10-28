import SideBar from "@/components/admin/Sidebar";
import { Outlet } from "react-router-dom";

export default function Admin() {
	return (
		<div className="h-screen">
			<nav className="fixed w-full h-16 bg-primaryBg z-50"></nav>
			<div className="flex">
				<SideBar />
				<div className="flex-1 min-h-custom overflow-y-auto mt-16">
					<Outlet />
				</div>
			</div>
		</div>
	);
}
