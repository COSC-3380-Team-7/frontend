import { Button } from "@/components/ui/button";
import { Apple, ShoppingCart, Ticket } from "lucide-react";
import { Link } from "react-router-dom";

export default function FinanceAdminView() {
	return (
		<>
			<div className="flex items-center justify-between w-full mb-10">
				<h1 className="text-3xl font-semibold text-gray-800">
					Financial Reports
				</h1>
			</div>

			<div className="flex flex-col gap-5 max-w-xl">
				<Button
					variant="outline"
					asChild
					className="flex items-center gap-3 font-semibold border-gray-500"
				>
					<Link to="ticket_sales">
						<Ticket className="h-5 w-5" /> Ticket Sales
					</Link>
				</Button>
				<Button
					variant="outline"
					asChild
					className="flex items-center gap-3 font-semibold border-gray-500"
				>
					<Link to="merchandise_sales">
						<ShoppingCart className="h-5 w-5" /> Merchandise Sales
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
