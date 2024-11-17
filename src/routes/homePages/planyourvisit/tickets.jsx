import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook

export default function Ticket() {
  const ticketOptions = [
    {
      id: 1,
      name: "Children Ticket (Ages 3-12)",
      price: 10.0,
    },
    {
      id: 2,
      name: "Adult Ticket (Ages 13-65)",
      price: 10.0,
    },
    {
      id: 3,
      name: "Senior Ticket (Ages 65+)",
      price: 15.0,
    },
    {
      id: 4,
      name: "Veteran Ticket",
      price: 180.0,
    },
  ];

  const [ticketCounts, setTicketCounts] = useState(ticketOptions.map(() => 0));
  const [selectedDate, setSelectedDate] = useState(""); // State to manage selected date
  const navigate = useNavigate(); // Initialize useNavigate hook

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

  const isCheckoutDisabled = calculateSubtotal() === "0.00"; // Disable checkout if subtotal is 0

  const goBackToHome = () => {
    navigate("/"); // Navigate to the home page (or any route you want)
  };

  return (
    <div className="relative flex flex-col items-center justify-center bg-gray-100 p-6">
      {/* Go Back to Home Button */}

      {/* Left arrow symbol */}
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
            key={ticket.id}
            className="bg-white p-6 rounded-lg shadow-md text-center"
          >
            <h2 className="text-xl font-semibold mb-2">{ticket.name}</h2>
            <p className="text-gray-600 mb-4">{ticket.description}</p>
            <p className="text-green-600 font-bold mb-4">
              ${ticket.price.toFixed(2)}
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
