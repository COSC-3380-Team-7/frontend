import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./routes/App.jsx";
import {
	createBrowserRouter,
	RouterProvider,
	createRoutesFromElements,
	Route,
	Outlet,
} from "react-router-dom";
import "./index.css";
import EmployeeLogin from "./routes/employee/EmployeeLogin.jsx";
import EmployeeValidation from "./routes/employee/EmployeeValidation.jsx";
import ManagerLogin from "./routes/manager/ManagerLogin.jsx";
import ManagerValidation from "./routes/manager/ManagerValidation.jsx";
import { Toaster } from "sonner";
import MemberLogin from "./routes/member/MemberLogin.jsx";
import AdminLogin from "./routes/admin/AdminLogin.jsx";
import Admin from "./routes/admin/Admin.jsx";
import EmployeeAdminView from "./routes/admin/EmployeeAdminView.jsx";
import CreateEmployee from "./routes/admin/CreateEmployee.jsx";
import EmployeeInfo from "./routes/admin/EmployeeInfo.jsx";
import ExhibitAdminView from "./routes/admin/ExhibitAdminView.jsx";
import ExhibitInfo from "./routes/admin/ExhibitInfo.jsx";
import CreateExhibit from "./routes/admin/CreateExhibit.jsx";
import HabitatInfo from "./routes/admin/HabitatInfo.jsx";
import CreateHabitat from "./routes/admin/CreateHabitat.jsx";
import AnimalInfo from "./routes/admin/AnimalInfo.jsx";
import CreateAnimal from "./routes/admin/CreateAnimal.jsx";
import NotFound from "./routes/NotFound.jsx";
import OutletWrapper from "./components/OutletWrapper.jsx";
import VetRecordsView from './routes/admin/VetRecordsView.jsx'

const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route path="/" element={<App />} errorElement={<NotFound />}>
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

			<Route path="/admin" element={<Admin />}>
				<Route path="employee" element={<OutletWrapper />}>
					<Route index element={<EmployeeAdminView />}></Route>
					<Route path="create" element={<CreateEmployee />}></Route>
					<Route path=":employee_id" element={<EmployeeInfo />}></Route>
				</Route>

				<Route path="vet" element={<OutletWrapper />}>
					<Route index element={<VetRecordsView />}></Route>
					{/* <Route path="create" element={<CreateEmployee />}></Route>
					<Route path=":employee_id" element={<EmployeeInfo />}></Route> */}
				</Route>

				<Route path="exhibit" element={<OutletWrapper />}>
					<Route index element={<ExhibitAdminView />}></Route>
					<Route path="create" element={<CreateExhibit />}></Route>
					<Route path=":exhibit_id" element={<Outlet />}>
						<Route index element={<ExhibitInfo />}></Route>
						<Route path="habitat/create" element={<CreateHabitat />}></Route>
						<Route path="habitat/:habitat_id" element={<Outlet />}>
							<Route index element={<HabitatInfo />}></Route>
							<Route path="animal/:animal_id" element={<AnimalInfo />}></Route>
							<Route path="animal/create" element={<CreateAnimal />}></Route>
						</Route>
					</Route>
				</Route>
				

				<Route path="vet" element={<OutletWrapper />}></Route>
				<Route path="vet/:id" element={<OutletWrapper />}></Route>
				<Route path="vet/create" element={<OutletWrapper />}></Route>

				<Route path="maintenance" element={<OutletWrapper />}></Route>
				<Route path="maintenance/:id" element={<OutletWrapper />}></Route>
				<Route path="maintenance/create" element={<OutletWrapper />}></Route>
			</Route>
		</>
	)
);

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<RouterProvider router={router} />
		<Toaster richColors position="top-right" />
	</StrictMode>
);
