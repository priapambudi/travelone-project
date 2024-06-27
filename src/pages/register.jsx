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
    <div>
      <h1 className="text-3xl font-bold">Sign Up</h1>
      <p className="my-2 text-sm">Please enter your details</p>
      {/* {token && <p className="text-black bg-green-400">{successMessage}</p>} */}
      {error && <p className="text-red-600 ">{error}</p>}
      {/* <form
        onSubmit={handleRegister}
        className="flex flex-col gap-2 mt-2 md:flex-row"
      >
        <div className="flex flex-col gap-2">
          <div>
            <label htmlFor="email">Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              name="email"
              id="email"
              placeholder="Email"
              className="p-1 border border-orange-300 rounded-lg"
            />
          </div>
          <div>
            <label htmlFor="name">Name</label>
            <input
              onChange={(e) => setName(e.target.value)}
              type="text"
              name="name"
              id="name"
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              name="password"
              id="password"
            />
          </div>
          <div>
            <label htmlFor="passwordrepeat">Password Repeat</label>
            <input
              onChange={(e) => setPasswordRepeat(e.target.value)}
              type="password"
              name="passwordrepeat"
              id="passwordrepeat"
            />
          </div>
        </div>

        <div>
          <div>
            <label htmlFor="role">Role</label>
            <select
              onChange={(e) => setRole(e.target.value)}
              value={role}
              name="role"
              id="role"
            >
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>
          <div>
            <label htmlFor="upload">Upload Img</label>
            <input
              onChange={(e) => setProfilePicture(e.target.files[0])}
              type="file"
              name="img"
              id="img"
            />
          </div>
          <div>
            <label htmlFor="phone">Phone</label>
            <input
              onChange={(e) => setPhoneNumber(e.target.value)}
              type="text"
              name="phone"
              id="phone"
            />
          </div>
          <button type="submit">Sign Up</button>
        </div>
      </form> */}

      <form onSubmit={handleRegister} className="flex flex-col space-y-4">
        <div className="grid grid-cols-2 gap-4">
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

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
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
  );
};

export default Register;
