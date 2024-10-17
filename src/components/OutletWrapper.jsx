import { Outlet } from "react-router-dom";

export default function OutletWrapper() {
	return (
		<div className="p-12">
			<Outlet />
		</div>
	);
}
