// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom"; // Import useNavigate hook

// export default function Ticket() {
//   const [ticketOptions, setTicketOptions] = useState([]); // State for fetched ticket options
//   const [ticketCounts, setTicketCounts] = useState([]); // State for ticket counts
//   const [selectedDate, setSelectedDate] = useState(""); // State to manage selected date
//   const [isLoading, setIsLoading] = useState(true); // State to track loading state
//   const navigate = useNavigate(); // Initialize useNavigate hook

//   // Fetch ticket options from the database on component mount
//   useEffect(() => {

//     const fetchTickets = async () => {
//       try {
//         const response = await fetch(
//           `${import.meta.env.VITE_API_URL}/public/tickets`
//         );
//         console.log("API Response:", response); // Log the raw response
//         const data = await response.json();
//         console.log("Parsed Data:", data); // Log the parsed JSON data
//         setTicketOptions(data.data); // Set ticket options
//         setTicketCounts(data.data.map(() => 0)); // Initialize ticket counts
//         setIsLoading(false);
//         console.log(data)
//       } catch (error) {
//         console.error("Error fetching ticket options:", error);
//         setIsLoading(false);
//       }
//     };

//     fetchTickets();
//   }, []);

//   const handleIncrement = (index) => {
//     setTicketCounts(
//       ticketCounts.map((count, i) => (i === index ? count + 1 : count))
//     );
//   };
//   const handlePurchase = async () => {
//     try {
//       // Filter out tickets that were not purchased
//       const purchases = ticketOptions
//         .map((ticket, index) => ({
//           ticket_type_id: ticket.ticket_type_id,
//           quantity_purchased: ticketCounts[index],
//           purchase_price: ticketCounts[index] * ticket.price,
//         }))
//         .filter((purchase) => purchase.quantity_purchased > 0);

//       if (purchases.length === 0 || !selectedDate) {
//         alert("Please select tickets and a visit date.");
//         return;
//       }

//       const visitorId = localStorage.getItem("visitor_id"); // Replace with actual logic to retrieve visitor ID

//       const response = await fetch(
//         `${import.meta.env.VITE_API_URL}/public/ticketpurchases`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             visitor_id: visitorId,
//             purchase_date: new Date().toISOString().split("T")[0],
//             scheduled_date: selectedDate,
//             purchases,
//           }),
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to complete purchase");
//       }

//       const data = await response.json();
//       alert("Purchase successful!");
//       console.log("Purchase Response:", data);

//       // Reset the ticket counts and date after successful purchase
//       setTicketCounts(ticketOptions.map(() => 0));
//       setSelectedDate("");
//     } catch (error) {
//       console.error("Error during purchase:", error);
//       alert("An error occurred during purchase. Please try again.");
//     }
//   };

//   const handleDecrement = (index) => {
//     setTicketCounts(
//       ticketCounts.map((count, i) =>
//         i === index && count > 0 ? count - 1 : count
//       )
//     );
//   };

//   const calculateSubtotal = () => {
//     return ticketCounts
//       .reduce(
//         (total, count, index) => total + count * ticketOptions[index].price,
//         0
//       )
//       .toFixed(2);
//   };
//   // console.log(ticketOptions)

//   const isCheckoutDisabled = calculateSubtotal() === "0.00"; // Disable checkout if subtotal is 0

//   const goBackToHome = () => {
//     navigate("/"); // Navigate to the home page (or any route you want)
//   };
//   // if (isLoading) {
//   //   return (
//   //     <div className="min-h-screen flex items-center justify-center">
//   //       <p>Loading tickets...</p>
//   //     </div>
//   //   );
//   // }

//   return (
//     <div className="relative flex flex-col items-center justify-center bg-gray-100 p-6">
//       {/* Go Back to Home Button */}
//       <button
//         onClick={goBackToHome} // Trigger navigation on click
//         className="absolute top-10 left-10 bg-gray-300 p-2 rounded-full hover:bg-gray-400 transition"
//       >
//         <span className="text-xl">&larr;</span>
//       </button>
//       <h1 className="text-2xl font-bold text-center mb-8">Tickets</h1>
//       <div className="grid gap-6 lg:grid-cols-2">
//         {ticketOptions.map((ticket, index) => (
//           <div
//             key={ticket.ticket_type_id}
//             className="bg-white p-6 rounded-lg shadow-md text-center"
//           >
//             <h2 className="text-xl font-semibold mb-2">{ticket.category}</h2>
//             <p className="text-green-600 font-bold mb-4">
//               ${parseFloat(ticket.price).toFixed(2)}
//             </p>
//             <div className="flex items-center justify-center space-x-4">
//               <button
//                 onClick={() => handleDecrement(index)}
//                 className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
//               >
//                 -
//               </button>
//               <p className="text-lg">{ticketCounts[index]}</p>
//               <button
//                 onClick={() => handleIncrement(index)}
//                 className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 transition"
//               >
//                 +
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//       {/* Date Picker Section */}
//       <div className="mt-8 p-4 bg-white rounded-lg shadow-md w-full max-w-lg text-center">
//         <h2 className="text-xl font-semibold mb-4">Select Your Visit Date</h2>
//         <input
//           type="date"
//           value={selectedDate}
//           onChange={(e) => setSelectedDate(e.target.value)}
//           className="p-2 border rounded-md w-full max-w-xs"
//           min={new Date().toISOString().split("T")[0]} // Restricts selection to today and future dates
//         />
//       </div>
//       {/* Subtotal Section */}
//       <div className="mt-8 p-4 bg-white rounded-lg shadow-md w-full max-w-lg text-center">
//         <h2 className="text-xl font-semibold">Subtotal</h2>
//         <p className="text-green-700 font-bold text-2xl">
//           ${calculateSubtotal()}
//         </p>
//       </div>
//       {/* Checkout Button */}
//       <div className="mt-8">
//         {/* <button
//           disabled={isCheckoutDisabled} // Disable the button when subtotal is 0
//           className={`${
//             isCheckoutDisabled
//               ? "bg-gray-500 cursor-not-allowed"
//               : "bg-green-700 hover:bg-green-900"
//           } text-white px-6 py-2 rounded-lg transition`}
//         >
//           Confirm Purchase
//         </button> */}

// <button
//   onClick={handlePurchase}
//   disabled={isCheckoutDisabled} // Disable the button when subtotal is 0
//   className={`${
//     isCheckoutDisabled
//       ? "bg-gray-500 cursor-not-allowed"
//       : "bg-green-700 hover:bg-green-900"
//   } text-white px-6 py-2 rounded-lg transition`}
// >
//   Confirm Purchase
// </button>

//       </div>
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Ticket() {
  const [user, setUser] = useState(null); // State to store current user data
  const [ticketOptions, setTicketOptions] = useState([]); // State for fetched ticket options
  const [ticketCounts, setTicketCounts] = useState([]); // State for ticket counts
  const [selectedDate, setSelectedDate] = useState(""); // State to manage selected date
  const [isLoading, setIsLoading] = useState(true); // State to track loading state
  const navigate = useNavigate(); // Initialize useNavigate hook

  // Fetch user data from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    console.log("Retrieved User Data:", storedUser);

    if (storedUser) {
      setUser(storedUser);
    } else {
      console.warn("User not logged in. Redirecting to login...");
      navigate("/login"); // Redirect to login if user data is not found
    }
  }, [navigate]);

  // Fetch ticket options from the database
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/public/tickets`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch ticket data");
        }

        const data = await response.json();
        console.log("Fetched Ticket Data:", data);
        setTicketOptions(data.data); // Set ticket options
        setTicketCounts(data.data.map(() => 0)); // Initialize ticket counts
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching ticket options:", error);
        setIsLoading(false);
      }
    };

    fetchTickets();
  }, []);

  const handleIncrement = (index) => {
    setTicketCounts(
      ticketCounts.map((count, i) => (i === index ? count + 1 : count))
    );
  };

  const handleDecrement = (index) => {
    setTicketCounts(
      ticketCounts.map((count, i) =>
        i === index && count > 0 ? count - 1 : count
      )
    );
  };

  const calculateSubtotal = () => {
    return ticketCounts
      .reduce(
        (total, count, index) => total + count * ticketOptions[index].price,
        0
      )
      .toFixed(2);
  };

  // const handlePurchase = async () => {
  //   try {
  //     if (!user) {
  //       alert("User not found. Please log in.");
  //       navigate("/login");
  //       return;
  //     }

  //     // Filter out tickets that were not purchased
  //     const purchases = ticketOptions
  //       .map((ticket, index) => ({
  //         ticket_type_id: ticket.ticket_type_id,
  //         quantity_purchased: ticketCounts[index],
  //         purchase_price: ticketCounts[index] * ticket.price,
  //       }))
  //       .filter((purchase) => purchase.quantity_purchased > 0);

  //     if (purchases.length === 0 || !selectedDate) {
  //       alert("Please select tickets and a visit date.");
  //       return;
  //     }

  //     const visitorId = user.data.visitor_id; // Get visitor_id from user data

  //     const response = await fetch(
  //       `${import.meta.env.VITE_API_URL}/public/ticketpurchases`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           visitor_id: visitorId,
  //           purchase_date: new Date().toISOString().split("T")[0],
  //           scheduled_date: selectedDate,
  //           purchases,
  //         }),
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error("Failed to complete purchase");
  //     }

  //     const data = await response.json();
  //     alert("Purchase successful!");
  //     console.log("Purchase Response:", data);

  //     // Reset the ticket counts and date after successful purchase
  //     setTicketCounts(ticketOptions.map(() => 0));
  //     setSelectedDate("");
  //   } catch (error) {
  //     console.error("Error during purchase:", error);
  //     alert("An error occurred during purchase. Please try again.");
  //   }
  // };

  // const handlePurchase = async () => {
  //   try {
  //     // Filter out tickets that were not purchased
  //     const purchases = ticketOptions
  //       .map((ticket, index) => ({
  //         ticket_type_id: ticket.ticket_type_id,
  //         quantity_purchased: ticketCounts[index],
  //         purchase_price: ticketCounts[index] * ticket.price,
  //         exhibit_id: 1000000, // Default exhibit_id
  //       }))
  //       .filter((purchase) => purchase.quantity_purchased > 0);

  //     if (purchases.length === 0 || !selectedDate) {
  //       alert("Please select tickets and a visit date.");
  //       return;
  //     }

  //     const visitorId = user?.data?.visitor_id; // Get visitor_id from user data

  //     if (!visitorId) {
  //       alert("User not found. Please log in.");
  //       navigate("/login");
  //       return;
  //     }

  //     const response = await fetch(
  //       `${import.meta.env.VITE_API_URL}/public/ticketpurchases`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           visitor_id: visitorId,
  //           purchase_date: new Date().toISOString().split("T")[0],
  //           scheduled_date: selectedDate,
  //           purchases,
  //         }),
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error("Failed to complete purchase");
  //     }

  //     const data = await response.json();
  //     alert("Purchase successful!");
  //     console.log("Purchase Response:", data);

  //     // Reset the ticket counts and date after successful purchase
  //     setTicketCounts(ticketOptions.map(() => 0));
  //     setSelectedDate("");
  //   } catch (error) {
  //     console.error("Error during purchase:", error);
  //     alert("An error occurred during purchase. Please try again.");
  //   }
  // };

  const handlePurchase = async () => {
    try {
      // Filter out tickets that were not purchased
      const purchases = ticketOptions
        .map((ticket, index) => ({
          ticket_type_id: ticket.ticket_type_id,
          quantity_purchased: ticketCounts[index],
          purchase_price: ticketCounts[index] * ticket.price,
          exhibit_id: 1000000, // Explicitly set the default exhibit_id
        }))
        .filter((purchase) => purchase.quantity_purchased > 0);

      if (purchases.length === 0 || !selectedDate) {
        alert("Please select tickets and a visit date.");
        return;
      }

      const storedUser = JSON.parse(localStorage.getItem("user"));
      const visitorId = storedUser?.data?.visitor_id; // Get visitor_id from user data

      if (!visitorId) {
        alert("User not found. Please log in.");
        navigate("/login");
        return;
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/public/ticketpurchases`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            visitor_id: visitorId,
            purchase_date: new Date().toISOString().split("T")[0],
            scheduled_date: selectedDate,
            exhibit_id: 1000000,
            purchases,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to complete purchase");
      }

      const data = await response.json();
      alert("Purchase successful!");
      console.log("Purchase Response:", data);

      // Reset the ticket counts and date after successful purchase
      setTicketCounts(ticketOptions.map(() => 0));
      setSelectedDate("");
    } catch (error) {
      console.error("Error during purchase:", error);
      alert("An error occurred during purchase. Please try again.");
    }
  };

  const isCheckoutDisabled = calculateSubtotal() === "0.00"; // Disable checkout if subtotal is 0

  const goBackToHome = () => {
    navigate("/"); // Navigate to the home page
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading tickets...</p>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col items-center justify-center bg-gray-100 p-6">
      {/* Go Back to Home Button */}
      <button
        onClick={goBackToHome} // Trigger navigation on click
        className="absolute top-10 left-10 bg-gray-300 p-2 rounded-full hover:bg-gray-400 transition"
      >
        <span className="text-xl">&larr;</span>
      </button>
      <h1 className="text-2xl font-bold text-center mb-8">Tickets</h1>
      <div className="grid gap-6 lg:grid-cols-2">
        {ticketOptions.map((ticket, index) => (
          <div
            key={ticket.ticket_type_id}
            className="bg-white p-6 rounded-lg shadow-md text-center"
          >
            <h2 className="text-xl font-semibold mb-2">{ticket.category}</h2>
            <p className="text-green-600 font-bold mb-4">
              ${parseFloat(ticket.price).toFixed(2)}
            </p>
            <div className="flex items-center justify-center space-x-4">
              <button
                onClick={() => handleDecrement(index)}
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
              >
                -
              </button>
              <p className="text-lg">{ticketCounts[index]}</p>
              <button
                onClick={() => handleIncrement(index)}
                className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 transition"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* Date Picker Section */}
      <div className="mt-8 p-4 bg-white rounded-lg shadow-md w-full max-w-lg text-center">
        <h2 className="text-xl font-semibold mb-4">Select Your Visit Date</h2>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="p-2 border rounded-md w-full max-w-xs"
          min={new Date().toISOString().split("T")[0]} // Restricts selection to today and future dates
        />
      </div>
      {/* Subtotal Section */}
      <div className="mt-8 p-4 bg-white rounded-lg shadow-md w-full max-w-lg text-center">
        <h2 className="text-xl font-semibold">Subtotal</h2>
        <p className="text-green-700 font-bold text-2xl">
          ${calculateSubtotal()}
        </p>
      </div>
      {/* Checkout Button */}
      <div className="mt-8">
        <button
          onClick={handlePurchase}
          disabled={isCheckoutDisabled} // Disable the button when subtotal is 0
          className={`${
            isCheckoutDisabled
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-green-700 hover:bg-green-900"
          } text-white px-6 py-2 rounded-lg transition`}
        >
          Confirm Purchase
        </button>
      </div>
    </div>
  );
}
