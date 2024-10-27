import * as React from "react";

import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";

export default function App() {
	const [api, setApi] = React.useState(undefined);
	const [current, setCurrent] = React.useState(0);
	const [count, setCount] = React.useState(0);
	const [imagesLinks] = React.useState([
		"img/casey-allen-H3U_HA1arI4-unsplash.jpg",
		"img/gwen-weustink-I3C1sSXj1i8-unsplash.jpg",
		"img/jake-weirick-6TyC5S5xnvM-unsplash.jpg",
		"img/sutirta-budiman-Jgiv1rSIpVM-unsplash.jpg",
	]);

	React.useEffect(() => {
		if (!api) {
			return;
		}

		setCount(api.scrollSnapList().length);
		setCurrent(api.selectedScrollSnap() + 1);

		api.on("select", () => {
			setCurrent(api.selectedScrollSnap() + 1);
		});
	}, [api]);

	return (
		<div className="w-full">
			<Carousel setApi={setApi} className="w-full h-[30rem]">
				<CarouselContent>
					{imagesLinks.map((ref, index) => (
						<CarouselItem key={index}>
							<img
								src={ref}
								alt="carousel image"
								className="w-full h-[30rem] object-fill"
							/>
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious />
				<CarouselNext />
			</Carousel>
			<div className="py-2 text-center text-sm text-muted-foreground">
				Slide {current} of {count}
			</div>
		</div>
	);
}
