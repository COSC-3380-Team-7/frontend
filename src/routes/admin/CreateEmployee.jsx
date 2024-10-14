import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function CreateEmployee() {
	const [isLoading, setIsLoading] = useState(false);
	const handleSubmit = (e) => {
		e.preventDefault();
	};
	return (
		<div className="p-12">
			<h1 className="text-3xl font-semibold text-gray-800">Create Employee</h1>

			<form onSubmit={handleSubmit}>
				<div className="max-w-2xl">
					<div className="mt-4">
						<label
							htmlFor="first_name"
							className="block text-sm font-semibold leading-6 text-gray-800"
						>
							First Name
						</label>
						<div className="relative mt-2 rounded-md shadow-sm">
							<input
								type="text"
								name="first_name"
								id="first_name"
								className="block w-full bg-white rounded-md text-gray-900 py-1.5 px-3 border border-gray-700  placeholder:text-gray-700 focus:ring-2 focus:outline-none focus:ring-inputHover sm:text-sm sm:leading-6 transition-colors"
								placeholder="John"
								required
							/>
						</div>
					</div>

					<div className="mt-4">
						<label
							htmlFor="middle_initial"
							className="block text-sm font-semibold leading-6 text-gray-800"
						>
							Middle Initial
						</label>
						<div className="relative mt-2 rounded-md shadow-sm">
							<input
								type="text"
								name="middle_initial"
								id="middle_initial"
								className="block w-full bg-white rounded-md text-gray-900 py-1.5 px-3 border border-gray-700  placeholder:text-gray-700 focus:ring-2 focus:outline-none focus:ring-inputHover sm:text-sm sm:leading-6 transition-colors"
								placeholder="D"
								required
							/>
						</div>
					</div>

					<div className="mt-4">
						<label
							htmlFor="last_name"
							className="block text-sm font-semibold leading-6 text-gray-800"
						>
							Last Name
						</label>
						<div className="relative mt-2 rounded-md shadow-sm">
							<input
								type="text"
								name="last_name"
								id="last_name"
								className="block w-full bg-white rounded-md text-gray-900 py-1.5 px-3 border border-gray-700  placeholder:text-gray-700 focus:ring-2 focus:outline-none focus:ring-inputHover sm:text-sm sm:leading-6 transition-colors"
								placeholder="Doe"
								required
							/>
						</div>
					</div>

					<div className="mt-4">
						<label
							htmlFor="phone_number"
							className="block text-sm font-semibold leading-6 text-gray-800"
						>
							Phone Number
						</label>
						<div className="relative mt-2 rounded-md shadow-sm">
							<input
								type="text"
								name="phone_number"
								id="phone_number"
								className="block w-full bg-white rounded-md text-gray-900 py-1.5 px-3 border border-gray-700  placeholder:text-gray-700 focus:ring-2 focus:outline-none focus:ring-inputHover sm:text-sm sm:leading-6 transition-colors"
								placeholder="person@gmail.com"
								required
							/>
						</div>
					</div>

					<div className="mt-4">
						<label
							htmlFor="address"
							className="block text-sm font-semibold leading-6 text-gray-800"
						>
							Address
						</label>
						<div className="relative mt-2 rounded-md shadow-sm">
							<input
								type="text"
								name="address"
								id="address"
								className="block w-full bg-white rounded-md text-gray-900 py-1.5 px-3 border border-gray-700  placeholder:text-gray-700 focus:ring-2 focus:outline-none focus:ring-inputHover sm:text-sm sm:leading-6 transition-colors"
								placeholder="1234 Fake St"
								required
							/>
						</div>
					</div>

					<div className="mt-4">
						<label
							htmlFor="email"
							className="block text-sm font-semibold leading-6 text-gray-800"
						>
							Email
						</label>
						<div className="relative mt-2 rounded-md shadow-sm">
							<input
								type="email"
								name="email"
								id="email"
								className="block w-full bg-white rounded-md text-gray-900 py-1.5 px-3 border border-gray-700  placeholder:text-gray-700 focus:ring-2 focus:outline-none focus:ring-inputHover sm:text-sm sm:leading-6 transition-colors"
								placeholder="person@gmail.com"
								required
							/>
						</div>
					</div>

					<div className="mt-4">
						<label
							htmlFor="salary"
							className="block text-sm font-semibold leading-6 text-gray-800"
						>
							Salary
						</label>
						<div className="relative mt-2 rounded-md shadow-sm">
							<input
								type="text"
								name="salary"
								id="salary"
								className="block w-full bg-white rounded-md text-gray-900 py-1.5 px-3 border border-gray-700  placeholder:text-gray-700 focus:ring-2 focus:outline-none focus:ring-inputHover sm:text-sm sm:leading-6 transition-colors"
								placeholder="50000"
								required
							/>
						</div>
					</div>

					<div className="mt-4">
						<label
							htmlFor="password"
							className="block text-sm font-semibold leading-6 text-gray-800"
						>
							Password
						</label>
						<div className="relative mt-2 rounded-md shadow-sm">
							<input
								type="password"
								name="password"
								id="password"
								className="block w-full bg-white rounded-md text-gray-900 py-1.5 px-3 border border-gray-700  placeholder:text-gray-700 focus:ring-2 focus:outline-none focus:ring-inputHover sm:text-sm sm:leading-6 transition-colors"
								placeholder="••••••••••"
								required
							/>
						</div>
					</div>
				</div>

				<div className="flex w-full justify-end max-w-2xl">
					<Button
						disabled={isLoading}
						className="w-32 bg-buttonBg mt-8 rounded-md border border-primaryBorder hover:bg-primaryBorder py-5
						 transition-colorstext-white text-base font-medium disabled:cursor-not-allowed"
					>
						Create
					</Button>
				</div>
			</form>
		</div>
	);
}
