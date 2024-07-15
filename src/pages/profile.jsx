import React from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const profile = () => {
  const [profile, setProfile] = useState({});
  const token = localStorage.getItem("token");

  const getProfile = async () => {
    try {
      const res = await axios.get(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/user",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
        }
      );
      //   console.log(res);
      setProfile(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="w-[90%] mx-auto p-6 ">
        <h1 className="mb-2 text-3xl font-bold text-center">Profile</h1>
        <div className="flex flex-col items-center">
          <div className="mb-4">
            <img
              src={profile.profilePictureUrl}
              alt="profile"
              className="w-[150px] h-[150px] rounded-full"
            />
          </div>
          <div className="p-4 text-lg border border-orange-300 rounded-lg">
            <p className="">Email: {profile.email}</p>
            <p>Name: {profile.name}</p>
            <p>Phone: {profile.phoneNumber}</p>
          </div>
        </div>

        <div className="flex justify-center">
          <Link to={"/profile/edit"}>
            <button className="px-4 py-2 mt-4 font-medium bg-orange-400 rounded-lg">
              Edit Profile
            </button>
          </Link>
        </div>
      </div>
      <Footer className="flex-shrink-0" />
    </div>
  );
};

export default profile;
