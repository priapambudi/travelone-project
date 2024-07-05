import React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AttractionsOutlinedIcon from "@mui/icons-material/AttractionsOutlined";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import LoyaltyOutlinedIcon from "@mui/icons-material/LoyaltyOutlined";
import BrokenImageOutlinedIcon from "@mui/icons-material/BrokenImageOutlined";
import { Link } from "react-router-dom";

const SidebarDash = () => {
  return (
    <div className="flex-1 min-h-screen border-r border-slate-300 sidebar">
      <Link to="/">
        <div className="flex items-center justify-center h-12 top">
          <span className="text-2xl font-bold logo">Travelone</span>
        </div>
      </Link>
      <hr className="h-0 border border-slate-300" />
      <div className="pl-2 bottom">
        <ul>
          <p className="text-xs font-bold">Main</p>
          <li className="flex items-center p-1 cursor-pointer hover:bg-orange-100">
            <Link to="/dashboard">
              <DashboardIcon className="text-orange-400" />
              <span className="ml-2 text-sm font-semibold text-slate-600">
                Dashboard
              </span>
            </Link>
          </li>

          <p className="mt-3 mb-1 text-xs font-bold">List</p>
          <li className="flex items-center p-1 cursor-pointer hover:bg-orange-100">
            <Link to="/dashboard/user">
              <AccountCircleOutlinedIcon className="text-orange-400" />
              <span className="ml-2 text-sm font-semibold text-slate-600">
                Users
              </span>
            </Link>
          </li>
          <li className="flex items-center p-1 cursor-pointer hover:bg-orange-100">
            <PublicOutlinedIcon className="text-orange-400" />
            <span className="ml-2 text-sm font-semibold text-slate-600">
              Category
            </span>
          </li>
          <li className="flex items-center p-1 cursor-pointer hover:bg-orange-100">
            <AttractionsOutlinedIcon className="text-orange-400" />
            <span className="ml-2 text-sm font-semibold text-slate-600">
              Activity
            </span>
          </li>
          <li className="flex items-center p-1 cursor-pointer hover:bg-orange-100">
            <LoyaltyOutlinedIcon className="text-orange-400" />
            <span className="ml-2 text-sm font-semibold text-slate-600">
              Promo
            </span>
          </li>
          <li className="flex items-center p-1 cursor-pointer hover:bg-orange-100">
            <BrokenImageOutlinedIcon className="text-orange-400" />
            <span className="ml-2 text-sm font-semibold text-slate-600">
              Banner
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SidebarDash;
