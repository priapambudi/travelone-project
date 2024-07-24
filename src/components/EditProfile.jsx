import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditProfile = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");

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
      toast.error(error.response.data.message);
      // setError(error.response.data.message);
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
      profilePictureUrl: profilePictureUrl || profile.profilePictureUrl,
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

      localStorage.setItem("img", payload.profilePictureUrl);

      toast.success(res.data.message || "Profile updated successfully");

      setTimeout(() => {
        navigate("/profile");
      }, 2000);
    } catch (error) {
      toast.error(error.response.data.message || "Failed to update profile");
    }
  };

  return (
    <div className="w-[90%] mx-auto p-6 h-screen flex flex-col justify-center items-center ">
      <div className="w-[40%] border-2 border-orange-500 rounded-lg p-6">
        <h1 className="text-3xl font-bold">Edit Your Profile</h1>

        <form onSubmit={handleEditProfile} className="flex flex-col gap-3 mt-5">
          <label htmlFor="email">Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            // value={email}
            id="email"
            placeholder="Input email"
            className="p-2 border border-orange-300 rounded-lg"
          />

          <label htmlFor="name">Name</label>
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            // value={name}
            id="name"
            placeholder="Input name"
            className="p-2 border border-orange-300 rounded-lg"
          />

          <label htmlFor="phone">Phone</label>
          <input
            onChange={(e) => setPhoneNumber(e.target.value)}
            type="text"
            // value={phoneNumber}
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
        </form>
      </div>

      <ToastContainer />
    </div>
  );
};

export default EditProfile;
