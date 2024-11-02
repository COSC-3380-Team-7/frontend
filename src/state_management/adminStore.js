import { create } from "zustand";

export const useAdminStore = create((set) => ({
	isLoggedIn: false,
	employee_id: null,
	setEmployeeState: (employee_id) =>
		set({
			isLoggedIn: true,
			employee_id: employee_id,
		}),
	clearState: () =>
		set({
			isLoggedIn: false,
			employee_id: null,
		}),
}));
