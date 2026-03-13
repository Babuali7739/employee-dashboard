import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = login(username, password);

    if (success) {
      navigate("/Home");
    } else {
      alert("Invalid credentials");
    }
  };

  return (

    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-xl w-80"
      >

        <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">
          Employee Login
        </h2>

        <input
          placeholder="Username"
          className="border border-gray-300 p-2 mb-4 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          placeholder="Password"
          type="password"
          className="border border-gray-300 p-2 mb-4 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 transition text-white p-2 w-full rounded-md font-semibold"
        >
          Login
        </button>

        <p className="text-center text-sm text-gray-500 mt-4">
          Demo Credentials: testuser / Test123
        </p>

      </form>

    </div>

  );
};

export default Login;