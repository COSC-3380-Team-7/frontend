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
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeftIcon } from "lucide-react";
import Datepicker from "react-tailwindcss-datepicker";
import { Textarea } from "@/components/ui/textarea";

export default function CreateAnimal() {
	const [isLoading, setIsLoading] = useState(false);
	const [animalInfo, setAnimalInfo] = useState({
		name: "",
		age: "",
		weight: "",
		height: "",
		animal_fact: "",
		species: "",
		conservation_status: "",
		availability_status: "",
		gender: "",
		origin: "",
		scientific_name: "",
		geographic_range: "",
	});
	console.log(animalInfo);
	const [arrivalDate, setArrivalDate] = useState({
		startDate: null,
		endDate: null,
	});
	const [dateOfBirth, setDateOfBirth] = useState({
		startDate: null,
		endDate: null,
	});
	const { exhibit_id, habitat_id } = useParams();
	const navigate = useNavigate();

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
		<>
			<div className="flex items-center gap-2 w-full mb-6">
				<Button
					size="icon"
					variant="outline"
					onClick={() =>
						navigate(`/admin/exhibit/${exhibit_id}/habitat/${habitat_id}`)
					}
				>
					<ArrowLeftIcon className="h-5 w-5" />
				</Button>
				<h1 className="text-3xl font-semibold text-gray-800">Add Animal</h1>
			</div>

			<form onSubmit={handleSubmit}>
				<div className="max-w-2xl">
					<h1 className="text-gray-800 text-xl font-semibold w-full border-b border-b-gray-400 pb-2">
						Animal Information
					</h1>

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
						/>
					</div>

					<div className="mt-4">
						<Label htmlFor="species">Species</Label>
						<Input
							value={animalInfo.species}
							onChange={(e) =>
								setAnimalInfo({ ...animalInfo, species: e.target.value })
							}
							type="text"
							name="species"
							id="species"
							placeholder="Lion"
							required
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
						<Label htmlFor="weight">Weight</Label>
						<Input
							value={animalInfo.weight}
							onChange={(e) =>
								setAnimalInfo({ ...animalInfo, weight: e.target.value })
							}
							min="0"
							max="100000"
							type="number"
							name="weight"
							id="weight"
							placeholder="100"
							required
						/>
					</div>

					<div className="mt-4">
						<Label htmlFor="height">Height</Label>
						<Input
							value={animalInfo.height}
							onChange={(e) =>
								setAnimalInfo({ ...animalInfo, height: e.target.value })
							}
							min="0"
							max="100000"
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
						>
							<SelectTrigger className="max-w-52 border-gray-500">
								<SelectValue placeholder="Select gender" />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectLabel>Gender</SelectLabel>
									<SelectItem value="0">Male</SelectItem>
									<SelectItem value="1">Female</SelectItem>
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
							required
						/>
					</div>
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
		</>
	);
}
