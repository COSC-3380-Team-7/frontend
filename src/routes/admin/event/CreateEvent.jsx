import { useEffect, useState } from "react";
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
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "lucide-react";
import Datepicker from "react-tailwindcss-datepicker";
import { Textarea } from "@/components/ui/textarea";
import Loading from "@/components/Loading";
import { sqlDateConverter } from "@/utils/convertToDateSQL";

export default function CreateEvent() {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(true);
	const [eventInfo, setEventInfo] = useState({
		name: "",
		start_time: "",
		end_time: "",
		description: "",
		event_category_id: "",
	});
	console.log(eventInfo);
	const [eventDate, setEventDate] = useState({
		startDate: null,
		endDate: null,
	});
	const [eventCategories, setEventCategories] = useState([]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (eventInfo.start_time >= eventInfo.end_time) {
			toast.error("Event start time must be before end time");
			return;
		}

		setIsLoading(true);

		const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/event`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				name: eventInfo.name,
				start_time: eventInfo.start_time,
				end_time: eventInfo.end_time,
				event_date: sqlDateConverter(eventDate.startDate),
				description: eventInfo.description,
				event_category_id: +eventInfo.event_category_id,
			}),
		});

		setIsLoading(false);

		if (!res.ok) {
			toast.error("Failed to create event");
			return;
		}

		setEventInfo({
			name: "",
			start_time: "",
			end_time: "",
			description: "",
			event_category_id: "",
		});
		setEventDate({
			startDate: null,
			endDate: null,
		});
		toast.success("Event created successfully");
	};

	useEffect(() => {
		async function fetchData() {
			const res = await fetch(
				`${import.meta.env.VITE_API_URL}/admin/event_category`
			);
			setIsLoading(false);

			if (!res.ok) {
				console.error("Failed to fetch data", res);
				return;
			}

			const data = await res.json();
			console.log(data.data);
			setEventCategories(data.data);

			setIsLoading(false);
		}

		fetchData();
	}, []);

	if (isLoading) {
		return <Loading />;
	}

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
				<h1 className="text-3xl font-semibold text-gray-800">Create Event</h1>
			</div>

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
							maxLength="100"
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
						<Label htmlFor="event_category_id">Event Category</Label>

						<Select
							name="event_category_id"
							id="event_category_id"
							value={eventInfo.event_category_id}
							onValueChange={(value) =>
								setEventInfo((prev) => ({ ...prev, event_category_id: value }))
							}
							required
						>
							<SelectTrigger className="max-w-52 border-gray-500">
								<SelectValue placeholder="Select Category" />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									{eventCategories.map((el) => (
										<SelectItem
											key={el.event_category_id}
											value={el.event_category_id.toString()}
										>
											{el.category}
										</SelectItem>
									))}
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
							maxLength="500"
						/>
					</div>

					{/* <div className="mt-4">
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
									<SelectItem value="0">True</SelectItem>
									<SelectItem value="1">False</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>
					</div> */}
				</div>

				<div className="flex w-full justify-end max-w-2xl">
					<Button
						disabled={isLoading}
						className="w-28 bg-buttonBg mt-8 rounded-md border border-primaryBorder hover:bg-primaryBorder py-5
						transition-colorstext-white font-bold disabled:cursor-not-allowed"
					>
						Create
					</Button>
				</div>
			</form>
		</div>
	);
}
