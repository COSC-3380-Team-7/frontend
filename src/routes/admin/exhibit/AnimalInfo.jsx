import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeftIcon, PencilIcon, UserX } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function AnimalInfo() {
	const [open, setOpen] = useState(false);
	const [availabilityInfo, setAvailabilityInfo] = useState({
		availability_status: "",
		removal_details: "",
	});
	const { exhibit_id, habitat_id, animal_id } = useParams();
	const navigate = useNavigate();

	return (
		<>
			<div className="flex items-center gap-2 w-full mb-3">
				<Button
					size="icon"
					variant="outline"
					onClick={() =>
						navigate(`/admin/exhibit/${exhibit_id}/habitat/${habitat_id}`)
					}
				>
					<ArrowLeftIcon className="h-5 w-5" />
				</Button>
				<h1 className="text-3xl font-semibold text-gray-800">
					Animal ID: {animal_id}
				</h1>
			</div>

			<div className="flex items-center gap-3">
				<Button
					asChild
					variant="outline"
					className="flex items-center gap-2 border-gray-500"
				>
					<Link to="edit">
						<PencilIcon className="w-4 h-4" /> Edit Information
					</Link>
				</Button>

				<Dialog
					open={open}
					onOpenChange={(open) => {
						setOpen(open);
						if (!open) {
							setAvailabilityInfo({
								availability_status: "",
								removal_details: "",
							});
						}
					}}
				>
					<DialogTrigger asChild>
						<Button
							variant="outline"
							className="flex items-center gap-2 border-gray-500"
						>
							<UserX className="w-4 h-4" /> Remove Animal
						</Button>
					</DialogTrigger>
					<DialogContent className="max-w-lg">
						<DialogHeader>
							<DialogTitle className="text-xl">Remove Animal</DialogTitle>
							<DialogDescription className="text-gray-700 text-base">
								Are you sure you want to remove this animal?
							</DialogDescription>
						</DialogHeader>

						<form
							onSubmit={(e) => {
								e.preventDefault();
								console.log(availabilityInfo);
							}}
						>
							<div className="mb-2">
								<Label htmlFor="removal_reason">Removal Reason</Label>
								<Select
									value={availabilityInfo.availability_status}
									onValueChange={(value) => {
										setAvailabilityInfo((prev) => ({
											...prev,
											availability_status: value,
										}));
									}}
									required
								>
									<SelectTrigger className="max-w-52 border-gray-500">
										<SelectValue placeholder="Select availability_status" />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											<SelectLabel>Reason</SelectLabel>
											<SelectItem value="Transferred">Transferred</SelectItem>
											<SelectItem value="Deceased">Deceased</SelectItem>
										</SelectGroup>
									</SelectContent>
								</Select>
							</div>

							<div className="mb-4">
								<Label htmlFor="removal_details">Details</Label>
								<Textarea
									value={availabilityInfo.removal_details}
									onChange={(e) => {
										setAvailabilityInfo({
											...availabilityInfo,
											removal_details: e.target.value,
										});
									}}
									type="text"
									name="removal_details"
									id="removal_details"
									placeholder="Details"
									className="border-gray-500"
									required
								/>
							</div>

							<div className="flex w-full justify-end">
								<Button variant="destructive">Remove</Button>
							</div>
						</form>
					</DialogContent>
				</Dialog>
			</div>

			<div className="mt-5">
				<div className="flex flex-col gap-3">
					<div>
						<h3 className="text-lg text-gray-700 font-semibold">
							Employement Status
						</h3>
						<p className="text-gray-800 font-medium">Employed</p>
					</div>
					<div>
						<h3 className="text-lg text-gray-700 font-semibold">First Name</h3>
						<p className="text-gray-800 font-medium">John</p>
					</div>
					<div>
						<h3 className="text-lg text-gray-700 font-semibold">Last Name</h3>
						<p className="text-gray-800 font-medium">Doe</p>
					</div>
					<div>
						<h3 className="text-lg text-gray-700 font-semibold">Email</h3>
						<p className="text-gray-800 font-medium">email</p>
					</div>
					<div>
						<h3 className="text-lg text-gray-700 font-semibold">
							Phone Number
						</h3>
						<p className="text-gray-800 font-medium">123456789</p>
					</div>
					<div>
						<h3 className="text-lg text-gray-700 font-semibold">Address</h3>
						<p className="text-gray-800 font-medium">1234 Main St</p>
					</div>
					<div>
						<h3 className="text-lg text-gray-700 font-semibold">Hire Date</h3>
						<p className="text-gray-800 font-medium">2021-10-10</p>
					</div>
					<div>
						<h3 className="text-lg text-gray-700 font-semibold">Occupation</h3>
						<p className="text-gray-800 font-medium">Zoo Keeper</p>
					</div>
					<div>
						<h3 className="text-lg text-gray-700 font-semibold">Salary</h3>
						<p className="text-gray-800 font-medium">$50000</p>
					</div>
				</div>
			</div>
		</>
	);
}
