

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner"; // Optional: For success/error messages

export default function MembershipPage() {
  const [user, setUser] = useState(null);
  const [membershipStatus, setMembershipStatus] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    console.log(storedUser);
    console.log(storedUser?.data?.membership);

    if (storedUser) {
      setUser(storedUser);
      setMembershipStatus(storedUser.data.membership);
    }
  }, []);

  const handleMembershipAction = async () => {
    if (!user) {
      toast.error("User not found. Please log in again.");
      navigate("/login");
      return;
    }

    const visitorId = user.data.visitor_id;
    const url = `${import.meta.env.VITE_API_URL}/public/profile/${visitorId}`;
    const updatedMembership = membershipStatus ? 0 : 1;

    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ membership: updatedMembership }),
      });

      if (!response.ok) {
        throw new Error("Failed to update membership");
      }

      const responseData = await response.json();
      console.log(responseData);

      toast.success(responseData.message || "Membership updated successfully!");

      // Update local state and localStorage
      const updatedUser = {
        ...user,
        data: {
          ...user.data,
          membership: updatedMembership,
        },
      };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      setMembershipStatus(updatedMembership);

      // Navigate to profile page with updated membership data
      navigate("/profile", { state: updatedUser });
    } catch (error) {
      console.error("Error updating membership:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="h-screen bg-green-50 relative">
      {/* Back to Home Button */}
      <div className="absolute top-4 left-4">
        <a
          href="/"
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-blue-600 shadow-md"
        >
          Back to Home
        </a>
      </div>

      <div className="flex items-center justify-center h-full">
        <div className="w-full max-w-4xl p-6">
          <h1 className="text-3xl font-bold text-center mb-6">
            Zoo Membership Types
          </h1>

          <div className="space-y-4">
            {/* Basic Membership */}
            <div className="p-4 bg-white rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-2">Basic Membership</h2>
              <p className="text-gray-700 mb-4">
                Enjoy unlimited visits for one adult and access to special
                events throughout the year.
              </p>
              <ul className="list-disc list-inside mb-4">
                <li>Free admission for one adult</li>
                <li>Invitations to member-only events</li>
                <li>10% discount at the gift shop</li>
              </ul>
              <button
                onClick={handleMembershipAction}
                className={`px-4 py-2 rounded ${
                  membershipStatus
                    ? "bg-red-500 hover:bg-red-600 text-white"
                    : "bg-blue-500 hover:bg-blue-600 text-white"
                }`}
              >
                {membershipStatus ? "Cancel Membership" : "Select Membership"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
