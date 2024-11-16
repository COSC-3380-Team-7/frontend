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
import { ArrowLeftIcon, PencilIcon, UserX } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AdvancedImage, lazyload } from "@cloudinary/react";
import { cldClientSide } from "@/lib/cloudinary";
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { formatDate, calculateAge } from "@/utils/dateCalcs";
import Loading from "@/components/Loading";
import { toast } from "sonner";

export default function AnimalInfo() {
	const [open, setOpen] = useState(false);
	const [animalInfo, setAnimalInfo] = useState({
		name: "",
		scientific_name: "",
		availability_status: "", // 'Present', 'Transferred', 'Deceased'
		age: "",
		height: "",
		weight: "",
		arrival_date: "",
		date_of_birth: "",
		gender: "",
		conservation_status: "", // 'Stable', 'Threatened', 'Endangered'
		origin: "",
		geographic_range: "",
		animal_fact: "",
		image_cloud_link: "",
	});
	const [availabilityInfo, setAvailabilityInfo] = useState({
		availability_status: "",
	});
	const { exhibit_id, habitat_id, animal_id } = useParams();
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(true);

	async function handleAnimalStatusUpdate(e) {
		e.preventDefault();

		setIsLoading(true);
		const res = await fetch(
			`${import.meta.env.VITE_API_URL}/admin/update_availability`,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					animal_id: animal_id,
					availability_status: availabilityInfo.availability_status,
				}),
			}
		);

		setIsLoading(false);

		if (!res.ok) {
			console.error("Failed to update animal status");
			toast.error("Failed to update animal status");
			return;
		}

		setAnimalInfo((prev) => ({
			...prev,
			availability_status: availabilityInfo.availability_status,
		}));

		setOpen(false);
		toast.success("Animal status updated successfully");
	}

	useEffect(() => {
		async function fetchData() {
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
				scientific_name: ad.data.scientific_name,
				age: calculateAge(ad.data.date_of_birth),
				availability_status: ad.data.availability_status,
				weight: ad.data.weight,
				height: ad.data.height,
				animal_fact: ad.data.animal_fact,
				conservation_status: ad.data.conservation_status,
				gender: ad.data.gender,
				origin: ad.data.origin,
				geographic_range: ad.data.geographic_range,
				arrival_date: formatDate(ad.data.arrival_date),
				date_of_birth: formatDate(ad.data.date_of_birth),
				image_cloud_link: ad.data.image_cloud_link,
			});

			setAvailabilityInfo({
				availability_status: ad.data.availability_status,
			});

			setIsLoading(false);
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
								availability_status: animalInfo.availability_status,
							});
						}
					}}
				>
					<DialogTrigger asChild>
						<Button
							variant="outline"
							className="flex items-center gap-2 border-gray-500"
						>
							<UserX className="w-4 h-4" /> Update Animal Status
						</Button>
					</DialogTrigger>
					<DialogContent className="max-w-lg">
						<DialogHeader>
							<DialogTitle className="text-xl">
								Update Animal Status
							</DialogTitle>
							<DialogDescription className="text-gray-700 text-base">
								Are you sure you want to update this animal&apos;s availability?
							</DialogDescription>
						</DialogHeader>

						<form onSubmit={handleAnimalStatusUpdate}>
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
										<SelectValue placeholder="Select Reason" />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											<SelectLabel>Reason</SelectLabel>
											<SelectItem value="Present">Present</SelectItem>
											<SelectItem value="Transferred">Transferred</SelectItem>
											<SelectItem value="Deceased">Deceased</SelectItem>
										</SelectGroup>
									</SelectContent>
								</Select>
							</div>

							<div className="flex w-full justify-end">
								<Button
									disabled={
										isLoading ||
										availabilityInfo.availability_status ===
											animalInfo.availability_status
									}
									variant="destructive"
								>
									Update
								</Button>
							</div>
						</form>
					</DialogContent>
				</Dialog>
			</div>

			<div className="mt-5 flex w-full">
				<div className="rounded-lg mr-10 h-[600px] w-[600px]">
					{animalInfo.image_cloud_link && (
						<AdvancedImage
							cldImg={cldClientSide
								.image(animalInfo.image_cloud_link)
								.resize(thumbnail().width(600).height(600))}
							plugins={[lazyload()]}
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
