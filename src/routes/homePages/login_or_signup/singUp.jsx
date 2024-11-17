
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function SignUpPage() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [middleInitial, setMiddleInitial] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  async function handleSignUp(e) {
    e.preventDefault();

    setIsLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/public/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            first_name: firstName,
            middle_initial: middleInitial,
            last_name: lastName,
            email,
            password,
            membership: false, // Setting membership to false by default
          }),
        }
      );
      setIsLoading(false);

      if (!response.ok) {
        toast.error("Sign-up failed. Please try again.");
        return;
      }

      // Inform user of successful sign-up
      toast.success("Sign-up successful! Please log in to continue.");

      // Redirect to login page
      navigate("/login"); // Navigate to the login page
    } catch (error) {
      setIsLoading(false);
      toast.error("An error occurred. Please try again.");
      console.error("Sign-up error:", error);
    }
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-b from-green-200 to-green-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg border border-gray-300">
        <button
          onClick={() => navigate("/")}
          className="text-blue-600 hover:underline mb-4"
        >
          Back to home
        </button>

        <h1 className="text-3xl font-bold mb-4 text-center text-green-800">
          Join the Adventure!
        </h1>
        <p className="text-center text-gray-600 mb-4">
          Sign up to explore the wonders of the zoo!
        </p>

        <form onSubmit={handleSignUp} className="space-y-4">
          <div>
            <Label htmlFor="firstName">First Name</Label>
            <Input
              type="text"
              name="firstName"
              id="firstName"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="middleInitial">Middle Initial</Label>
            <Input
              type="text"
              name="middleInitial"
              id="middleInitial"
              placeholder="Middle Initial"
              value={middleInitial}
              onChange={(e) => setMiddleInitial(e.target.value)}
              maxLength="1"
            />
          </div>
          <div>
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button
            disabled={isLoading}
            className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Sign Up
          </Button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-green-600 hover:underline">
            Log In
          </a>
        </p>
      </div>
    </div>
  );
}
