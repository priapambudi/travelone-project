import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const EditProfile = () => {
  //   const { state } = useLocation();
  //   const { profile } = state || {};
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

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

      return res.data.url;
    } catch (error) {
      // console.log(error);
      setError(error.response.data.message);
      return null;
    }
  };

  const handleEditProfile = async (e) => {
    e.preventDefault();

    const profilePictureUrl = await handleUpload();

    const payload = {
      name: name,
      email: email,
      phoneNumber: phoneNumber,
      profilePictureUrl: profilePictureUrl,
    };

    try {
      const res = await axios.post(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-profile",
        payload,
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFiaTFAZ21haWwuY29tIiwidXNlcklkIjoiMmNmZWM1ODctMDAxMC00MjJiLWE5MTgtZDIzODg1MGI4YzgyIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzE5NDUxNzMyfQ.orH7mF3aBfbPqaPyUvLfgrqqNCIAG6yK7iM6w02NSIw",
          },
        }
      );

      //   console.log(res);
      setSuccess(res.data.message || "Profile updated successfully");

      //   if (res.data.code === 200) {
      //     localStorage.setItem(
      //       "profile",
      //       JSON.stringify({
      //         name: name,
      //         email: email,
      //         phoneNumber: phoneNumber,
      //         profilePictureUrl: profilePictureUrl,
      //       })
      //     );
      //   }

      navigate("/profile");
    } catch (error) {
      setError(error.response.data.message || "Failed to update profile");
    }
  };

  //   useEffect(() => {
  //     if (profile) {
  //       setName(profile.name);
  //       setEmail(profile.email);
  //       setPhoneNumber(profile.phoneNumber);
  //     }
  //   }, [profile]);

  return (
    <div>
      <h1 className="text-3xl font-bold">Edit Your Profile</h1>
      {/* <p className="mt-4 text-sm"> If you already a member, easily log in</p> */}

      {/* {token && <p className="mt-4 text-sm"> Successfully login </p>}
      {error && <p className="mt-4 text-sm text-red-500">{error}</p>} */}

      <form onSubmit={handleEditProfile} className="flex flex-col gap-3 mt-5">
        <label htmlFor="email">Email</label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          //   value={email}
          id="email"
          placeholder="Input email"
          className="p-2 border border-orange-300 rounded-lg"
        />

        <label htmlFor="name">Name</label>
        <input
          onChange={(e) => setName(e.target.value)}
          type="text"
          //   value={name}
          id="name"
          placeholder="Input name"
          className="p-2 border border-orange-300 rounded-lg"
        />

        <label htmlFor="phone">Phone</label>
        <input
          onChange={(e) => setPhoneNumber(e.target.value)}
          type="text"
          //   value={phoneNumber}
          id="phone"
          placeholder="Input phone number"
          className="p-2 border border-orange-300 rounded-lg "
        />

        <label htmlFor="upload" className="mb-1 text-sm font-medium">
          Upload Img
        </label>
        <input
          onChange={(e) => setProfilePicture(e.target.files[0])}
          type="file"
          //   value={profilePicture}
          id="img"
          className="p-2 border border-orange-300 rounded-lg "
        />

        <button
          type="submit"
          className="p-2 mt-2 font-semibold bg-orange-300 rounded-lg hover:bg-orange-500"
        >
          Edit Profile
        </button>

        {success && <p className="mt-4 text-sm text-green-500">{success}</p>}
        {error && <p className="mt-4 text-sm text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default EditProfile;
