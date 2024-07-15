import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const token = localStorage.getItem("token");

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
            Authorization: `Bearer ${token}`,
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
            Authorization: `Bearer ${token}`,
          },
        }
      );

      //   console.log(res);
      setSuccess(res.data.message || "Profile updated successfully");

      // update local storage
      const updatedProfile = {
        profilePictureUrl: profilePictureUrl,
      };

      localStorage.setItem("img", updatedProfile.profilePictureUrl);

      navigate("/profile");
    } catch (error) {
      setError(error.response.data.message || "Failed to update profile");
    }
  };

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
