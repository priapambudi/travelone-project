import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  // const [token, setToken] = useState(null);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [role, setRole] = useState("admin");
  const [profilePicture, setProfilePicture] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("image", profilePicture);

    try {
      const res = await axios.post(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/upload-image",
        formData,
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            "Content-Type": "multipart/form-data",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiI5NWE4MDNjMy1iNTFlLTQ3YTAtOTBkYi0yYzJmM2Y0ODE1YTkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2Nzk4NDM0NDR9.ETsN6dCiC7isPReiQyHCQxya7wzj05wz5zruiFXLx0k",
          },
        }
      );

      // console.log(res.data.url);
      return res.data.url;
    } catch (error) {
      // console.log(error);
      setError(error.response.data.message);
      return null;
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // First, upload the profile picture
    const profilePictureUrl = await handleUpload();

    if (!profilePictureUrl) {
      return; // Stop the registration process if the upload failed
    }

    const payload = {
      email: email,
      name: name,
      password: password,
      passwordRepeat: passwordRepeat,
      role: role,
      profilePictureUrl: profilePictureUrl, // Use the uploaded image URL
      phoneNumber: phoneNumber,
    };

    try {
      const res = await axios.post(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/register",
        payload,
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            "Content-Type": "application/json",
          },
        }
      );

      // console.log(res);
      // setToken(res.data.code);
      setSuccessMessage(res.data.message || "Registration successful");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      // console.log(error);
      setError(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-6">
      <div className="flex rounded-lg shadow-xl md:flex-row md:gap-4">
        <div className="flex flex-col justify-center p-6">
          <Link to="/">
            <img className="mx-auto w-[50px] h-[50px]" src="/trip.png" alt="" />
          </Link>
          <h1 className="text-3xl font-bold">Sign Up</h1>
          <p className="my-3 text-sm">Please enter your details</p>
          {error && <p className="text-red-600 ">{error}</p>}

          {successMessage && (
            <p className="text-green-600 ">{successMessage}</p>
          )}

          <form onSubmit={handleRegister} className="flex flex-col space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col">
                <label htmlFor="email" className="mb-1 text-sm font-medium">
                  Email
                </label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
                  name="email"
                  id="email"
                  placeholder="Email"
                  className="p-2 border border-orange-300 rounded-lg "
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="name" className="mb-1 text-sm font-medium">
                  Name
                </label>
                <input
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Name"
                  className="p-2 border border-orange-300 rounded-lg "
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="password" className="mb-1 text-sm font-medium">
                  Password
                </label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  className="p-2 border border-orange-300 rounded-lg "
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="passwordrepeat"
                  className="mb-1 text-sm font-medium"
                >
                  Password Repeat
                </label>
                <input
                  onChange={(e) => setPasswordRepeat(e.target.value)}
                  type="password"
                  name="passwordrepeat"
                  id="passwordrepeat"
                  placeholder="Repeat Password"
                  className="p-2 border border-orange-300 rounded-lg "
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-1">
              <div className="flex flex-col">
                <label htmlFor="role" className="mb-1 text-sm font-medium">
                  Role
                </label>
                <select
                  onChange={(e) => setRole(e.target.value)}
                  value={role}
                  name="role"
                  id="role"
                  className="p-2 border border-orange-300 rounded-lg "
                >
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="upload" className="mb-1 text-sm font-medium">
                  Upload Img
                </label>
                <input
                  onChange={(e) => setProfilePicture(e.target.files[0])}
                  type="file"
                  name="img"
                  id="img"
                  className="p-2 border border-orange-300 rounded-lg "
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="phone" className="mb-1 text-sm font-medium">
                  Phone
                </label>
                <input
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  type="text"
                  name="phone"
                  id="phone"
                  placeholder="Phone"
                  className="p-2 border border-orange-300 rounded-lg "
                />
              </div>
            </div>
            <button
              type="submit"
              className="p-2 bg-orange-300 rounded-lg hover:bg-orange-500 bg-"
            >
              Sign Up
            </button>
            <p className="text-center">
              Already have an account?{" "}
              <Link className="text-orange-500" to="/login">
                Log In
              </Link>
            </p>
          </form>
        </div>
        <div className="hidden w-[500px] h-full my-auto md:block">
          <img src="/register.png" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Register;
