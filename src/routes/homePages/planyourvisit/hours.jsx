import { useNavigate } from "react-router-dom"; // Import navigate function from react-router-dom

export default function Hours() {
  const navigate = useNavigate(); // Initialize navigate function

  const goBackToHome = () => {
    navigate("/"); // Navigate to the home page
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 relative">
      {/* Redirect button */}
      <button
        onClick={goBackToHome} // Trigger navigation on click
        className="absolute top-6 left-6 bg-gray-300 p-2 rounded-full hover:bg-gray-400 transition"
      >
        <span className="text-xl">&larr;</span>
      </button>

      <h1 className="text-4xl font-bold text-center mb-8">
        Hours of Operation
      </h1>
      <p className="text-center text-lg mb-8">
        Visit us at the Houston Zoo! Our hours are as follows:
      </p>

      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <table className="min-w-full border-collapse">
          <thead>
            <tr>
              <th className="border-b-2 border-gray-300 text-left p-4">Day</th>
              <th className="border-b-2 border-gray-300 text-left p-4">
                Hours
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border-b border-gray-200 p-4">Monday</td>
              <td className="border-b border-gray-200 p-4">
                10:00 AM - 5:00 PM
              </td>
            </tr>
            <tr>
              <td className="border-b border-gray-200 p-4">Tuesday</td>
              <td className="border-b border-gray-200 p-4">
                10:00 AM - 5:00 PM
              </td>
            </tr>
            <tr>
              <td className="border-b border-gray-200 p-4">Wednesday</td>
              <td className="border-b border-gray-200 p-4">
                10:00 AM - 5:00 PM
              </td>
            </tr>
            <tr>
              <td className="border-b border-gray-200 p-4">Thursday</td>
              <td className="border-b border-gray-200 p-4">
                10:00 AM - 5:00 PM
              </td>
            </tr>
            <tr>
              <td className="border-b border-gray-200 p-4">Friday</td>
              <td className="border-b border-gray-200 p-4">
                10:00 AM - 6:00 PM
              </td>
            </tr>
            <tr>
              <td className="border-b border-gray-200 p-4">Saturday</td>
              <td className="border-b border-gray-200 p-4">
                9:00 AM - 6:00 PM
              </td>
            </tr>
            <tr>
              <td className="p-4">Sunday</td>
              <td className="p-4">9:00 AM - 6:00 PM</td>
            </tr>
          </tbody>
        </table>

        <p className="mt-6 text-center text-sm text-gray-600">
          * Hours may vary during holidays and special events.
        </p>
      </div>
    </div>
  );
}
