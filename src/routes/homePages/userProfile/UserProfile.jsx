

// // import { useNavigate } from "react-router-dom";
// // import { useEffect, useState } from "react";

// // export default function UserProfile() {
// //     const navigate = useNavigate();
// //     const [userData, setUserData] = useState(null);
// //     const [tickets, setTickets] = useState([]);
// //     const [isLoading, setIsLoading] = useState(true);

// //     useEffect(() => {
// //         // Retrieve user data from localStorage
// //         const storedUser = JSON.parse(localStorage.getItem("user"));
// //         setUserData(storedUser);

// //         if (storedUser) {
// //             fetchTickets(storedUser.data.visitor_id);
// //         } else {
// //             console.warn("User not logged in. Redirecting to login...");
// //             navigate("/login");
// //         }
// //     }, [navigate]);

// //     const fetchTickets = async (visitorId) => {
// //         try {
// //             const response = await fetch(`${import.meta.env.VITE_API_URL}/public/ticketpurchases/${visitorId}`);
// //             if (!response.ok) {
// //                 throw new Error("Failed to fetch tickets");
// //             }
// //             const data = await response.json();

// //             // Group tickets by category, scheduled_date, and exhibit_name
// //             const groupedTickets = {};
// //             data.data.forEach((ticket) => {
// //                 const key = `${ticket.category}-${ticket.scheduled_date}-${ticket.exhibit_name}`;
// //                 if (!groupedTickets[key]) {
// //                     groupedTickets[key] = { ...ticket, totalQuantity: 0, totalPrice: 0 };
// //                 }
// //                 groupedTickets[key].totalQuantity += ticket.quantity_purchased;
// //                 groupedTickets[key].totalPrice += ticket.purchase_price;
// //             });

// //             setTickets(Object.values(groupedTickets));
// //         } catch (error) {
// //             console.error("Error fetching tickets:", error);
// //         } finally {
// //             setIsLoading(false);
// //         }
// //     };

// //     if (!userData) {
// //         return (
// //             <div className="min-h-screen flex items-center justify-center">
// //                 <p>User data not found. Please log in again.</p>
// //                 <button
// //                     onClick={() => navigate("/login")}
// //                     className="ml-4 bg-blue-500 text-white px-4 py-2 rounded"
// //                 >
// //                     Go to Login
// //                 </button>
// //             </div>
// //         );
// //     }

// //     return (
// //         <div className="min-h-screen bg-gradient-to-b from-gray-200 to-gray-50 p-10 flex justify-center items-center">
// //             <div className="bg-white w-full max-w-4xl p-10 rounded-lg shadow-lg">
// //                 <div className="text-center mb-10">
// //                     <h2 className="text-3xl font-bold text-gray-800">{userData.name}</h2>
// //                     <p className="text-gray-600">{userData.email}</p>
// //                     <div className="flex justify-center space-x-4 mt-2">
// //                         <span className="bg-yellow-300 text-yellow-800 font-semibold px-3 py-1 rounded-full text-sm">
// //                             {userData.data.membership === 1 ? (
// //                                 "Member 🌟"
// //                             ) : (
// //                                 <>
// //                                     Not a member{" "}
// //                                     <a
// //                                         href="/memberships"
// //                                         className="text-blue-600 underline hover:text-blue-800"
// //                                     >
// //                                         Become a Member
// //                                     </a>
// //                                 </>
// //                             )}
// //                         </span>
// //                     </div>
// //                 </div>

// //                 {/* Tickets Section */}
// //                 <div className="bg-gray-100 p-6 rounded-lg shadow-sm mb-8">
// //                     <h3 className="text-xl font-bold text-green-600 mb-4">Your Tickets</h3>
// //                     {isLoading ? (
// //                         <p>Loading tickets...</p>
// //                     ) : tickets.length > 0 ? (
// //                         <ul>
// //                             {tickets.map((ticket, index) => (
// //                                 <li key={index} className="flex justify-between text-gray-700 mb-2">
// //                                     <div>
// //                                         <strong>{ticket.category}</strong> - {ticket.scheduled_date.split("T")[0]}
// //                                         {ticket.exhibit_name && <span> @ {ticket.exhibit_name}</span>}
// //                                     </div>
// //                                     <div>
// //                                         Quantity: {ticket.totalQuantity} | ${ticket.totalPrice.toFixed(2)}
// //                                     </div>
// //                                 </li>
// //                             ))}
// //                         </ul>
// //                     ) : (
// //                         <p className="text-gray-500">No tickets found.</p>
// //                     )}
// //                 </div>

// //                 {/* Actions */}
// //                 <div className="flex justify-center space-x-4">
// //                     <button
// //                         onClick={() => navigate("/")}
// //                         className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition"
// //                     >
// //                         Back to Home
// //                     </button>
// //                     <button
// //                         onClick={() => navigate("/login")}
// //                         className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
// //                     >
// //                         Log Out
// //                     </button>
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // }


// import { useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";

// export default function UserProfile() {
//     const navigate = useNavigate();
//     const [userData, setUserData] = useState(null);
//     const [tickets, setTickets] = useState([]);
//     const [isLoading, setIsLoading] = useState(true);

//     useEffect(() => {
//         // Retrieve user data from localStorage
//         const storedUser = JSON.parse(localStorage.getItem("user"));
//         setUserData(storedUser);

//         if (storedUser) {
//             fetchTickets(storedUser.data.visitor_id);
//         } else {
//             console.warn("User not logged in. Redirecting to login...");
//             navigate("/login");
//         }
//     }, [navigate]);

//     const fetchTickets = async (visitorId) => {
//         try {
//             const response = await fetch(`${import.meta.env.VITE_API_URL}/public/ticketpurchases/${visitorId}`);
//             if (!response.ok) {
//                 throw new Error("Failed to fetch tickets");
//             }
//             const data = await response.json();

//             // Group tickets by category, scheduled_date, and exhibit_name
//             const groupedTickets = data.data.reduce((acc, ticket) => {
//                 const key = `${ticket.category}-${ticket.scheduled_date}-${ticket.exhibit_name}`;
//                 if (!acc[key]) {
//                     acc[key] = { ...ticket, quantity_purchased: 0, total_price: 0 };
//                 }
//                 acc[key].quantity_purchased += ticket.quantity_purchased;
//                 acc[key].total_price += ticket.purchase_price;
//                 return acc;
//             }, {});

//             setTickets(Object.values(groupedTickets));
//         } catch (error) {
//             console.error("Error fetching tickets:", error);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const groupTicketsByDate = (tickets) => {
//         return tickets.reduce((acc, ticket) => {
//             const date = ticket.scheduled_date.split("T")[0]; // Extract the date
//             if (!acc[date]) {
//                 acc[date] = [];
//             }
//             acc[date].push(ticket);
//             return acc;
//         }, {});
//     };

//     if (!userData) {
//         return (
//             <div className="min-h-screen flex items-center justify-center">
//                 <p>User data not found. Please log in again.</p>
//                 <button
//                     onClick={() => navigate("/login")}
//                     className="ml-4 bg-blue-500 text-white px-4 py-2 rounded"
//                 >
//                     Go to Login
//                 </button>
//             </div>
//         );
//     }

//     const groupedTickets = groupTicketsByDate(tickets);

//     return (
//         <div className="min-h-screen bg-gradient-to-b from-gray-200 to-gray-50 p-10 flex justify-center items-center">
//             <div className="bg-white w-full max-w-4xl p-10 rounded-lg shadow-lg">
//                 <div className="text-center mb-10">
//                     <h2 className="text-3xl font-bold text-gray-800">{userData.name}</h2>
//                     <p className="text-gray-600">{userData.email}</p>
//                     <div className="flex justify-center space-x-4 mt-2">
//                         <span className="bg-yellow-300 text-yellow-800 font-semibold px-3 py-1 rounded-full text-sm">
//                             {userData.data.membership === 1 ? (
//                                 "Member 🌟"
//                             ) : (
//                                 <>
//                                     Not a member{" "}
//                                     <a
//                                         href="/memberships"
//                                         className="text-blue-600 underline hover:text-blue-800"
//                                     >
//                                         Become a Member
//                                     </a>
//                                 </>
//                             )}
//                         </span>
//                     </div>
//                 </div>

//                 {/* Tickets Section */}
//                 <div className="bg-gray-100 p-6 rounded-lg shadow-sm mb-8">
//                     <h3 className="text-xl font-bold text-green-600 mb-4">Your Tickets</h3>
//                     {isLoading ? (
//                         <p>Loading tickets...</p>
//                     ) : Object.keys(groupedTickets).length > 0 ? (
//                         Object.keys(groupedTickets).map((date) => (
//                             <div key={date} className="mb-6">
//                                 <h4 className="text-lg font-bold text-gray-800 mb-2">Date: {date}</h4>
//                                 <table className="w-full bg-white shadow-md rounded text-left overflow-hidden">
//                                     <thead className="bg-gray-200">
//                                         <tr>
//                                             <th className="py-2 px-4">Category</th>
//                                             <th className="py-2 px-4">Exhibit</th>
//                                             <th className="py-2 px-4">Quantity</th>
//                                             <th className="py-2 px-4">Price</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         {groupedTickets[date].map((ticket, index) => (
//                                             <tr key={index} className="border-t">
//                                                 <td className="py-2 px-4">{ticket.category}</td>
//                                                 <td className="py-2 px-4">{ticket.exhibit_name || "N/A"}</td>
//                                                 <td className="py-2 px-4">{ticket.quantity_purchased}</td>
//                                                 <td className="py-2 px-4">${ticket.total_price.toFixed(2)}</td>
//                                             </tr>
//                                         ))}
//                                     </tbody>
//                                 </table>
//                             </div>
//                         ))
//                     ) : (
//                         <p className="text-gray-500">No tickets found.</p>
//                     )}
//                 </div>

//                 {/* Actions */}
//                 <div className="flex justify-center space-x-4">
//                     <button
//                         onClick={() => navigate("/")}
//                         className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition"
//                     >
//                         Back to Home
//                     </button>
//                     <button
//                         onClick={() => navigate("/login")}
//                         className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
//                     >
//                         Log Out
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// }
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function UserProfile() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [tickets, setTickets] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Retrieve user data from localStorage
        const storedUser = JSON.parse(localStorage.getItem("user"));
        setUserData(storedUser);

        if (storedUser) {
            fetchTickets(storedUser.data.visitor_id);
        } else {
            console.warn("User not logged in. Redirecting to login...");
            navigate("/login");
        }
    }, [navigate]);

    const fetchTickets = async (visitorId) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/public/ticketpurchases/${visitorId}`);
            if (!response.ok) {
                throw new Error("Failed to fetch tickets");
            }
            const data = await response.json();

            // Group tickets by category, scheduled_date, and exhibit_name
            const groupedTickets = data.data.reduce((acc, ticket) => {
                const key = `${ticket.category}-${ticket.scheduled_date}-${ticket.exhibit_name}`;
                if (!acc[key]) {
                    acc[key] = { ...ticket, quantity_purchased: 0, total_price: 0 };
                }
                acc[key].quantity_purchased += ticket.quantity_purchased;
                acc[key].total_price += ticket.purchase_price;
                return acc;
            }, {});

            setTickets(Object.values(groupedTickets));
        } catch (error) {
            console.error("Error fetching tickets:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const groupTicketsByDate = (tickets) => {
        return tickets.reduce((acc, ticket) => {
            const date = ticket.scheduled_date.split("T")[0]; // Extract the date
            if (!acc[date]) {
                acc[date] = [];
            }
            acc[date].push(ticket);
            return acc;
        }, {});
    };

    if (!userData) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>User data not found. Please log in again.</p>
                <button
                    onClick={() => navigate("/login")}
                    className="ml-4 bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Go to Login
                </button>
            </div>
        );
    }

    const groupedTickets = groupTicketsByDate(tickets);
console.log(userData)
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-200 to-gray-50 p-10 flex justify-center items-center">
            <div className="bg-white w-full max-w-4xl p-10 rounded-lg shadow-lg">
                <div className="text-center mb-10">
                    {/* <h2 className="text-3xl font-bold text-gray-800">{userData.data.first_name}</h2>
                    <h2 className="text-3xl font-bold text-gray-800">{userData.data.middle_initial}</h2>
                    <h2 className="text-3xl font-bold text-gray-800">{userData.data.last_name}</h2> */}
                    {/* <div className="flex items-center space-x-2">
    <h2 className="text-3xl font-bold text-gray-800">{userData.data.first_name}</h2>
    <h2 className="text-3xl font-bold text-gray-800">{userData.data.middle_initial}</h2>
    <h2 className="text-3xl font-bold text-gray-800">{userData.data.last_name}</h2>
</div> */}
                    {/* <div className="flex items-center justify-center h-screen"> */}
                      <div className="flex items-center justify-center space-x-2">
                          <h2 className="text-3xl font-bold text-gray-800">{userData.data.first_name}</h2>
                          <h2 className="text-3xl font-bold text-gray-800">{userData.data.middle_initial}</h2>
                          <h2 className="text-3xl font-bold text-gray-800">{userData.data.last_name}</h2>
                      </div>
                  {/* </div> */}


                    {/* <p className="text-gray-600">{userData.data.email}</p> */}
                    <div className="flex justify-center space-x-4 mt-2">
                        <span className="bg-yellow-300 text-yellow-800 font-semibold px-3 py-1 rounded-full text-sm">
                            {userData.data.membership === 1 ? (
                                "Member 🌟"
                            ) : (
                                <>
                                    Not a member{" "}
                                    <a
                                        href="/memberships"
                                        className="text-blue-600 underline hover:text-blue-800"
                                    >
                                        Become a Member
                                    </a>
                                </>
                            )}
                        </span>
                    </div>
                </div>

                {/* Tickets Section */}
                <div className="bg-gray-100 p-6 rounded-lg shadow-sm mb-8">
                    <h3 className="text-xl font-bold text-green-600 mb-4">Your Tickets</h3>
                    {isLoading ? (
                        <p>Loading tickets...</p>
                    ) : tickets.length > 0 ? (
                        Object.keys(groupedTickets).map((date) => (
                            <div key={date} className="mb-6">
                                <h4 className="text-lg font-bold text-gray-800 mb-2">Date: {date}</h4>
                                <table className="w-full bg-white shadow-md rounded text-left overflow-hidden">
                                    <thead className="bg-gray-200">
                                        <tr>
                                            <th className="py-2 px-4">Category</th>
                                            <th className="py-2 px-4">Exhibit</th>
                                            <th className="py-2 px-4">Quantity</th>
                                            <th className="py-2 px-4">Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {groupedTickets[date].map((ticket, index) => (
                                            <tr key={index} className="border-t">
                                                <td className="py-2 px-4">{ticket.category}</td>
                                                <td className="py-2 px-4">{ticket.exhibit_name || "N/A"}</td>
                                                <td className="py-2 px-4">{ticket.quantity_purchased}</td>
                                                <td className="py-2 px-4">${ticket.total_price.toFixed(2)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ))
                    ) : (
                        <div className="text-center bg-yellow-100 text-yellow-700 p-6 rounded-lg shadow-md">
                            <p className="mb-4 text-lg font-bold">No tickets so far.</p>
                            <a
                                href="/tickets"
                                className="text-blue-600 underline hover:text-blue-800 font-semibold"
                            >
                                Purchase tickets here
                            </a>
                        </div>
                    )}
                </div>

                {/* Actions */}
                <div className="flex justify-center space-x-4">
                    <button
                        onClick={() => navigate("/")}
                        className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition"
                    >
                        Back to Home
                    </button>
                    <button
                        onClick={() => navigate("/login")}
                        className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
                    >
                        Log Out
                    </button>
                </div>
            </div>
        </div>
    );
}
