import { create } from "zustand";

export const useManagerStore = create((set) => ({
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
	setManagerState: (manager) =>
		set({
			loggedIn: true,
			id: manager.id,
			first_name: manager.first_name,
			middle_initial: manager.middle_initial,
			last_name: manager.last_name,
			date_of_birth: manager.date_of_birth,
			address: manager.address,
			email: manager.email,
			phone_number: manager.phone_number,
			auth_title: manager.auth_title,
			department_name: manager.department_name,
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
