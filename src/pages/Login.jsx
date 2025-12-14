import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import { useAuth } from "../hooks/useAuth";

export default function Login() {
  const navigate = useNavigate();
  const { loginUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const user = await login({ email, password });
      loginUser(user);
      navigate("/dashboard");
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
      <div className="w-full max-w-md p-8 rounded-xl bg-gray-900 shadow-lg">
        <h1 className="text-2xl font-semibold mb-2">Welcome back</h1>
        <p className="text-gray-400 mb-6">
          Sign in to your bank account
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email address"
            className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded bg-blue-600 hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="text-xs text-gray-500 mt-6 text-center">
          Demo app — credentials are not verified
        </p>
      </div>
    </div>
  );
}
