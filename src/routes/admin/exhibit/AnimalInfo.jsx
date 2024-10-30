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
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AdvancedImage } from "@cloudinary/react";
import { cldClientSide } from "@/lib/cloudinary";
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { formatDate, calculateAge } from "@/utils/dateCalcs";
import Loading from "@/components/Loading";

export default function AnimalInfo() {
	const [open, setOpen] = useState(false);
	const [animalInfo, setAnimalInfo] = useState({
		name: "",
		scientific_name: "",
		age: "",
		height: "",
		weight: "",
		arrival_date: "",
		date_of_birth: "",
		gender: "",
		conservation_status: "", // 'Stable', 'Threatened', 'Endangered'
		availability_status: "", // 'Present', 'Transferred', 'Deceased'
		origin: "",
		geographic_range: "",
		animal_fact: "",
		image_cloud_link: "",
	});
	const [availabilityInfo, setAvailabilityInfo] = useState({
		availability_status: "",
		removal_details: "",
	});
	const { exhibit_id, habitat_id, animal_id } = useParams();
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		async function fetchData() {
			try {
				setIsLoading(true);
				const animalResponse = await fetch(
					`${import.meta.env.VITE_API_URL}/admin/animal/:${animal_id}`
				);

				if (!animalResponse.ok) {
					console.error("Error fetching animalData: ", animalResponse);
					setIsLoading(false);
					return;
				}

				const ad = await animalResponse.json();

				console.log(ad.data);
				setAnimalInfo({
					name: ad.data.name,
					age: calculateAge(ad.data.date_of_birth),
					weight: ad.data.weight,
					height: ad.data.height,
					animal_fact: ad.data.animal_fact,
					conservation_status: ad.data.conservation_status,
					availability_status: ad.data.availability_status,
					gender: ad.data.gender,
					origin: ad.data.origin,
					geographic_range: ad.data.geographic_range,
					arrival_date: formatDate(ad.data.arrival_date),
					date_of_birth: formatDate(ad.data.date_of_birth),
					image_cloud_link: ad.data.image_cloud_link,
				});
				setIsLoading(false);
			} catch (error) {
				console.error("Error fetching animalData: ", error);
			}
		}
		fetchData();
	}, [animal_id]);

	if (isLoading) {
		return <Loading />;
	}

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
					{animalInfo.name}
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

			<div className="mt-5 flex w-full">
				<div className="rounded-lg mr-10">
					{animalInfo.image_cloud_link && (
						<AdvancedImage
							cldImg={cldClientSide
								.image(animalInfo.image_cloud_link)
								.resize(thumbnail().width(600).height(600))}
						/>
					)}
				</div>

				<div className="grid grid-cols-2 gap-3">
					{Object.keys(animalInfo).map((key) => {
						if (key === "image_cloud_link") return;

						return (
							<div className="mb-2" key={key}>
								<h3 className="text-lg text-gray-800 font-semibold">
									{key
										.replace(/_/g, " ")
										.replace(/\b\w/g, (char) => char.toUpperCase())}
								</h3>
								<p className="text-gray-800 font-medium">{animalInfo[key]}</p>
							</div>
						);
					})}
				</div>
			</div>
		</>
	);
}
