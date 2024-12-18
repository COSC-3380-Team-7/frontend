import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
	ArrowLeftIcon,
	ArrowRight,
	DoorOpen,
	PencilIcon,
	PlusIcon,
} from "lucide-react";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loading from "@/components/Loading";
import { calculateAge } from "@/utils/dateCalcs";
import { Badge } from "@/components/ui/badge";
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
import { Label } from "@radix-ui/react-label";
import { toast } from "sonner";

export default function HabitatInfo() {
	const [paginationSize] = useState(10);
	const [leftIndex, setLeftIndex] = useState(0);
	const [rightIndex, setRightIndex] = useState(paginationSize);
	const [currentPage, setCurrentPage] = useState(1);
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();
	const { exhibit_id, habitat_id } = useParams();

	const [habitatData, setHabitatData] = useState({
		name: "",
		description: "",
		status_flag: "",
		exhibit_id: "",
		habitat_id: "",
	});
	const [animalData, setAnimalData] = useState([]);

	const [open, setOpen] = useState(false);
	const [availabilityInfo, setAvailabilityInfo] = useState({
		availability_status: "",
	});

	async function handleSubmit(e) {
		e.preventDefault();
		console.log(availabilityInfo);

		setIsLoading(true);
		const response = await fetch(
			`${import.meta.env.VITE_API_URL}/admin/habitat_availability`,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					habitat_id,
					status_flag: availabilityInfo.availability_status,
				}),
			}
		);

		setIsLoading(false);

		if (!response.ok) {
			console.error("Error updating exhibit availability: ", response);
			toast.error("Error updating exhibit availability");
			return;
		}

		toast.success("Exhibit availability updated successfully");
		setHabitatData((prev) => ({
			...prev,
			status_flag: availabilityInfo.availability_status,
		}));
		setOpen(false);
	}

	useEffect(() => {
		async function fetchData() {
			try {
				setIsLoading(true);
				const habitatResponse = await fetch(
					`${import.meta.env.VITE_API_URL}/admin/habitat/:${habitat_id}`
				);

				if (!habitatResponse.ok) {
					console.error("Error fetching habitatData: ", habitatResponse);
					setIsLoading(false);
					return;
				}

				const hd = await habitatResponse.json();
				console.log(hd.data);
				setHabitatData(hd.data);

				const animalResponse = await fetch(
					`${import.meta.env.VITE_API_URL}/admin/habitat_animals/:${habitat_id}`
				);

				if (!animalResponse.ok) {
					console.error("Error fetching animalData: ", animalResponse);
					setIsLoading(false);
					return;
				}

				const ad = await animalResponse.json();
				console.log(ad.data);
				setAnimalData(ad.data);

				setAvailabilityInfo({
					availability_status: hd.data.status_flag,
				});
				setIsLoading(false);
			} catch (error) {
				console.error("Error fetching animalData: ", error);
			}
		}
		fetchData();
	}, [habitat_id]);

	if (isLoading) {
		return <Loading />;
	}

	return (
		<>
			<div className="flex items-center w-full justify-between mb-4">
				<div className="flex items-center gap-2 w-full">
					<Button
						size="icon"
						variant="outline"
						onClick={() => navigate(`/admin/exhibit/${exhibit_id}`)}
					>
						<ArrowLeftIcon className="h-5 w-5" />
					</Button>
					<h1 className="text-3xl font-semibold text-gray-800">
						{habitatData.name} Habitat
					</h1>
				</div>

				<Badge
					variant={habitatData.status_flag === "Closed" ? "destructive" : ""}
					className={`text-base px-4 py-1 text-white  ${
						habitatData.status_flag === "Closed"
							? "bg-red-800"
							: "bg-green-800 "
					}`}
				>
					{habitatData.status_flag}
				</Badge>
			</div>

			<div className="flex items-center gap-4 mb-6">
				<Button
					asChild
					className="flex items-center gap-2 font-semibold bg-secondaryBg hover:bg-secondaryBg"
				>
					<Link to="animal/create">
						<PlusIcon className="h-5 w-5" /> Add Animal
					</Link>
				</Button>

				<Button
					asChild
					variant="outline"
					className="flex items-center gap-2 border-gray-500 w-40"
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
								availability_status: habitatData.status_flag,
							});
						}
					}}
				>
					<DialogTrigger asChild>
						<Button
							variant="outline"
							className="flex items-center gap-2 border-gray-500"
						>
							<DoorOpen className="w-4 h-4" /> Update Habitat Availability
						</Button>
					</DialogTrigger>
					<DialogContent className="max-w-lg">
						<DialogHeader>
							<DialogTitle className="text-xl">
								Update Habitat Availability
							</DialogTitle>
							<DialogDescription></DialogDescription>
						</DialogHeader>

						<form onSubmit={handleSubmit}>
							<div className="mb-2">
								<Label htmlFor="status">Availability</Label>
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
										<SelectValue placeholder="Select availability" />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											<SelectLabel>Availability</SelectLabel>
											<SelectItem value="Open">Open</SelectItem>
											<SelectItem value="Closed">Closed</SelectItem>
										</SelectGroup>
									</SelectContent>
								</Select>
							</div>

							<div className="flex w-full justify-end">
								<Button
									disabled={
										availabilityInfo.availability_status ===
										habitatData.status_flag
									}
								>
									Update
								</Button>
							</div>
						</form>
					</DialogContent>
				</Dialog>
			</div>

			<h1 className="text-gray-800 text-xl font-semibold w-full border-b border-b-gray-400 pb-2">
				Animals
			</h1>

			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Animal Id</TableHead>
						<TableHead>Name</TableHead>
						<TableHead>Nickname</TableHead>
						<TableHead>Scientific Name</TableHead>
						<TableHead>Gender</TableHead>
						<TableHead>Age</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{animalData.map((el) => (
						<TableRow
							key={el.animal_id}
							onClick={() => {
								navigate(`animal/${el.animal_id}`);
							}}
							className="cursor-pointer"
						>
							<TableCell>{el.animal_id}</TableCell>
							<TableCell>{el.name}</TableCell>
							<TableCell>{el.nickname}</TableCell>
							<TableCell>{el.scientific_name}</TableCell>
							<TableCell>{el.gender}</TableCell>
							<TableCell>{calculateAge(el.date_of_birth)}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>

			<div className="flex w-full justify-end items-center gap-2 mt-4">
				<Button
					className="flex items-center p-3 gap-1 font-semibold bg-buttonBg hover:bg-buttonHoverBg"
					onClick={() => {
						setLeftIndex(leftIndex - paginationSize);
						setRightIndex(rightIndex - paginationSize);
						setCurrentPage(currentPage - 1);
					}}
					disabled={leftIndex === 0}
				>
					<ArrowLeftIcon className="h-5 w-5" /> Previous
				</Button>
				<Button
					className="flex items-center p-3 gap-1 font-semibold bg-buttonBg hover:bg-buttonHoverBg"
					onClick={() => {
						setLeftIndex(leftIndex + paginationSize);
						setRightIndex(rightIndex + paginationSize);
						setCurrentPage(currentPage + 1);
					}}
					disabled={rightIndex > animalData.length - 1}
				>
					Next
					<ArrowRight className="h-5 w-5" />
				</Button>
			</div>
		</>
	);
}
