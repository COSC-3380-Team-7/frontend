import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { formatDate } from "@/utils/dateCalcs";

export default function MEmployeeInfo() {
	const { employee_id } = useParams();
	const [isLoading, setIsLoading] = useState(false);
	const [employeeInfo, setEmployeeInfo] = useState({
		employee_id: "",
		employment_status: "",
		first_name: "",
		middle_initial: "",
		last_name: "",
		phone_number: "",
		address: "",
		email: "",
		date_of_birth: "",
		department: "",
		occupation: "",
	});
	const navigate = useNavigate();

	useEffect(() => {
		async function fetchEmployeeInfo() {
			setIsLoading(true);
			const res = await fetch(
				`${import.meta.env.VITE_API_URL}/admin/employee/:${employee_id}`
			);

			if (!res.ok) {
				console.error("Failed to fetch employee information");
				setIsLoading(false);
				return;
			}

			const data = await res.json();
			console.log(data.data);
			setEmployeeInfo({
				employee_id: data.data.employee_id,
				employment_status: data.data.employment_status,
				first_name: data.data.first_name,
				middle_initial: data.data.middle_initial,
				last_name: data.data.last_name,
				phone_number: data.data.phone_number,
				address: data.data.address,
				email: data.data.email,
				date_of_birth: formatDate(data.data.date_of_birth),
				hire_date: formatDate(data.data.hire_date),
				department: data.data.department_name,
				occupation: data.data.occupation_name,
				// manager: data.data.manager,
				department_name: data.data.department_name,
			});

			setIsLoading(false);
		}

		fetchEmployeeInfo();
	}, [employee_id]);

	if (isLoading) {
		return <Loading />;
	}

	return (
		<>
			<div className="flex items-center gap-2 w-full mb-3">
				<Button
					size="icon"
					variant="outline"
					onClick={() => navigate(`/manager/vet/department`)}
				>
					<ArrowLeftIcon className="h-5 w-5" />
				</Button>
				<h1 className="text-3xl font-semibold text-gray-800">
					Employee ID: {employee_id}
				</h1>
			</div>

			<div className="mt-5">
				<div className="flex flex-col gap-3">
					<div>
						<h3 className="text-lg text-gray-700 font-semibold">
							Employment Status
						</h3>
						<p className="text-gray-800 font-medium">
							{employeeInfo.employment_status}
						</p>
					</div>
					<div>
						<h3 className="text-lg text-gray-700 font-semibold">First Name</h3>
						<p className="text-gray-800 font-medium">
							{employeeInfo.first_name}
						</p>
					</div>
					<div>
						<h3 className="text-lg text-gray-700 font-semibold">Last Name</h3>
						<p className="text-gray-800 font-medium">
							{employeeInfo.last_name}
						</p>
					</div>
					<div>
						<h3 className="text-lg text-gray-700 font-semibold">Email</h3>
						<p className="text-gray-800 font-medium">{employeeInfo.email}</p>
					</div>
					<div>
						<h3 className="text-lg text-gray-700 font-semibold">
							Phone Number
						</h3>
						<p className="text-gray-800 font-medium">
							{employeeInfo.phone_number}
						</p>
					</div>
					<div>
						<h3 className="text-lg text-gray-700 font-semibold">Address</h3>
						<p className="text-gray-800 font-medium">{employeeInfo.address}</p>
					</div>
					<div>
						<h3 className="text-lg text-gray-700 font-semibold">Hire Date</h3>
						<p className="text-gray-800 font-medium">
							{employeeInfo.hire_date}
						</p>
					</div>
					<div>
						<h3 className="text-lg text-gray-700 font-semibold">Occupation</h3>
						<p className="text-gray-800 font-medium">
							{employeeInfo.occupation}
						</p>
					</div>
				</div>
			</div>
		</>
	);
}
