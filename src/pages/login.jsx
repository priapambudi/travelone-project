import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Modal from "../components/Modal";

const Login = ({ onClose, isVisible }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const payload = {
      email: email,
      password: password,
    };

    // console.log("Payload:", payload);

    try {
      const res = await axios.post(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/login",
        payload,
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            "Content-Type": "application/json",
          },
        }
      );

      // console.log("Response:", res);
      // console.log("Response data:", res.data);

      setToken(res.data.token);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("name", res.data.data.email);
      localStorage.setItem("role", res.data.data.role);
      localStorage.setItem("img", res.data.data.profilePictureUrl);

      onClose();

      navigate("/");
    } catch (error) {
      // console.log(error);
      setError(error.response ? error.response.data.message : "Network error");
    }
  };

  return (
    <Modal
      onClose={onClose}
      isVisible={isVisible}
      width="w-[400px]"
      height="h-[550px]"
    >
      <div>
        <h1 className="text-3xl font-bold">Log in</h1>
        <p className="mt-4 text-sm"> If you already a member, easily log in</p>

        {token && <p className="mt-4 text-sm"> Successfully login </p>}
        {error && <p className="mt-4 text-sm text-red-500">{error}</p>}

        <form onSubmit={handleLogin} className="flex flex-col gap-3 mt-5">
          <label htmlFor="email">Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            name="email"
            id="email"
            placeholder="Input email"
            className="p-2 border border-orange-300 rounded-lg"
          />

          <label htmlFor="password">Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            id="password"
            placeholder="Input password"
            className="p-2 border border-orange-300 rounded-lg"
          />
          <button
            type="submit"
            className="p-2 mt-2 font-semibold bg-orange-300 rounded-lg hover:bg-orange-500"
          >
            Log In
          </button>
          <p className="text-center">
            Don't have an account yet?{" "}
            <Link className="text-orange-500" to="/register">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </Modal>
  );
};

export default Login;
