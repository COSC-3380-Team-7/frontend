// import React, { useState, useEffect } from 'react';

// export default function Events() {
// 	const [eventsData, setEventsData] = useState([]); // Initialize events data as an empty array
// 	const [isLoading, setIsLoading] = useState(true); // Loading state

// 	useEffect(() => {
// 		// Function to fetch data from the API
// 		async function fetchData() {
// 			try {
// 				const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/event`);
// 				setIsLoading(false);

// 				if (!res.ok) {
// 					console.error("Failed to fetch events data", res);
// 					return;
// 				}

// 				const data = await res.json();
// 				console.log(data)
// 				setEventsData(data.data); // Update eventsData state with fetched data
// 			} catch (error) {
// 				console.error("Error fetching events data:", error);
// 				setIsLoading(false);
// 			}
// 		}

// 		fetchData();
// 	}, []);

// 	// Conditional rendering based on loading state
// 	// if (isLoading) {
// 	// 	return <Loading />; // Assumes you have a Loading component
// 	// }

// 	return (
// 		<div className="min-h-screen bg-gray-100 p-8">
// 			<h1 className="text-4xl font-bold text-center mb-10">Upcoming Events</h1>

// 			<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
// 				{eventsData.map((event, index) => (
// 					<div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
// 						<img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
// 						<div className="p-6">
// 							<h2 className="text-2xl font-semibold mb-2">{event.title}</h2>
// 							<p className="text-gray-600 mb-4">{event.date}</p>
// 							<p className="text-gray-700 mb-6">{event.description}</p>
// 							<a
// 								href={event.link}
// 								className="block text-center bg-green-600 text-white py-2 rounded hover:bg-green-700 transition duration-300"
// 							>
// 								Learn More
// 							</a>
// 						</div>
// 					</div>
// 				))}
// 			</div>
// 		</div>
// 	);
// }
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Events() {
  const [eventsData, setEventsData] = useState([]); // Initialize events data as an empty array
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const navigate = useNavigate(); // Initialize navigate function from react-router-dom

  // Function to go back to the home page
  const goBackToHome = () => {
    navigate("/"); // Navigate to the home page
  };

  useEffect(() => {
    // Function to fetch data from the API
    async function fetchData() {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/event`);
        setIsLoading(false);

        if (!res.ok) {
          console.error("Failed to fetch events data", res);
          return;
        }

        const data = await res.json();
        console.log(data);
        setEventsData(data.data); // Update eventsData state with fetched data
      } catch (error) {
        console.error("Error fetching events data:", error);
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Go Back Button */}
      <button
        onClick={goBackToHome} // Trigger navigation on click
        className="absolute top-10 left-10 bg-gray-300 p-2 rounded-full hover:bg-gray-400 transition"
      >
        <span className="text-xl">&larr;</span> {/* Left arrow symbol */}
      </button>

      <h1 className="text-4xl font-bold text-center mb-10">Upcoming Events</h1>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {eventsData.map((event, index) => {
          // Format date and time for display
          const eventDate = new Date(event.event_date).toLocaleDateString(
            "en-US",
            {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            }
          );
          const startTime = new Date(
            `1970-01-01T${event.start_time}Z`
          ).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          });
          const endTime = new Date(
            `1970-01-01T${event.end_time}Z`
          ).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          });

          return (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md border border-gray-200 p-6 transform transition-transform duration-200 hover:scale-105"
            >
              <h2 className="text-2xl font-semibold mb-2">{event.name}</h2>
              <p className="text-gray-600 mb-4">
                <span className="font-bold">Date:</span> {eventDate}
              </p>
              <p className="text-gray-600 mb-4">
                <span className="font-bold">Time:</span> {startTime} - {endTime}
              </p>
              <p className="text-gray-700 mb-6">{event.description}</p>
              {/* Uncomment the following line if you want to display a "Learn More" button */}
              {/* <a 
								href={event.link || "#"} 
								className="block text-center bg-green-600 text-white py-2 rounded hover:bg-green-700 transition duration-300"
							>
								Learn More
							</a> */}
            </div>
          );
        })}
      </div>
    </div>
  );
}
