import { Button } from "@/components/ui/button";
import { Undo2Icon } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
	const navigate = useNavigate();
	return (
		<div className="w-full h-screen flex items-center justify-center">
			<div className="flex flex-col items-center">
				<p className="text-6xl font-bold text-gray-800 mb-1">404</p>
				<p className="text-2xl font-bold text-gray-800 mb-4">PAGE NOT FOUND</p>
				<Button
					onClick={() => {
						navigate(-1);
					}}
					className="flex items-center gap-2 text-base px-4 py-5 bg-buttonBg text-white hover:bg-buttonHoverBg"
				>
					<Undo2Icon className="h-5 w-5" /> Return to Previous Page
				</Button>
			</div>
		</div>
	);
}
