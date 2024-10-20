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
import EmployeeAdminView from "./routes/admin/employee/EmployeeAdminView.jsx";
import CreateEmployee from "./routes/admin/employee/CreateEmployee.jsx";
import EmployeeInfo from "./routes/admin/employee/EmployeeInfo.jsx";
import ExhibitAdminView from "./routes/admin/exhibit/ExhibitAdminView.jsx";
import ExhibitInfo from "./routes/admin/exhibit/ExhibitInfo.jsx";
import CreateExhibit from "./routes/admin/exhibit/CreateExhibit.jsx";
import HabitatInfo from "./routes/admin/exhibit/HabitatInfo.jsx";
import CreateHabitat from "./routes/admin/exhibit/CreateHabitat.jsx";
import AnimalInfo from "./routes/admin/exhibit/AnimalInfo.jsx";
import CreateAnimal from "./routes/admin/exhibit/CreateAnimal.jsx";
import NotFound from "./routes/NotFound.jsx";
import OutletWrapper from "./components/OutletWrapper.jsx";
import VetRecordsView from "./routes/admin/VetRecordsView.jsx";
import MaintenanceAdminView from "./routes/admin/MaintenanceAdminView.jsx";
import FinanceAdminView from "./routes/admin/FinanceAdminView.jsx";
import TicketAdminView from "./routes/admin/TicketAdminView.jsx";
import EditEmployee from "./routes/admin/employee/EditEmployee.jsx";
import EditExhibit from "./routes/admin/exhibit/EditExhibit.jsx";
import EditHabitat from "./routes/admin/exhibit/EditHabitat.jsx";
// FinanceAdminView.jsx

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
					<Route path=":employee_id" element={<Outlet />}>
						<Route index element={<EmployeeInfo />}></Route>
						<Route path="edit" element={<EditEmployee />}></Route>
					</Route>
				</Route>

				<Route path="vet" element={<OutletWrapper />}>
					<Route index element={<VetRecordsView />}></Route>
					{/* <Route path="create" element={<CreateEmployee />}></Route>
					<Route path=":employee_id" element={<EmployeeInfo />}></Route> */}
				</Route>
				<Route path="maintenance" element={<OutletWrapper />}>
					<Route index element={<MaintenanceAdminView />}></Route>
					{/* <Route path="create" element={<CreateEmployee />}></Route>
					<Route path=":employee_id" element={<EmployeeInfo />}></Route> */}
				</Route>
				<Route path="finance" element={<OutletWrapper />}>
					<Route index element={<FinanceAdminView />}></Route>
					{/* <Route path="create" element={<CreateEmployee />}></Route>
					<Route path=":employee_id" element={<EmployeeInfo />}></Route> */}
				</Route>
				<Route path="ticket_pricing" element={<OutletWrapper />}>
					<Route index element={<TicketAdminView />}></Route>
					{/* <Route path="create" element={<CreateEmployee />}></Route>
					<Route path=":employee_id" element={<EmployeeInfo />}></Route> */}
				</Route>

				<Route path="exhibit" element={<OutletWrapper />}>
					<Route index element={<ExhibitAdminView />}></Route>
					<Route path="create" element={<CreateExhibit />}></Route>
					<Route path=":exhibit_id" element={<Outlet />}>
						<Route index element={<ExhibitInfo />}></Route>
						<Route path="edit" element={<EditExhibit />}></Route>
						<Route path="habitat/create" element={<CreateHabitat />}></Route>
						<Route path="habitat/:habitat_id" element={<Outlet />}>
							<Route index element={<HabitatInfo />}></Route>
							<Route path="edit" element={<EditHabitat />}></Route>
							<Route path="animal/:animal_id" element={<AnimalInfo />}></Route>
							<Route path="animal/create" element={<CreateAnimal />}></Route>
						</Route>
					</Route>
				</Route>

				<Route path="vet" element={<OutletWrapper />}></Route>
				<Route path="vet/:id" element={<OutletWrapper />}></Route>
				<Route path="vet/create" element={<OutletWrapper />}></Route>

				<Route path="finance" element={<OutletWrapper />}></Route>

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
