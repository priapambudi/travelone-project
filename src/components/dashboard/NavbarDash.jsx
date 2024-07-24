import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import DashboardIcon from "@mui/icons-material/Dashboard";

const NavbarDash = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const profileImg = localStorage.getItem("img");
  const role = localStorage.getItem("role");
  const [dropDownOpen, setDropDownOpen] = useState(false);

  const handleProfileClick = () => {
    setDropDownOpen(!dropDownOpen);
  };

  const handleLogOut = async () => {
    try {
      await axios.get(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/logout",
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(res);

      localStorage.clear();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex  items-center h-[49px] text-base border-b-[0.5px] border-slate-300 navbar">
      <div className="flex items-center justify-between w-full p-5 wrapper">
        <div className="text-xl">Dashboard</div>

        <div className="flex items-center">
          {token ? (
            <div className="hidden md:block menu-container">
              <div className="menu-trigger" onClick={handleProfileClick}>
                <img
                  className="w-12 h-12 rounded-full cursor-pointer"
                  src={profileImg}
                  alt=""
                />
              </div>

              {dropDownOpen && (
                <div className="absolute px-4 py-2 z-10 bg-orange-100 rounded right-5 top-12 w-[200px] dropdown-menu">
                  <ul>
                    <Link to="/profile">
                      <div className="flex items-center gap-2">
                        <PersonIcon />
                        <li className="py-1 hover:text-orange-400">
                          My Profile
                        </li>
                      </div>
                    </Link>
                    {role === "admin" ? (
                      <Link to="/dashboard">
                        <div className="flex items-center gap-2">
                          <DashboardIcon />
                          <li className="py-1 hover:text-orange-400">
                            Dashboard
                          </li>
                        </div>
                      </Link>
                    ) : null}
                    <li>
                      <button
                        onClick={handleLogOut}
                        className="hidden px-3 py-1 mt-2 font-bold text-orange-500 border-2 border-orange-500 rounded-full md:block hover:border-orange-700 hover:text-orange-700"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default NavbarDash;
