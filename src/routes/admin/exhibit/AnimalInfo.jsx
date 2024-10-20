import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

export default function AnimalInfo() {
	const { exhibit_id, habitat_id, animal_id } = useParams();
	const navigate = useNavigate();

	return (
		<>
			<div className="flex items-center gap-2 w-full mb-10">
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
		</>
	);
}
