import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useEmployeeStore } from "@/state_management/employeeStore";
import VetESidebar from "@/components/employee/VetESidebar";

export default function VetEmployee() {
	const navigate = useNavigate();
	const { loggedIn, clearState } = useEmployeeStore();

	useEffect(() => {
		if (!loggedIn) {
			navigate("/employee/login");
		}
	}, [loggedIn, navigate]);

	return (
		<div className="h-screen">
			<nav className="fixed w-full flex items-center justify-end h-16 px-6 bg-primaryBg z-50">
				<Button
					onClick={() => {
						clearState();
						navigate("/employee/login");
						toast.success("You have been logged out");
					}}
					variant="outline"
					className="py-1 text-xs font-semibold"
				>
					Log Out
				</Button>
			</nav>
			<div className="flex">
				<VetESidebar />
				<div className="flex-1 min-h-custom overflow-y-auto mt-16">
					<Outlet />
				</div>
			</div>
		</div>
	);
}
