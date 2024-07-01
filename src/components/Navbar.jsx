import React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import Register from "../pages/register";
import Login from "../pages/login";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navbarRef = useRef(null);
  const [showModalRegister, setShowModalRegister] = useState(false);
  const [showModalLogin, setShowModalLogin] = useState(false);
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const dropDownRef = useRef(null);

  const token = localStorage.getItem("token");
  const img = localStorage.getItem("img");

  const navigate = useNavigate();

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleClickOutsideNav = (event) => {
    if (navbarRef.current && !navbarRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideNav);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideNav);
    };
  }, []);

  const handleProfileClick = () => {
    setDropDownOpen(!dropDownOpen);
  };

  const handleLogOut = async () => {
    try {
      const res = await axios.get(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/logout",
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            "Content-Type": "application/json",
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiI5NWE4MDNjMy1iNTFlLTQ3YTAtOTBkYi0yYzJmM2Y0ODE1YTkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2Nzk4NDM0NDR9.ETsN6dCiC7isPReiQyHCQxya7wzj05wz5zruiFXLx0k`,
          },
        }
      );
      // console.log(res);

      localStorage.clear();
      navigate("/");
    } catch (error) {
      console.log(error);

      // localStorage.clear();
      // navigate("/");
    }
  };

  return (
    <div>
      <nav className="flex justify-between items-center w-[90%] mx-auto z-10 p-4">
        <Link to="/" className="flex items-center gap-2 ">
          <img className="w-16" src="/trip.png" alt="" />
          <h1 className="h-full text-3xl">
            Travel<span className="font-semibold text-orange-500">o</span>ne
          </h1>
        </Link>
        <div className="hidden md:block">
          <ul className="flex gap-[4vw] items-center">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/category">Category</Link>
            </li>
            <li>
              <Link to="/activity">Activity</Link>
            </li>
            <li>
              <Link to="/promo">Promo</Link>
            </li>
          </ul>
        </div>
        <div className="flex">
          {token ? (
            <div className="hidden md:block menu-container" ref={dropDownRef}>
              <div className="menu-trigger" onClick={handleProfileClick}>
                <img
                  className="rounded-full cursor-pointer w-14 h-14"
                  src={img}
                  alt=""
                />
              </div>

              {dropDownOpen && (
                <div className="absolute px-4 py-2 z-10 bg-orange-100 rounded right-5 top-20 w-[200px] dropdown-menu">
                  <ul>
                    <li className="py-2">My Profile</li>
                    <li>
                      <button
                        onClick={handleLogOut}
                        className="hidden px-4 py-2 font-bold text-orange-500 border-2 border-orange-500 rounded-full md:block hover:border-orange-700 hover:text-orange-700"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div className="flex">
              <button
                onClick={() => setShowModalLogin(true)}
                className="hidden px-4 py-2 font-bold text-orange-500 border-2 border-orange-500 rounded-full md:block hover:border-orange-700 hover:text-orange-700"
              >
                Login
              </button>
              <div className="hidden w-px mx-2 bg-gray-400 md:block h-15"></div>
              <button
                onClick={() => setShowModalRegister(true)}
                className="hidden px-4 py-2 font-bold text-white bg-orange-500 rounded-full md:block hover:bg-orange-700"
              >
                Sign Up
              </button>
            </div>
          )}

          <button className="md:hidden " onClick={toggleNavbar}>
            <img src="/menu.png" alt="" />
          </button>
        </div>
      </nav>

      {/* Mobile Navbar */}

      {isOpen && (
        <div
          ref={navbarRef}
          className={`md:hidden fixed top-0 right-0 w-[75%] h-full z-50 bg-white shadow-lg transform ${
            isOpen ? "animate-slideIn" : "animate-slideOut"
          }`}
        >
          <div className="flex justify-end p-4">
            <button onClick={handleClose}>
              <img src="/x.png" alt="Close menu" />
            </button>
          </div>
          <div className="flex flex-col items-center gap-4 mt-10">
            {token ? (
              <img
                className="rounded-full cursor-pointer w-14 h-14"
                src={img}
                alt=""
              />
            ) : (
              <div className="flex justify-center gap-4 mb-4">
                <button
                  onClick={() => setShowModalLogin(true)}
                  className="px-4 py-2 font-bold text-orange-500 border-2 border-orange-500 rounded-full hover:border-orange-700 hover:text-orange-700"
                >
                  Login
                </button>
                <div className="w-px mx-2 bg-gray-400 h-15"></div>
                <button
                  onClick={() => setShowModalRegister(true)}
                  className="px-4 py-2 font-bold text-white bg-orange-500 rounded-full hover:bg-orange-700"
                >
                  Sign Up
                </button>
              </div>
            )}

            <ul className="flex flex-col items-center w-full gap-4">
              <li className="w-full py-2 text-xl font-medium text-center">
                <Link to="/">Home</Link>
              </li>
              <li className="w-full py-2 text-xl font-medium text-center">
                <Link to="/category">Category</Link>
              </li>
              <li className="w-full py-2 text-xl font-medium text-center">
                <Link to="/activity">Activity</Link>
              </li>
              <li className="w-full py-2 text-xl font-medium text-center">
                <Link to="/promo">Promo</Link>
              </li>
            </ul>
          </div>
        </div>
      )}

      <Register
        onClose={() => setShowModalRegister(false)}
        isVisible={showModalRegister}
      />

      <Login
        onClose={() => setShowModalLogin(false)}
        isVisible={showModalLogin}
      />
    </div>
  );
};

export default Navbar;
