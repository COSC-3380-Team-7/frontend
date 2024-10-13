import { create } from "zustand";

export const useEmployeeStore = create((set) => ({
	loggedIn: false,
	id: 0,
	first_name: "",
	middle_initial: "",
	last_name: "",
	date_of_birth: "",
	address: "",
	email: "",
	phone_number: "",
	auth_title: "",
	department_name: "",
	setEmployeeState: (employee) =>
		set({
			loggedIn: true,
			id: employee.id,
			first_name: employee.first_name,
			middle_initial: employee.middle_initial,
			last_name: employee.last_name,
			date_of_birth: employee.date_of_birth,
			address: employee.address,
			email: employee.email,
			phone_number: employee.phone_number,
			auth_title: employee.auth_title,
			department_name: employee.department_name,
		}),
	clearState: () =>
		set({
			loggedIn: false,
			id: 0,
			first_name: "",
			middle_initial: "",
			last_name: "",
			date_of_birth: "",
			address: "",
			email: "",
			phone_number: "",
			auth_title: "",
			department_name: "",
		}),
}));
