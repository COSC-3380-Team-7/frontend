import { create } from "zustand";

export const useEmployeeStore = create((set) => ({
	loggedIn: false,
	employee_id: 0,
	setEmployeeState: (employee_id) =>
		set({
			loggedIn: true,
			employee_id: employee_id,
		}),
	clearState: () =>
		set({
			loggedIn: false,
			employee_id: 0,
		}),
}));
