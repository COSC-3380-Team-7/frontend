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

import Page1 from "./routes/homePages/page1.jsx";
import Page2 from "./routes/homePages/page2.jsx";
import Page3 from "./routes/homePages/page3.jsx";
import LoginPage from "./routes/homePages/login_or_signup/login.jsx";
import SignInPage from "./routes/homePages/login_or_signup/singUp.jsx";
import MembershipPage from "./routes/homePages/memberships/memberships.jsx";
import Hours from "./routes/homePages/planyourvisit/hours.jsx";
import Ticket from "./routes/homePages/planyourvisit/tickets.jsx";
import Map from "./routes/homePages/planyourvisit/map.jsx";
import Parking from "./routes/homePages/planyourvisit/parking.jsx";
import Events from "./routes/homePages/planyourvisit/events.jsx";
import Attractions from "./routes/homePages/planyourvisit/attractions.jsx";
import Exhibits from "./routes/homePages/planyourvisit/exhibits.jsx";
import UserProfile from "./routes/homePages/userProfile/UserProfile.jsx";

// FinanceAdminView.jsx

// import VetRecordsView from "./routes/admin/VetRecordsView.jsx";
// import MaintenanceAdminView from "./routes/admin/MaintenanceAdminView.jsx";
// import FinanceAdminView from "./routes/admin/FinanceAdminView.jsx";
// import TicketAdminView from "./routes/admin/ticket_pricing/TicketAdminView.jsx";

import VetReportsView from "./routes/admin/vet_reports/VetReportsView.jsx";
import MaintenanceReportsView from "./routes/admin/maintenance/MaintenanceReportsView.jsx";
import FinanceAdminView from "./routes/admin/finance/FinanceAdminView.jsx";
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

import Habitat from "./routes/homepage/Habitat.jsx";
import TicketSales from "./routes/admin/finance/TicketSales.jsx";
import MerchandiseSales from "./routes/admin/finance/MerchandiseSales.jsx";
import AnimalFoodPurchases from "./routes/admin/finance/AnimalFoodPurchases.jsx";
import AssignExhibitEmployee from "./routes/admin/exhibit/AssignExhibitEmployee.jsx";
import VetReportInfo from "./routes/admin/vet_reports/VetReportInfo.jsx";
import MaintenanceReportInfo from "./routes/admin/maintenance/MaintenanceReportInfo.jsx";
import AssignDepartmentEmployee from "./routes/admin/department/AssignDepartmentEmployee.jsx";

const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route path="/" element={<Outlet />} errorElement={<NotFound />}>
				<Route index element={<App />}></Route>
				<Route path="events" element={<p>events</p>}></Route>
				<Route path="exhibit" element={<Outlet />}>
					<Route index element={<Exhibits />}></Route>
					<Route path=":exhibit_id" element={<Outlet />}>
						<Route path="habitat" element={<Outlet />}>
							<Route index element={<Habitat />}></Route>
							<Route path=":habitat_id" element={<Outlet />}>
								<Route path="animal" element={<p>animal</p>}>
									<Route path=":animal_id" element={<p>animal id</p>}></Route>
								</Route>
							</Route>
						</Route>
					</Route>
				</Route>
			</Route>

			<Route path="/dolphin-show" element={<OutletWrapper />}>
				<Route index element={<Page1 />}></Route>
			</Route>

			<Route path="/halloween-sales" element={<OutletWrapper />}>
				<Route index element={<Page2 />}></Route>
			</Route>

			<Route path="/year-end-sale" element={<OutletWrapper />}>
				<Route index element={<Page3 />}></Route>
			</Route>

			<Route path="/login" element={<OutletWrapper />}>
				<Route index element={<LoginPage />}></Route>
			</Route>

			<Route path="/signup" element={<OutletWrapper />}>
				<Route index element={<SignInPage />}></Route>
			</Route>

			<Route path="/memberships" element={<OutletWrapper />}>
				<Route index element={<MembershipPage />}></Route>
			</Route>

			<Route path="/hours" element={<OutletWrapper />}>
				<Route index element={<Hours />}></Route>
			</Route>

			<Route path="/tickets" element={<OutletWrapper />}>
				<Route index element={<Ticket />}></Route>
			</Route>

			<Route path="/map" element={<OutletWrapper />}>
				<Route index element={<Map />}></Route>
			</Route>

			<Route path="/parking" element={<OutletWrapper />}>
				<Route index element={<Parking />}></Route>
			</Route>

			<Route path="/events" element={<OutletWrapper />}>
				<Route index element={<Events />}></Route>
			</Route>

			<Route path="/attractions" element={<OutletWrapper />}>
				<Route index element={<Attractions />}></Route>
			</Route>

			<Route path="/exhibits" element={<OutletWrapper />}>
				<Route index element={<Exhibits />}></Route>
			</Route>

			<Route path="/profile" element={<OutletWrapper />}>
				<Route index element={<UserProfile />}></Route>
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
						<Route
							path="assignment"
							element={<AssignDepartmentEmployee />}
						></Route>
						<Route path="employee" element={<Outlet />}>
							<Route path="create" element={<CreateEmployee />}></Route>
							<Route path=":employee_id" element={<Outlet />}>
								<Route index element={<EmployeeInfo />}></Route>
								<Route path="edit" element={<EditEmployee />}></Route>
							</Route>
						</Route>
					</Route>
				</Route>

				<Route path="vet_report" element={<OutletWrapper />}>
					<Route index element={<VetReportsView />}></Route>
					<Route path=":vet_report_id" element={<Outlet />}>
						<Route index element={<VetReportInfo />}></Route>
					</Route>
				</Route>

				<Route path="maintenance_report" element={<OutletWrapper />}>
					<Route index element={<MaintenanceReportsView />}></Route>
					<Route path=":maintenance_report_id" element={<Outlet />}>
						<Route index element={<MaintenanceReportInfo />}></Route>
					</Route>
				</Route>

				<Route path="finance" element={<OutletWrapper />}>
					<Route index element={<FinanceAdminView />}></Route>
					<Route path="ticket_sales" element={<Outlet />}>
						<Route index element={<TicketSales />}></Route>
					</Route>
					<Route path="merchandise_sales" element={<Outlet />}>
						<Route index element={<MerchandiseSales />}></Route>
					</Route>
					<Route path="animal_food_purchases" element={<Outlet />}>
						<Route index element={<AnimalFoodPurchases />}></Route>
					</Route>
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
						<Route
							path="assignment"
							element={<AssignExhibitEmployee />}
						></Route>
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
