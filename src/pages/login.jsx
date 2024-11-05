import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
// import Modal from "../components/Modal";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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

      // onClose();

      navigate("/");
    } catch (error) {
      // console.log(error);
      setError(error.response ? error.response.data.message : "Network error");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-6">
      <div className="flex rounded-lg shadow-xl md:flex-row md:gap-4">
        <div className="flex flex-col justify-center p-6">
          <Link to="/">
            <img className="mx-auto w-[50px] h-[50px]" src="/trip.png" alt="" />
          </Link>
          <h1 className="text-3xl font-bold">Log in</h1>

          <p className="mt-4 text-sm">
            {" "}
            If you already a member, easily log in
          </p>

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
              className="p-2 border border-orange-300 rounded-lg focus:outline-none"
            />

            <label htmlFor="password">Password</label>
            <div className="flex justify-between p-2 border border-orange-300 rounded-lg">
              <input
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Input password"
                className="focus:outline-none"
              ></input>
              <div onClick={() => setShowPassword(!showPassword)} className="cursor-pointer">
                {showPassword ? <VisibilityIcon sx={{ fontSize: 20 }} /> : <VisibilityOffIcon sx={{ fontSize: 20 }} />}
              </div>
            </div>
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
        <div className="hidden w-[500px] md:block">
          <img src="/login.png" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Login;
