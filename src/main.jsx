import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./routes/App.jsx";
import {
	createBrowserRouter,
	RouterProvider,
	createRoutesFromElements,
	Route,
} from "react-router-dom";
import "./index.css";
import EmployeeLogin from "./routes/EmployeeLogin.jsx";
import EmployeeValidation from "./routes/EmployeeValidation.jsx";
import ManagerLogin from "./routes/ManagerLogin.jsx";
import ManagerValidation from "./routes/ManagerValidation.jsx";
import { Toaster } from "sonner";
import MemberLogin from "./routes/MemberLogin.jsx";
import AdminLogin from "./routes/AdminLogin.jsx";

const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route path="/" element={<App />} errorElement={<div>404 Not Found</div>}>
				<Route path="events" element={<p>events</p>}></Route>
			</Route>
			<Route path="/member/login" element={<MemberLogin />}></Route>
			<Route path="/employee/login" element={<EmployeeLogin />}></Route>
			<Route path="/employee" element={<EmployeeValidation />}>
				<Route path="vet" element={<p>vet</p>}></Route>
			</Route>
			<Route path="/employee" element={<EmployeeValidation />}>
				<Route path="maintenance" element={<p>maintenance</p>}></Route>
			</Route>
			<Route path="/employee" element={<EmployeeValidation />}>
				<Route path="zookeeper" element={<p>zookeeper</p>}></Route>
			</Route>
			<Route path="/manager/login" element={<ManagerLogin />}></Route>
			<Route path="/manager" element={<ManagerValidation />}>
				<Route path="vet" element={<p>vet</p>}></Route>
			</Route>
			<Route path="/manager" element={<ManagerValidation />}>
				<Route path="maintenance" element={<p>maintenance</p>}></Route>
			</Route>
			<Route path="/manager" element={<ManagerValidation />}>
				<Route path="zookeeper" element={<p>zookeeper</p>}></Route>
			</Route>
			<Route path="/admin/login" element={<AdminLogin />}></Route>
			<Route path="/admin" element={<ManagerLogin />}></Route>
		</>
	)
);

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<RouterProvider router={router} />
		<Toaster richColors position="top-right" />
	</StrictMode>
);
