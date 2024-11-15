import React, { useState, useEffect, useRef } from "react";

const carouselData = [
  {
    image:
      "https://cdn.prod.website-files.com/63e51157295a654688a15aca/63e540072e4d298ea274be3b_guinea%20pig%20gamer.png",
    message: "Upcoming Dolphin Show - Don't miss it!",
    buttonLink: "/dolphin-show",
  },
  {
    image:
      "https://images.nightcafe.studio/jobs/V8qs4d5o2VPu8hJSeYmu/V8qs4d5o2VPu8hJSeYmu--1--47trm_4x.jpg?tr=w-1600,c-at_max",
    message: "Halloween Special Sales - Spooky Discounts!",
    buttonLink: "/halloween-sales",
  },
  {
    image:
      "https://images.nightcafe.studio/jobs/MsTuElvCNcnAmCCzS1W0/MsTuElvCNcnAmCCzS1W0--1--jb3ap.jpg?tr=w-1600,c-at_max",
    message: "End of Year Merch Sale - Get Your Souvenirs!",
    buttonLink: "/year-end-sale",
  },
];

export default function App() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const signedIn = false; // Change this to `true` if the user is logged in

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % carouselData.length
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const goToPreviousSlide = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + carouselData.length) % carouselData.length
    );
  };

  const goToNextSlide = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % carouselData.length);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <div className="relative min-h-screen">
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat transition-all duration-1000"
        style={{
          backgroundImage: `url(${carouselData[currentImageIndex].image})`,
        }}
      />
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50" />

      <nav className="relative z-10 flex justify-between items-center p-6 text-white">
        <div className="text-2xl font-bold">Houston Zoo</div>
        <ul className="flex space-x-4">
          <li className="relative" ref={dropdownRef}>
            <a className="hover:underline" onClick={toggleDropdown}>
              Plan Your Visit
            </a>
            {isDropdownOpen && (
              <ul className="absolute left-0 mt-2 w-40 bg-white text-black text-sm shadow-lg z-20">
                {[
                  "Hours",
                  "Tickets",
                  "Zoo Map",
                  "Events",
                  "Exhibits",
                  "Animals",
                ].map((item) => (
                  <li key={item} className="p-2 hover:bg-gray-200">
                    <a href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </li>
          <li>
            {signedIn ? (
              <a href="/profile" className="hover:underline">
                View Profile
              </a>
            ) : (
              <a href="/login" className="hover:underline">
                Login / Sign Up
              </a>
            )}
          </li>
          <li>
            <a href="/memberships" className="hover:underline">
              {signedIn ? "View Membership" : "Memberships"}
            </a>
          </li>
        </ul>
      </nav>

      <div className="absolute bottom-1/3 left-0 right-0 flex flex-col items-center justify-center z-10 text-white">
        <h2 className="text-4xl md:text-5xl font-bold text-center">
          {carouselData[currentImageIndex].message}
        </h2>
        <button
          className="mt-8 bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition duration-300"
          onClick={() =>
            (window.location.href = carouselData[currentImageIndex].buttonLink)
          }
        >
          Learn More
        </button>
      </div>

      <div className="absolute inset-0 flex justify-between items-center px-6">
        <button
          onClick={goToPreviousSlide}
          className="bg-black bg-opacity-50 text-white p-2 rounded-full"
        >
          &lt;
        </button>
        <button
          onClick={goToNextSlide}
          className="bg-black bg-opacity-50 text-white p-2 rounded-full"
        >
          &gt;
        </button>
      </div>

      <div className="fixed bottom-4 right-4 z-10">
        <button className="bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700">
          Chat with Us
        </button>
      </div>
    </div>
  );
}

// import React, { useState, useEffect, useRef } from 'react';

// const carouselData = [
//   {
//     image: 'https://cdn.prod.website-files.com/63e51157295a654688a15aca/63e540072e4d298ea274be3b_guinea%20pig%20gamer.png',
//     message: 'Upcoming Dolphin Show - Don\'t miss it!',
//     buttonLink: '/dolphin-show'
//   },
//   {
//     image: 'https://images.nightcafe.studio/jobs/V8qs4d5o2VPu8hJSeYmu/V8qs4d5o2VPu8hJSeYmu--1--47trm_4x.jpg?tr=w-1600,c-at_max',
//     message: 'Halloween Special Sales - Spooky Discounts!',
//     buttonLink: '/halloween-sales'
//   },
//   {
//     image: 'https://images.nightcafe.studio/jobs/MsTuElvCNcnAmCCzS1W0/MsTuElvCNcnAmCCzS1W0--1--jb3ap.jpg?tr=w-1600,c-at_max',
//     message: 'End of Year Merch Sale - Get Your Souvenirs!',
//     buttonLink: '/year-end-sale'
//   }
// ];

// function App() {
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const dropdownRef = useRef(null);
//   const signedIn = false //true; // Change this to `true` if the user is logged in

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentImageIndex((prevIndex) => (prevIndex + 1) % carouselData.length);
//     }, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsDropdownOpen(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   const goToPreviousSlide = () => {
//     setCurrentImageIndex((prevIndex) => (prevIndex - 1 + carouselData.length) % carouselData.length);
//   };

//   const goToNextSlide = () => {
//     setCurrentImageIndex((prevIndex) => (prevIndex + 1) % carouselData.length);
//   };

//   const toggleDropdown = () => {
//     setIsDropdownOpen((prev) => !prev);
//   };

//   return (
//     <div className="relative min-h-screen">
//       <div
//         className="absolute top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat transition-all duration-1000"
//         style={{ backgroundImage: `url(${carouselData[currentImageIndex].image})` }}
//       ></div>

//       <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50"></div>

//       <nav className="relative z-10 flex justify-between items-center p-6 text-white">
//         <div className="text-2xl font-bold">Houston Zoo</div>
//         <ul className="flex space-x-4">
//           <li className="relative" ref={dropdownRef}>
//             <a

//               className="hover:underline"
//               onClick={toggleDropdown}
//             >
//               Plan Your Visit
//             </a>
//             {isDropdownOpen && (
//               <ul className="absolute left-0 mt-2 w-40 bg-white text-black text-sm shadow-lg z-20">
//                 <li className="p-2 hover:bg-gray-200"><a href="/hours">Hours</a></li>
//                 <li className="p-2 hover:bg-gray-200"><a href="/tickets">Tickets</a></li>
//                 <li className="p-2 hover:bg-gray-200"><a href="/map">Zoo Map</a></li>
//                 <li className="p-2 hover:bg-gray-200"><a href="/parking">Parking</a></li>
//                 <li className="p-2 hover:bg-gray-200"><a href="/events">Events</a></li>
//                 <li className="p-2 hover:bg-gray-200"><a href="/attractions">Attractions</a></li>
//                 <li className="p-2 hover:bg-gray-200"><a href="/exhibits">Exhibits</a></li>
//               </ul>
//             )}
//           </li>
//           <li>
//             {signedIn ? (
//               <a href="/profile" className="hover:underline">View Profile</a>
//             ) : (
//               <a href="/login" className="hover:underline">Login / Sign Up</a>
//             )}
//           </li>
//           <li>
//             <a href="/memberships" className="hover:underline">
//               {signedIn ? "View Membership" : "Memberships"}
//             </a>
//           </li>
//         </ul>
//       </nav>

// 			<div className="absolute bottom-1/3 left-0 right-0 flex flex-col items-center justify-center z-10 text-white">
// 			<h2 className="text-4xl md:text-5xl font-bold text-center">{carouselData[currentImageIndex].message}</h2>
// 			<button
// 			className="mt-8 bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition duration-300"
// 			onClick={() => window.location.href = carouselData[currentImageIndex].buttonLink}
// 			>
// 			Learn More
// 			</button>
// import * as React from "react";

// import { Card, CardContent } from "@/components/ui/card";
// import {
// 	Carousel,
// 	CarouselContent,
// 	CarouselItem,
// 	CarouselNext,
// 	CarouselPrevious,
// } from "@/components/ui/carousel";

// export default function App() {
// 	const [api, setApi] = React.useState(undefined);
// 	const [current, setCurrent] = React.useState(0);
// 	const [count, setCount] = React.useState(0);
// 	const [imagesLinks] = React.useState([
// 		"img/casey-allen-H3U_HA1arI4-unsplash.jpg",
// 		"img/gwen-weustink-I3C1sSXj1i8-unsplash.jpg",
// 		"img/jake-weirick-6TyC5S5xnvM-unsplash.jpg",
// 		"img/sutirta-budiman-Jgiv1rSIpVM-unsplash.jpg",
// 	]);

// 	React.useEffect(() => {
// 		if (!api) {
// 			return;
// 		}

// 		setCount(api.scrollSnapList().length);
// 		setCurrent(api.selectedScrollSnap() + 1);

// 		api.on("select", () => {
// 			setCurrent(api.selectedScrollSnap() + 1);
// 		});
// 	}, [api]);

// 	return (
// 		<div className="w-full">
// 			<Carousel setApi={setApi} className="w-full h-[30rem]">
// 				<CarouselContent>
// 					{imagesLinks.map((ref, index) => (
// 						<CarouselItem key={index}>
// 							<img
// 								src={ref}
// 								alt="carousel image"
// 								className="w-full h-[30rem] object-fill"
// 							/>
// 						</CarouselItem>
// 					))}
// 				</CarouselContent>
// 				<CarouselPrevious />
// 				<CarouselNext />
// 			</Carousel>
// 			<div className="py-2 text-center text-sm text-muted-foreground">
// 				Slide {current} of {count}
// 			</div>
// 		</div>

//       <div className="absolute inset-0 flex justify-between items-center px-6">
//         <button onClick={goToPreviousSlide} className="bg-black bg-opacity-50 text-white p-2 rounded-full">
//           &lt;
//         </button>
//         <button onClick={goToNextSlide} className="bg-black bg-opacity-50 text-white p-2 rounded-full">
//           &gt;
//         </button>
//       </div>

//       <div className="fixed bottom-4 right-4 z-10">
//         <button className="bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700">
//           Chat with Us
//         </button>
//       </div>
//     </div>
//   );
// }
// export default App;
