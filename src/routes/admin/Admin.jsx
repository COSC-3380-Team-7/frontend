import AdminSidebar from "@/components/admin/AdminSidebar";
import { Button } from "@/components/ui/button";
import { Outlet } from "react-router-dom";
import { useAdminStore } from "@/state_management/adminStore";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useEffect } from "react";

export default function Admin() {
	const { isLoggedIn, employee_id, clearState } = useAdminStore();
	const navigate = useNavigate();

	useEffect(() => {
		if (!isLoggedIn && !employee_id) {
			navigate("/admin/login");
		}
	}, [isLoggedIn, employee_id, navigate]);

	return (
		<div className="h-screen">
			<nav className="fixed w-full flex items-center justify-end h-16 px-6 bg-primaryBg z-50">
				<Button
					onClick={() => {
						clearState();
						navigate("/admin/login");
						toast.success("You have been logged out");
					}}
					variant="outline"
					className="py-1 text-xs font-semibold"
				>
					Log Out
				</Button>
			</nav>
			<div className="flex">
				<AdminSidebar />
				<div className="flex-1 min-h-custom overflow-y-auto mt-16">
					<Outlet />
				</div>
			</div>
		</div>
	);
}
