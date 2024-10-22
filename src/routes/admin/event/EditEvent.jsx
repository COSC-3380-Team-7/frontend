import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogClose,
} from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon, CalendarOff } from "lucide-react";
import Datepicker from "react-tailwindcss-datepicker";
import { Textarea } from "@/components/ui/textarea";

export default function EditEvent() {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const [eventInfo, setEventInfo] = useState({
		event_id: "ExINV001",
		name: "Field trip",
		start_time: "09:00",
		end_time: "20:00",
		event_date: "2025-12-12",
		description: "School field trip",
		category: "School Event",
		member_exclusive: "false",
	});
	const [eventDate, setEventDate] = useState({
		startDate: null,
		endDate: null,
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		/*
			Form Data {
				first_name: "John",
				middle_initial: "D",
				last_name: "Doe",
				phone_number: "123456789",
				address: "1234 Main St",
				email: "email",
				salary: "50000",
				password: """
			}
		*/
		const formData = new FormData(e.target);
		const data = Object.fromEntries(formData.entries());
		console.log(data);
		toast.success("Employee created successfully.");
	};

	return (
		<div>
			<div className="flex items-center gap-2 w-full mb-6">
				<Button
					size="icon"
					variant="outline"
					onClick={() => navigate(`/admin/event`)}
				>
					<ArrowLeftIcon className="h-5 w-5" />
				</Button>
				<h1 className="text-3xl font-semibold text-gray-800">Edit Event</h1>
			</div>

			{new Date().toISOString().split("T")[0] < eventInfo.event_date && (
				<div className="flex items-center mb-6">
					<Dialog>
						<DialogTrigger asChild>
							<Button
								variant="outline"
								className="flex items-center gap-2 border-gray-500"
							>
								<CalendarOff className="w-4 h-4" /> Cancel Event
							</Button>
						</DialogTrigger>
						<DialogContent className="max-w-lg">
							<DialogHeader>
								<DialogTitle className="text-xl">Cancel Event</DialogTitle>
								<DialogDescription className="text-gray-700 text-base">
									Are you sure you want to cancel this event?
								</DialogDescription>
							</DialogHeader>

							<DialogFooter>
								<DialogClose asChild>
									<Button variant="destructive">Remove</Button>
								</DialogClose>
							</DialogFooter>
						</DialogContent>
					</Dialog>
				</div>
			)}

			<form onSubmit={handleSubmit}>
				<div className="max-w-2xl">
					<h1 className="text-gray-800 text-xl font-semibold w-full border-b border-b-gray-400 pb-2">
						Event Information
					</h1>

					<div className="mt-4">
						<Label htmlFor="name">Name</Label>
						<Input
							value={eventInfo.name}
							onChange={(e) =>
								setEventInfo((prev) => ({ ...prev, name: e.target.value }))
							}
							type="text"
							name="name"
							id="name"
							placeholder="Elementary School Field Trip"
							required
						/>
					</div>

					<div className="mt-4 flex flex-col gap-1 max-w-52">
						<Label>Event Date</Label>
						<Datepicker
							inputClassName="w-full rounded-md border border-gray-500 bg-background px-3 py-2 text-sm ring-offset-background file:border-0 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
							primaryColor="lime"
							useRange={false}
							asSingle={true}
							value={eventDate}
							onChange={(newValue) => setEventDate(newValue)}
							required
						/>
					</div>

					<div className="mt-4 flex flex-col gap-1 max-w-52">
						<Label htmlFor="start_time">Start Time</Label>
						<div className="flex gap-2">
							<Input
								value={eventInfo.start_time}
								onChange={(e) =>
									setEventInfo((prev) => ({
										...prev,
										start_time: e.target.value,
									}))
								}
								type="time"
								name="start_time"
								id="start_time"
								placeholder="10:00"
								className="flex h-10 w-full rounded-md border border-gray-500 bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
								required
							/>
						</div>
					</div>

					<div className="mt-4 flex flex-col gap-1 max-w-52">
						<Label htmlFor="end_time">End Time</Label>
						<div className="flex gap-2">
							<Input
								value={eventInfo.end_time}
								onChange={(e) =>
									setEventInfo((prev) => ({
										...prev,
										end_time: e.target.value,
									}))
								}
								type="time"
								name="end_time"
								id="end_time"
								placeholder="10:00"
								className="flex h-10 w-full rounded-md border border-gray-500 bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
								required
							/>
						</div>
					</div>

					<div className="mt-4">
						<Label htmlFor="category">Event Category</Label>

						<Select
							name="category"
							id="category"
							value={eventInfo.category}
							onValueChange={(value) =>
								setEventInfo((prev) => ({ ...prev, category: value }))
							}
							required
						>
							<SelectTrigger className="max-w-52 border-gray-500">
								<SelectValue placeholder="Select Category" />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectItem value="School Event">School Event</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>

					<div className="mt-4">
						<Label htmlFor="description">Description</Label>
						<Textarea
							value={eventInfo.description}
							onChange={(e) =>
								setEventInfo((prev) => ({
									...prev,
									description: e.target.value,
								}))
							}
							type="text"
							name="description"
							id="description"
							placeholder="School field trip to the zoo"
							className="border-gray-500"
							required
						/>
					</div>

					<div className="mt-4">
						<Label htmlFor="member_exclusive">Member Exclusive</Label>

						<Select
							name="member_exclusive"
							id="member_exclusive"
							value={eventInfo.member_exclusive}
							onValueChange={(value) =>
								setEventInfo((prev) => ({ ...prev, member_exclusive: value }))
							}
							required
						>
							<SelectTrigger className="max-w-52 border-gray-500">
								<SelectValue placeholder="Select Category" />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectItem value="true">True</SelectItem>
									<SelectItem value="false">False</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>
				</div>

				<div className="flex w-full justify-end max-w-2xl">
					<Button
						disabled={isLoading}
						className="w-28 bg-buttonBg mt-8 rounded-md border border-primaryBorder hover:bg-primaryBorder py-5
						transition-colorstext-white font-bold disabled:cursor-not-allowed"
					>
						Save
					</Button>
				</div>
			</form>
		</div>
	);
}
