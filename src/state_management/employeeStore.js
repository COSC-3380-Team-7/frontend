import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useEmployeeStore = create(
	persist(
		(set) => ({
			loggedIn: false,
			employee_id: 0,
			setEmployeeState: (employee_id) =>
				set({
					loggedIn: true,
					employee_id: employee_id,
				}),
			clearState: () => {
				set({
					loggedIn: false,
					employee_id: 0,
				});
				localStorage.removeItem("employee-store");
			},
		}),
		{
			name: "employee-store", // unique name for the storage key
			getStorage: () => localStorage, // specify the storage type
		}
	)
);
