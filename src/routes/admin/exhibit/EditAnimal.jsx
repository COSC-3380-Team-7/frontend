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
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeftIcon } from "lucide-react";
import Datepicker from "react-tailwindcss-datepicker";
import { Textarea } from "@/components/ui/textarea";
import { sqlDateConverter } from "@/utils/convertToDateSQL";
import Loading from "@/components/Loading";

export default function EditAnimal() {
	const [isLoading, setIsLoading] = useState(true);
	const [allHabitats, setAllHabitats] = useState([]);
	const [animalInfo, setAnimalInfo] = useState({
		name: "",
		scientific_name: "",
		nickname: "",
		height: "",
		weight: "",
		animal_fact: "",
		conservation_status: "",
		gender: "",
		origin: "",
		geographic_range: "",
		habitat_id: "",
	});
	const [arrivalDate, setArrivalDate] = useState({
		startDate: null,
		endDate: null,
	});
	const [dateOfBirth, setDateOfBirth] = useState({
		startDate: null,
		endDate: null,
	});
	const [image, setImage] = useState(null);
	const [imageFileName, setImageFileName] = useState("");

	const { exhibit_id, habitat_id, animal_id } = useParams();
	const navigate = useNavigate();

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setImageFileName(file.name);
			const reader = new FileReader();
			reader.onloadend = () => {
				setImage(reader.result);
			};
			reader.readAsDataURL(file);
		}
	};

	async function handleSubmit(e) {
		e.preventDefault();

		const animalData = {
			name: animalInfo.name,
			scientific_name: animalInfo.scientific_name,
			nickname: animalInfo.nickname,
			height: animalInfo.height,
			weight: animalInfo.weight,
			date_of_birth: sqlDateConverter(dateOfBirth.startDate),
			gender: animalInfo.gender,
			origin: animalInfo.origin,
			arrival_date: sqlDateConverter(arrivalDate.startDate),
			animal_fact: animalInfo.animal_fact,
			geographic_range: animalInfo.geographic_range,
			image: image,
			image_filename: imageFileName,
			conservation_status: animalInfo.conservation_status,
			habitat_id: animalInfo.habitat_id,
		};

		setIsLoading(true);
		const response = await fetch(
			`${import.meta.env.VITE_API_URL}/admin/animal/:${animal_id}`,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(animalData),
			}
		);
		setIsLoading(false);

		if (!response.ok) {
			toast.error("Failed to update animal");
			return;
		}

		const data = await response.json();
		console.log(data);
		toast.success("Animal updated successfully");

		if (image) {
			setImage(null);
			setImageFileName("");
		}
	}

	useEffect(() => {
		async function fetchData() {
			const habitatResponse = await fetch(
				`${import.meta.env.VITE_API_URL}/admin/habitat`
			);

			if (!habitatResponse.ok) {
				console.error("Error fetching habitatData: ", habitatResponse);
				setIsLoading(false);
				return;
			}

			const hd = await habitatResponse.json();
			console.log(hd.data);
			setAllHabitats(hd.data);

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
				nickname: ad.data.nickname,
				weight: ad.data.weight,
				height: ad.data.height,
				animal_fact: ad.data.animal_fact,
				conservation_status: ad.data.conservation_status,
				origin: ad.data.origin,
				geographic_range: ad.data.geographic_range,
				gender: ad.data.gender,
				habitat_id: ad.data.habitat_id.toString(),
			});
			setDateOfBirth({
				startDate: new Date(ad.data.date_of_birth),
				endDate: new Date(ad.data.date_of_birth),
			});
			setArrivalDate({
				startDate: new Date(ad.data.arrival_date),
				endDate: new Date(ad.data.arrival_date),
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
			<div className="flex items-center gap-2 w-full mb-6">
				<Button
					size="icon"
					variant="outline"
					onClick={() =>
						navigate(
							`/admin/exhibit/${exhibit_id}/habitat/${habitat_id}/animal/${animal_id}`
						)
					}
				>
					<ArrowLeftIcon className="h-5 w-5" />
				</Button>
				<h1 className="text-3xl font-semibold text-gray-800">Edit Animal</h1>
			</div>

			<form onSubmit={handleSubmit}>
				<div className="max-w-2xl">
					<h1 className="text-gray-800 text-xl font-semibold w-full border-b border-b-gray-400 pb-2">
						Animal Information
					</h1>

					<div className="mt-4">
						<Label htmlFor="habitat_id">Change Animal Habitat</Label>
						<Select
							value={animalInfo.habitat_id}
							onValueChange={(value) =>
								setAnimalInfo((prev) => ({ ...prev, habitat_id: value }))
							}
							required
						>
							<SelectTrigger className="max-w-52 border-gray-500">
								<SelectValue placeholder="Select habitat" />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									{allHabitats.map((habitat) => (
										<SelectItem
											key={habitat.habitat_id}
											value={habitat.habitat_id.toString()}
										>
											{habitat.name}
										</SelectItem>
									))}
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>

					<div className="mt-4">
						<Label htmlFor="name">Name</Label>
						<Input
							value={animalInfo.name}
							onChange={(e) =>
								setAnimalInfo({ ...animalInfo, name: e.target.value })
							}
							type="text"
							name="name"
							id="name"
							placeholder="African Lion"
							required
							maxlength="50"
						/>
					</div>

					<div className="mt-4">
						<Label htmlFor="scientific_name">Scientific Name</Label>
						<Input
							value={animalInfo.scientific_name}
							onChange={(e) =>
								setAnimalInfo({
									...animalInfo,
									scientific_name: e.target.value,
								})
							}
							type="text"
							name="scientific_name"
							id="scientific_name"
							placeholder="Lion"
							maxLength="50"
							required
						/>
					</div>

					<div className="mt-4">
						<Label htmlFor="nickname">Nickname</Label>
						<Input
							value={animalInfo.nickname}
							onChange={(e) =>
								setAnimalInfo({
									...animalInfo,
									nickname: e.target.value,
								})
							}
							type="text"
							name="nickname"
							id="nickname"
							placeholder="Leo"
							maxlength="50"
							required
						/>
					</div>

					<div className="mt-4 flex flex-col gap-1 max-w-52">
						<Label>Date of Birth</Label>
						<Datepicker
							inputClassName="w-full rounded-md border border-gray-500 bg-background px-3 py-2 text-sm ring-offset-background file:border-0 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
							primaryColor="lime"
							useRange={false}
							asSingle={true}
							value={dateOfBirth}
							onChange={(newValue) => setDateOfBirth(newValue)}
							required
						/>
					</div>

					<div className="mt-4 flex flex-col gap-1 max-w-52">
						<Label>Arrival Date</Label>
						<Datepicker
							inputClassName="w-full rounded-md border border-gray-500 bg-background px-3 py-2 text-sm ring-offset-background file:border-0 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
							primaryColor="lime"
							useRange={false}
							asSingle={true}
							value={arrivalDate}
							onChange={(newValue) => setArrivalDate(newValue)}
							required
						/>
					</div>

					<div className="mt-4">
						<Label htmlFor="weight">Weight (kg)</Label>
						<Input
							value={animalInfo.weight}
							onChange={(e) => {
								const value = e.target.value;
								setAnimalInfo({ ...animalInfo, weight: value });
							}}
							type="number"
							step="0.01"
							min="0"
							max="5000"
							name="weight"
							id="weight"
							placeholder="100"
							required
						/>
					</div>

					<div className="mt-4">
						<Label htmlFor="height">Height (ft)</Label>
						<Input
							value={animalInfo.height}
							onChange={(e) =>
								setAnimalInfo({ ...animalInfo, height: e.target.value })
							}
							min="0"
							max="20"
							step="0.01"
							type="number"
							name="height"
							id="height"
							placeholder="5"
							required
						/>
					</div>

					<div className="mt-4">
						<Label htmlFor="gender">Gender</Label>
						<Select
							value={animalInfo.gender}
							onValueChange={(value) =>
								setAnimalInfo((prev) => ({ ...prev, gender: value }))
							}
							required
						>
							<SelectTrigger className="max-w-52 border-gray-500">
								<SelectValue placeholder="Select gender" />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectLabel>Gender</SelectLabel>
									<SelectItem value="Male">Male</SelectItem>
									<SelectItem value="Female">Female</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>

					<div className="mt-4">
						<Label htmlFor="conservation_status">Conservation Status</Label>
						<Select
							value={animalInfo.conservation_status}
							onValueChange={(value) =>
								setAnimalInfo((prev) => ({
									...prev,
									conservation_status: value,
								}))
							}
							required
						>
							<SelectTrigger className="max-w-52 border-gray-500">
								<SelectValue placeholder="Select conservation status" />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectLabel>Conservation Status</SelectLabel>
									<SelectItem value="Stable">Stable</SelectItem>
									<SelectItem value="Threatened">Threatened</SelectItem>
									<SelectItem value="Endangered">Endangered</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>

					<div className="mt-4">
						<Label htmlFor="origin">Origin</Label>
						<Input
							value={animalInfo.origin}
							onChange={(e) =>
								setAnimalInfo({ ...animalInfo, origin: e.target.value })
							}
							type="text"
							name="origin"
							id="origin"
							placeholder="Africa"
							required
							maxlength="100"
						/>
					</div>

					<div className="mt-4">
						<Label htmlFor="geographic_range">Geographic Range</Label>
						<Textarea
							value={animalInfo.geographic_range}
							onChange={(e) =>
								setAnimalInfo({
									...animalInfo,
									geographic_range: e.target.value,
								})
							}
							type="text"
							name="geographic_range"
							id="geographic_range"
							placeholder="Geographic Range"
							className="border-gray-500"
							maxlength="1000"
							required
						/>
					</div>

					<div className="mt-4">
						<Label htmlFor="animal_fact">Animal Fact</Label>
						<Textarea
							value={animalInfo.animal_fact}
							onChange={(e) =>
								setAnimalInfo({ ...animalInfo, animal_fact: e.target.value })
							}
							type="text"
							name="animal_fact"
							id="animal_fact"
							placeholder="This is an animal fact"
							className="border-gray-500"
							maxlength="1000"
							required
						/>
					</div>

					<div className="mt-4">
						<Label htmlFor="animal_image">Animal Image</Label>
						<Input
							type="file"
							accept="image/*"
							onChange={handleImageChange}
							name="animal_image"
							id="animal_image"
							className="border-gray-500"
						/>
						{image && (
							<div className="mt-4">
								<img
									src={image}
									alt="Animal"
									className="object-contain w-64 h-64"
								/>
							</div>
						)}
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
		</>
	);
}
