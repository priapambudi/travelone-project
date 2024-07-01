import React from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaTwitter, FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-[90%] mx-auto p-6 pb-8 ">
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="flex flex-col items-center mt-8">
          <Link className="flex items-center justify-center" to="/">
            <img src="/trip.png" alt="logo" className="w-[25px] h-[25px]" />
            <p className="text-xl font-bold">
              Travel<span className="text-orange-400">o</span>ne
            </p>
          </Link>

          <p className="text-center ">Enjoying your trip with Travelone</p>

          <div className="flex justify-center gap-3 mt-2">
            <FaInstagram className="w-[25px] h-[25px]" />
            <FaTwitter className="w-[25px] h-[25px]" />
            <FaFacebook className="w-[25px] h-[25px]" />
          </div>
        </div>

        <div className="flex flex-col items-center mt-8">
          <h3 className="text-xl font-bold">Company</h3>
          <ul className="mt-2 text-center">
            <li>About Us</li>
            <li>Our Team</li>
            <li>Careers</li>
            <li>Blog</li>
          </ul>
        </div>

        <div className="flex flex-col items-center mt-8">
          <h3 className="text-xl font-bold">Contact</h3>
          <p className="text-center">123, Main St, City, Country</p>
          <p className="text-center">Phone: (123) 456-7890</p>
          <p className="text-center">Email: 8H9oB@example.com</p>
        </div>
      </div>
      <p className="mt-5 text-sm text-center text-slate-500">
        © 2023 Travelone. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
