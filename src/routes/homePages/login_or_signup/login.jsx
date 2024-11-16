
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner"; // For showing success/error messages

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/member/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      setIsLoading(false);

      if (!response.ok) {
        toast.error("Invalid email or password");
        setError("Invalid email or password. Please try again.");
        return;
      }

      const data = await response.json();
      console.log(data.data);

      toast.success("Login successful");
      // Pass user data to the profile page (similar to the original approach)
      navigate("/profile", { state: data });
    } catch (error) {
      setIsLoading(false);
      toast.error("An error occurred. Please try again.");
      setError("An error occurred. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-b from-green-200 to-green-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <button
          onClick={() => navigate("/")}
          className="text-blue-600 hover:underline mb-4"
        >
          Back to home
        </button>

        <h1 className="text-3xl font-bold mb-4 text-center text-green-800">
          Welcome Back!
        </h1>
        <p className="text-center text-gray-600 mb-4">
          Log in to continue your adventure!
        </p>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-gray-700">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Log In"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-gray-600">Don't have an account?</p>
          <a href="/signup" className="text-green-600 hover:underline">
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
}
