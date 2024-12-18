import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useManagerStore } from "@/state_management/managerStore";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import MaintenanceMSidebar from "@/components/manager/MaintenanceMSidebar";

export default function MaintenanceManager() {
	const navigate = useNavigate();
	const { loggedIn, clearState } = useManagerStore();

	useEffect(() => {
		if (!loggedIn) {
			navigate("/manager/login");
		}
	}, [loggedIn, navigate]);

	return (
		<div className="h-screen">
			<nav className="fixed w-full flex items-center justify-end h-16 px-6 bg-primaryBg z-50">
				<Button
					onClick={() => {
						clearState();
						navigate("/manager/login");
						toast.success("You have been logged out");
					}}
					variant="outline"
					className="py-1 text-xs font-semibold"
				>
					Log Out
				</Button>
			</nav>
			<div className="flex">
				<MaintenanceMSidebar />
				<div className="flex-1 min-h-custom overflow-y-auto mt-16">
					<Outlet />
				</div>
			</div>
		</div>
	);
}
