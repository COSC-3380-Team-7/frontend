import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useManagerStore } from "@/state_management/managerStore";

export default function ManagerValidation() {
	const navigate = useNavigate();
	const { loggedIn } = useManagerStore();

	useEffect(() => {
		if (!loggedIn) {
			navigate("/manager/login");
		}
	}, [loggedIn, navigate]);

	return (
		<div>
			Manager
			<Outlet />
		</div>
	);
}
