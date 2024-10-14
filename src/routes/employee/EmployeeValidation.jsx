import { Outlet } from "react-router-dom";
import { useEmployeeStore } from "@/state_management/employeeStore";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "sonner";

export default function EmployeeValidation() {
	const navigate = useNavigate();
	const { loggedIn } = useEmployeeStore();

	useEffect(() => {
		console.log("Employee Validation");
		toast.info("Employee Validation");
		if (!loggedIn) {
			navigate("/employee/login");
		}
	}, [loggedIn, navigate]);

	return (
		<>
			Employee
			<Outlet />
		</>
	);
}
