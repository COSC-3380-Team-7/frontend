export default function Ticket() {
  const ticketOptions = [
    {
      name: "General Admission",
      description: "Access to all public exhibits and attractions.",
      price: "$20.00",
    },
    {
      name: "Children's Ticket (Ages 3-12)",
      description: "Discounted ticket for children. Free for children under 3.",
      price: "$10.00",
    },
    {
      name: "Senior Ticket (Ages 65+)",
      description: "Discounted ticket for seniors.",
      price: "$15.00",
    },
    {
      name: "Membership Pass",
      description: "Annual access with member-only perks and discounts.",
      price: "$100.00",
    },
    {
      name: "Family Pass",
      description: "Annual access for two adults and up to three children.",
      price: "$180.00",
    },
  ];

  return (
    <div className="relative flex flex-col items-center justify-center bg-gray-100 p-6">
      {/* Go Back to Home Button */}
      <button
        onClick={goBackToHome} // Trigger navigation on click
        className="absolute top-10 left-10 bg-gray-300 p-2 rounded-full hover:bg-gray-400 transition"
      >
        <span className="text-xl">&larr;</span> {/* Left arrow symbol */}
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
          Checkout
        </button>
      </div>
    </div>
  );
}
