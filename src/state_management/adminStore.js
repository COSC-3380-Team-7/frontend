import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAdminStore = create(
	persist(
		(set) => ({
			loggedIn: false,
			employee_id: 0,
			setAdminState: (employee_id) =>
				set({
					loggedIn: true,
					employee_id: employee_id,
				}),
			clearState: () => {
				set({
					loggedIn: false,
					employee_id: 0,
				});
				localStorage.removeItem("admin-store");
			},
		}),
		{
			name: "admin-store", // unique name for the storage key
			getStorage: () => localStorage, // specify the storage type
		}
	)
);
