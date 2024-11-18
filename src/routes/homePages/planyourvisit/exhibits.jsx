
// // // import Loading from "@/components/Loading";
// // // import { useState, useEffect } from "react";

// // // export default function Exhibits() {
// // //     const [exhibitsData, setExhibitsData] = useState([]);
// // //     const [isLoading, setIsLoading] = useState(true);

// // //     useEffect(() => {
// // //         async function fetchData() {
// // //             try {
// // //                 // Fetch exhibits data
// // //                 const exhibitsResponse = await fetch(`${import.meta.env.VITE_API_URL}/public/exhibit`);
// // //                 if (!exhibitsResponse.ok) {
// // //                     console.error("Failed to fetch exhibits data", exhibitsResponse);
// // //                     return;
// // //                 }
// // //                 const exhibitsData = await exhibitsResponse.json();
// // //                 setExhibitsData(exhibitsData.data); // Assuming data is an array of exhibits
// // // 				console.log("exibits data:", exhibitsData.data)
// // //                 // Fetch habitats data
// // //                 const habitatsResponse = await fetch(`${import.meta.env.VITE_API_URL}/public/habitat`);
// // //                 if (!habitatsResponse.ok) {
// // //                     console.error("Failed to fetch habitats data", habitatsResponse);
// // //                     return;
// // //                 }
// // //                 const habitatsData = await habitatsResponse.json();
// // //                 console.log("Habitats data:", habitatsData.data); // Logging habitat data
// // //             } catch (error) {
// // //                 console.error("Error fetching data", error);
// // //             } finally {
// // //                 setIsLoading(false);
// // //             }
// // //         }

// // //         fetchData();
// // //     }, []);

// // //     if (isLoading) {
// // //         return <Loading />; // Assuming <Loading /> is a loading indicator component
// // //     }

// // //     return (
// // //         <div className="min-h-screen bg-gray-100 p-8">
// // //             <h1 className="text-4xl font-bold text-center mb-8">Exhibits</h1>
            
// // //             <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
// // //                 {exhibitsData.map((exhibit, index) => (
// // //                     <div 
// // //                         key={index} 
// // //                         className="relative bg-white rounded-lg overflow-hidden shadow-lg"
// // //                     >
// // //                         <div 
// // //                             className="h-48 bg-cover bg-center"
// // //                             style={{ backgroundImage: `url(${exhibit.image})` }}
// // //                         ></div>
                        
// // //                         <div className="p-6">
// // //                             <h2 className="text-2xl font-semibold mb-2">{exhibit.name}</h2>
// // //                             <p className="text-gray-600 mb-4">{exhibit.description}</p>
// // //                             <button 
// // //                                 className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
// // //                             >
// // //                                 Learn More
// // //                             </button>
// // //                         </div>
// // //                     </div>
// // //                 ))}
// // //             </div>
// // //         </div>
// // //     );
// // // }
// // import Loading from "@/components/Loading";
// // import { useState, useEffect } from "react";

// // export default function Exhibits() {
// //     const [exhibitsData, setExhibitsData] = useState([]);
// //     const [habitatsData, setHabitatsData] = useState([]);
// //     const [isLoading, setIsLoading] = useState(true);
// //     const [expandedExhibit, setExpandedExhibit] = useState(null);

// //     useEffect(() => {
// //         async function fetchData() {
// //             try {
// //                 // Fetch exhibits data
// //                 const exhibitsResponse = await fetch(`${import.meta.env.VITE_API_URL}/public/exhibit`);
// //                 if (!exhibitsResponse.ok) {
// //                     console.error("Failed to fetch exhibits data", exhibitsResponse);
// //                     return;
// //                 }
// //                 const exhibitsData = await exhibitsResponse.json();
// //                 setExhibitsData(exhibitsData.data);

// //                 // Fetch habitats data
// //                 const habitatsResponse = await fetch(`${import.meta.env.VITE_API_URL}/public/habitat`);
// //                 if (!habitatsResponse.ok) {
// //                     console.error("Failed to fetch habitats data", habitatsResponse);
// //                     return;
// //                 }
// //                 const habitatsData = await habitatsResponse.json();
// //                 setHabitatsData(habitatsData.data);
// //             } catch (error) {
// //                 console.error("Error fetching data", error);
// //             } finally {
// //                 setIsLoading(false);
// //             }
// //         }

// //         fetchData();
// //     }, []);

// //     const toggleDropdown = (exhibitId) => {
// //         setExpandedExhibit(exhibitId === expandedExhibit ? null : exhibitId);
// //     };

// //     if (isLoading) {
// //         return <Loading />;
// //     }

// //     return (
// //         <div className="min-h-screen bg-gray-100 p-8">
// //             <h1 className="text-4xl font-bold text-center mb-8">Exhibits</h1>
            
// //             <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
// //                 {exhibitsData.map((exhibit) => (
// //                     <div 
// //                         key={exhibit.exhibit_id} 
// //                         className="relative bg-white rounded-lg overflow-hidden shadow-lg"
// //                     >
// //                         <div 
// //                             className="h-48 bg-cover bg-center"
// //                             style={{ backgroundImage: `url(${exhibit.image || "default-image.jpg"})` }}
// //                         ></div>
                        
// //                         <div className="p-6">
// //                             <h2 className="text-2xl font-semibold mb-2">{exhibit.exhibit_name}</h2>
// //                             <p className="text-gray-600 mb-4">{exhibit.description}</p>
// //                             <button
// //                                 className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition mb-4"
// //                                 onClick={() => toggleDropdown(exhibit.exhibit_id)}
// //                             >
// //                                 {expandedExhibit === exhibit.exhibit_id ? "Hide Habitats" : "Learn More"}
// //                             </button>
// //                             {expandedExhibit === exhibit.exhibit_id && (
// //                                 <div className="mt-4 bg-gray-100 p-4 rounded">
// //                                     {habitatsData
// //                                         .filter((habitat) => habitat.exhibit_id === exhibit.exhibit_id)
// //                                         .map((habitat) => (
// //                                             <div key={habitat.habitat_id} className="mb-4">
// //                                                 <h3 className="text-lg font-semibold">{habitat.name}</h3>
// //                                                 <p className="text-gray-600">{habitat.description}</p>
// //                                                 <span className="text-sm text-green-600">
// //                                                     Status: {habitat.status_flag}
// //                                                 </span>
// //                                             </div>
// //                                         ))}
// //                                 </div>
// //                             )}
// //                         </div>
// //                     </div>
// //                 ))}
// //             </div>
// //         </div>
// //     );
// // }
// import Loading from "@/components/Loading";
// import { useState, useEffect } from "react";
// import { AdvancedImage } from "@cloudinary/react";
// import { cldClientSide } from "@/lib/cloudinary"; // Ensure this is correctly set up to initialize Cloudinary client

// export default function Exhibits() {
//     const [exhibitsData, setExhibitsData] = useState([]);
//     const [habitatsData, setHabitatsData] = useState([]);
//     const [isLoading, setIsLoading] = useState(true);
//     const [expandedExhibit, setExpandedExhibit] = useState(null);

//     useEffect(() => {
//         async function fetchData() {
//             try {
//                 // Fetch exhibits data
//                 const exhibitsResponse = await fetch(`${import.meta.env.VITE_API_URL}/public/exhibit`);
//                 if (!exhibitsResponse.ok) {
//                     console.error("Failed to fetch exhibits data", exhibitsResponse);
//                     return;
//                 }
//                 const exhibitsData = await exhibitsResponse.json();
//                 setExhibitsData(exhibitsData.data);

//                 // Fetch habitats data
//                 const habitatsResponse = await fetch(`${import.meta.env.VITE_API_URL}/public/habitat`);
//                 if (!habitatsResponse.ok) {
//                     console.error("Failed to fetch habitats data", habitatsResponse);
//                     return;
//                 }
//                 const habitatsData = await habitatsResponse.json();
//                 setHabitatsData(habitatsData.data);
//             } catch (error) {
//                 console.error("Error fetching data", error);
//             } finally {
//                 setIsLoading(false);
//             }
//         }

//         fetchData();
//     }, []);

//     const toggleDropdown = (exhibitId) => {
//         setExpandedExhibit(exhibitId === expandedExhibit ? null : exhibitId);
//     };

//     if (isLoading) {
//         return <Loading />;
//     }

//     return (
//         <div className="min-h-screen bg-gray-100 p-8">
//             <h1 className="text-4xl font-bold text-center mb-8">Exhibits</h1>
            
//             <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
//                 {exhibitsData.map((exhibit) => (
//                     <div 
//                         key={exhibit.exhibit_id} 
//                         className="relative bg-white rounded-lg overflow-hidden shadow-lg"
//                     >
//                         {/* <div className="h-48 w-full">
//                             {exhibit.image && (
//                                 <AdvancedImage
//                                     cldImg={cldClientSide.image(exhibit.image)} // Cloudinary image identifier
//                                     className="w-full h-full object-cover"
//                                 />
//                             )}
//                             {!exhibit.image && (
//                                 <div className="h-full w-full bg-gray-300 flex items-center justify-center text-gray-500">
//                                     No Image Available
//                                 </div>
//                             )}
//                         </div> */}
                        
//                         <div className="p-6">
//                             <h2 className="text-2xl font-semibold mb-2">{exhibit.exhibit_name}</h2>
//                             <p className="text-gray-600 mb-4">{exhibit.description}</p>
//                             <button
//                                 className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition mb-4"
//                                 onClick={() => toggleDropdown(exhibit.exhibit_id)}
//                             >
//                                 {expandedExhibit === exhibit.exhibit_id ? "Hide Habitats" : "Learn More"}
//                             </button>
//                             {expandedExhibit === exhibit.exhibit_id && (
//                                 <div className="mt-4 bg-gray-100 p-4 rounded">
//                                     {habitatsData
//                                         .filter((habitat) => habitat.exhibit_id === exhibit.exhibit_id)
//                                         .map((habitat) => (
//                                             <div key={habitat.habitat_id} className="mb-4">
//                                                 <h3 className="text-lg font-semibold">{habitat.name}</h3>
//                                                 <p className="text-gray-600">{habitat.description}</p>
//                                                 <span className="text-sm text-green-600">
//                                                     Status: {habitat.status_flag}
//                                                 </span>
//                                             </div>
//                                         ))}
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }

import Loading from "@/components/Loading";
import { useState, useEffect } from "react";
import { AdvancedImage } from "@cloudinary/react";
import { cldClientSide } from "@/lib/cloudinary"; // Ensure this is correctly set up to initialize Cloudinary client

export default function Exhibits() {
    const [exhibitsData, setExhibitsData] = useState([]);
    const [habitatsData, setHabitatsData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [expandedExhibit, setExpandedExhibit] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                // Fetch exhibits data
                const exhibitsResponse = await fetch(`${import.meta.env.VITE_API_URL}/public/exhibit`);
                if (!exhibitsResponse.ok) {
                    console.error("Failed to fetch exhibits data", exhibitsResponse);
                    return;
                }
                const exhibitsData = await exhibitsResponse.json();
                setExhibitsData(exhibitsData.data);

                // Fetch habitats data
                const habitatsResponse = await fetch(`${import.meta.env.VITE_API_URL}/public/habitat`);
                if (!habitatsResponse.ok) {
                    console.error("Failed to fetch habitats data", habitatsResponse);
                    return;
                }
                const habitatsData = await habitatsResponse.json();
                setHabitatsData(habitatsData.data);
            } catch (error) {
                console.error("Error fetching data", error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchData();
    }, []);

    const toggleDropdown = (exhibitId) => {
        setExpandedExhibit(exhibitId === expandedExhibit ? null : exhibitId);
    };

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-4xl font-bold text-center mb-8">Exhibits</h1>
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {exhibitsData.map((exhibit) => (
                    <div 
                        key={exhibit.exhibit_id} 
                        className="relative bg-white rounded-lg overflow-hidden shadow-lg"
                    >
                        {/* <div className="h-48 w-full">
                            {exhibit.image && (
                                <AdvancedImage
                                    cldImg={cldClientSide.image(exhibit.image)} // Cloudinary image identifier
                                    className="w-full h-full object-cover"
                                />
                            )}
                            {!exhibit.image && (
                                <div className="h-full w-full bg-gray-300 flex items-center justify-center text-gray-500">
                                    No Image Available
                                </div>
                            )}
                        </div> */}
                        
                        <div className="p-6">
                            <h2 className="text-2xl font-semibold mb-2">{exhibit.exhibit_name}</h2>
                            <p className="text-gray-600 mb-4">{exhibit.description}</p>
                            <button
                                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition mb-4"
                                onClick={() => toggleDropdown(exhibit.exhibit_id)}
                            >
                                {expandedExhibit === exhibit.exhibit_id ? "Hide Habitats" : "Learn More"}
                            </button>
                            {expandedExhibit === exhibit.exhibit_id && (
                                <div className="mt-4 bg-gray-100 p-4 rounded">
                                    {habitatsData.filter((habitat) => habitat.exhibit_id === exhibit.exhibit_id).length === 0 ? (
                                        <p className="text-gray-500 italic">
                                            No open habitats at the moment for this exhibit. Please check back later.
                                        </p>
                                    ) : (
                                        habitatsData
                                            .filter((habitat) => habitat.exhibit_id === exhibit.exhibit_id)
                                            .map((habitat) => (
                                                <div key={habitat.habitat_id} className="mb-4">
                                                    <h3 className="text-lg font-semibold">{habitat.name}</h3>
                                                    <p className="text-gray-600">{habitat.description}</p>
                                                    <span className="text-sm text-green-600">
                                                        Status: {habitat.status_flag}
                                                    </span>
                                                </div>
                                            ))
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
