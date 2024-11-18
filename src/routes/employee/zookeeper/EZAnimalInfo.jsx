import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, Drumstick, PencilIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AdvancedImage, lazyload } from "@cloudinary/react";
import { cldClientSide } from "@/lib/cloudinary";
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { formatDate, calculateAge } from "@/utils/dateCalcs";
import Loading from "@/components/Loading";

export default function EZAnimalInfo() {
	const [animalInfo, setAnimalInfo] = useState({
		name: "",
		scientific_name: "",
		nickname: "",
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

	const { exhibit_id, habitat_id, animal_id } = useParams();
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(true);

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
				nickname: ad.data.nickname,
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
						navigate(
							`/employee/zookeeper/exhibit/${exhibit_id}/habitat/${habitat_id}`
						)
					}
				>
					<ArrowLeftIcon className="h-5 w-5" />
				</Button>
				<h1 className="text-3xl font-semibold text-gray-800">
					{animalInfo.nickname} the {animalInfo.name}
				</h1>
			</div>

			<div className="flex items-center gap-3">
				<Button
					asChild
					className="flex items-center gap-2 font-semibold bg-secondaryBg hover:bg-secondaryBg"
				>
					<Link to="feed">
						<Drumstick className="h-5 w-5" /> Feed Animal
					</Link>
				</Button>

				<Button
					asChild
					variant="outline"
					className="flex items-center gap-2 border-gray-500"
				>
					<Link to="edit">
						<PencilIcon className="w-4 h-4" /> Edit Information
					</Link>
				</Button>
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
