import { useState } from "react";
import { Button } from "../components/ui/button";
import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar";

function App() {
	const [count, setCount] = useState(0);

	return (
		<div className="h-full w-full">
			<Navbar />
			<div className="flex flex-col items-center justify-center px-6">
				<h1>Vite + React</h1>
				<div className="">
					<Button
						className="font-medium text-base"
						onClick={() => setCount((count) => count + 1)}
					>
						Count is {count}
					</Button>
				</div>
				<p className="read-the-docs">
					Click on the Vite and React logos to learn more
				</p>
			</div>
			<Outlet />
		</div>
	);
}

export default App;
