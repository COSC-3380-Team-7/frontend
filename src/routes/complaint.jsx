
import React, { useState, useEffect } from "react";

export default function Complaint() {
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("");
  const [complaint, setComplaint] = useState("");
  const [exhibits, setExhibits] = useState([]);
  const [selectedExhibit, setSelectedExhibit] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Fetch logged-in user data from localStorage
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    } else {
      alert("Please log in to submit a complaint.");
    }

    // Fetch exhibits for the dropdown
    const fetchExhibits = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/public/exhibit`);
        if (!response.ok) {
          throw new Error("Failed to fetch exhibits");
        }
        const data = await response.json();
        setExhibits(data.data); // Assuming API returns { data: [...] }
      } catch (error) {
        console.error("Error fetching exhibits:", error);
      }
    };

    fetchExhibits();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !complaint || !selectedExhibit) {
      alert("All fields are required.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/public/complaints`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          visitor_id: user.data.visitor_id,
          title,
          complaint,
          exhibit_id: selectedExhibit,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit complaint");
      }

      alert("Complaint submitted successfully!");
      setTitle("");
      setComplaint("");
      setSelectedExhibit("");
    } catch (error) {
      console.error("Error submitting complaint:", error);
      alert("An error occurred while submitting the complaint. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return <p>Please log in to submit a complaint.</p>;
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-xl bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Submit a Complaint</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
              placeholder="Enter a title for your complaint"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Complaint</label>
            <textarea
              value={complaint}
              onChange={(e) => setComplaint(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
              placeholder="Describe your issue or concern"
              rows="5"
              required
            ></textarea>
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Exhibit</label>
            <select
              value={selectedExhibit}
              onChange={(e) => setSelectedExhibit(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
              required
            >
              <option value="">Select an exhibit</option>
              {console.log(exhibits)}
              {exhibits.map((exhibit) => (
                
                <option key={exhibit.exhibit_id} value={exhibit.exhibit_id}>
                  {exhibit.exhibit_name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-green-500 text-white p-2 rounded ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-green-600"
              }`}
            >
              {isSubmitting ? "Submitting..." : "Submit Complaint"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
