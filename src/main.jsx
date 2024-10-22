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
import CreateEmployee from "./routes/admin/department/CreateEmployee.jsx";
import EmployeeInfo from "./routes/admin/department/EmployeeInfo.jsx";
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
import TicketAdminView from "./routes/admin/ticket_pricing/TicketAdminView.jsx";
import EditEmployee from "./routes/admin/department/EditEmployee.jsx";
import EditExhibit from "./routes/admin/exhibit/EditExhibit.jsx";
import EditHabitat from "./routes/admin/exhibit/EditHabitat.jsx";
import EditAnimal from "./routes/admin/exhibit/EditAnimal.jsx";
import DepartmentAdminView from "./routes/admin/department/DepartmentAdminView.jsx";
import CreateDepartment from "./routes/admin/department/CreateDepartment.jsx";
import DepartmentInfo from "./routes/admin/department/DepartmentInfo.jsx";
import EditDepartment from "./routes/admin/department/EditDepartment.jsx";
import EditPricing from "./routes/admin/ticket_pricing/EditPricing.jsx";
import CreatePricing from "./routes/admin/ticket_pricing/CreatePricing.jsx";
import EventAdminView from "./routes/admin/event/EventAdminView.jsx";
import CreateEvent from "./routes/admin/event/CreateEvent.jsx";
import EditEvent from "./routes/admin/event/EditEvent.jsx";
import EventInfo from "./routes/admin/event/EventInfo.jsx";
// FinanceAdminView.jsx

const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route path="/" element={<Outlet />} errorElement={<NotFound />}>
				<Route index element={<App />}></Route>
				<Route path="events" element={<p>events</p>}></Route>
				<Route path="exhibits" element={<p>exhibits</p>}></Route>
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
				<Route path="department" element={<OutletWrapper />}>
					<Route index element={<DepartmentAdminView />}></Route>
					<Route path="create" element={<CreateDepartment />}></Route>
					<Route path=":department_id" element={<Outlet />}>
						<Route index element={<DepartmentInfo />}></Route>
						<Route path="edit" element={<EditDepartment />}></Route>
						<Route path="employee" element={<Outlet />}>
							<Route path="create" element={<CreateEmployee />}></Route>
							<Route path=":employee_id" element={<Outlet />}>
								<Route index element={<EmployeeInfo />}></Route>
								<Route path="edit" element={<EditEmployee />}></Route>
							</Route>
						</Route>
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

				<Route path="ticket" element={<OutletWrapper />}>
					<Route index element={<TicketAdminView />}></Route>
					<Route path="create" element={<CreatePricing />}></Route>
					<Route path=":ticket_id" element={<Outlet />}>
						<Route path="edit" element={<EditPricing />}></Route>
					</Route>
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
							<Route path="animal/:animal_id" element={<Outlet />}>
								<Route index element={<AnimalInfo />}></Route>
								<Route path="edit" element={<EditAnimal />}></Route>
							</Route>
							<Route path="animal/create" element={<CreateAnimal />}></Route>
						</Route>
					</Route>
				</Route>

				<Route path="event" element={<OutletWrapper />}>
					<Route index element={<EventAdminView />}></Route>
					<Route path="create" element={<CreateEvent />}></Route>
					<Route path=":event_id" element={<Outlet />}>
						<Route path="edit" element={<EditEvent />}></Route>
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
