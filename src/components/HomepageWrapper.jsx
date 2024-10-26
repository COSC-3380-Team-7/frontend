import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function HomepageWrapper() {
	return (
		<>
			<Navbar />
			<Outlet />
		</>
	);
}
