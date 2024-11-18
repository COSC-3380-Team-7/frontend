import { Button } from "@/components/ui/button";
import { Apple, Building, ChartLine, HeartPulse, Ticket } from "lucide-react";
import { Link } from "react-router-dom";

export default function FinanceAdminView() {
	return (
		<>
			<div className="flex items-center justify-between w-full mb-10">
				<h1 className="text-3xl font-semibold text-gray-800">Reports</h1>
			</div>

			<div className="flex flex-col gap-5 max-w-xl">
				<Button
					variant="outline"
					asChild
					className="flex items-center gap-3 font-semibold border-gray-500"
				>
					<Link to="exhibit_performance">
						<ChartLine className="h-5 w-5" /> Exhibit Performance
					</Link>
				</Button>
				<Button
					variant="outline"
					asChild
					className="flex items-center gap-3 font-semibold border-gray-500"
				>
					<Link to="health_performance">
						<HeartPulse className="h-5 w-5" /> Animal Health Performance
					</Link>
				</Button>
				<Button
					variant="outline"
					asChild
					className="flex items-center gap-3 font-semibold border-gray-500"
				>
					<Link to="animal_food_purchases">
						<Apple className="h-5 w-5" /> Animal Food Cost Analysis
					</Link>
				</Button>
			</div>
		</>
	);
}
