import React, { useState, useEffect } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AttractionsOutlinedIcon from "@mui/icons-material/AttractionsOutlined";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import LoyaltyOutlinedIcon from "@mui/icons-material/LoyaltyOutlined";
import BrokenImageOutlinedIcon from "@mui/icons-material/BrokenImageOutlined";
import { Link } from "react-router-dom";

const SidebarDash = () => {
  const items = [
    {
      icon: <AccountCircleOutlinedIcon sx={{ fontSize: 20 }} />,
      name: "User",
      link: "/dashboard/user",
    },
    {
      icon: <PublicOutlinedIcon sx={{ fontSize: 20 }} />,
      name: "Category",
      link: "/dashboard/category",
    },
    {
      icon: <LoyaltyOutlinedIcon sx={{ fontSize: 20 }} />,
      name: "Promo",
      link: "/dashboard/promo",
    },
    {
      icon: <BrokenImageOutlinedIcon sx={{ fontSize: 20 }} />,
      name: "Banner",
      link: "/dashboard/banner",
    },
    {
      icon: <AttractionsOutlinedIcon sx={{ fontSize: 20 }} />,
      name: "Activity",
      link: "/dashboard/activity",
    },
  ];

  return (
    <div className="flex-1 min-h-screen border-r border-slate-300 sidebar">
      <Link to="/">
        <div className="flex items-center justify-center h-12 top">
          <span className="text-2xl font-bold logo">
            Travel<span className="text-orange-500">o</span>ne
          </span>
        </div>
      </Link>
      <hr className="h-0 border border-slate-300" />
      <div className="pt-3 pl-5 bottom">
        <ul>
          <p className="text-xs font-bold">Main</p>

          <li className="flex items-center p-1 cursor-pointer hover:bg-orange-100">
            <Link to="/dashboard">
              <DashboardIcon sx={{ fontSize: 20 }} />
              <span className="ml-2 text-sm font-semibold text-slate-600">
                Dashboard
              </span>
            </Link>
          </li>

          <p className="mt-3 mb-1 text-xs font-bold">List</p>

          {items.map((item, index) => (
            <li
              key={index}
              className="flex items-center p-1 mb-2 cursor-pointer hover:bg-orange-100"
            >
              <Link to={item.link} className="flex items-center w-full">
                {item.icon}
                <span className="ml-2 text-sm font-semibold text-slate-600">
                  {item.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SidebarDash;
