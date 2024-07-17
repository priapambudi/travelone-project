import React from "react";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";

const NavbarDash = () => {
  return (
    <div className="flex  items-center h-[49px] text-base border-b-[0.5px] border-slate-300 navbar">
      <div className="flex items-center justify-between w-full p-5 wrapper">
        <div className="text-xl">Dashboard</div>

        <div className="flex items-center">
          <div className="mr-5">
            <DarkModeOutlinedIcon />
          </div>
          <div>
            <img className="w-8 h-8 rounded-full" src="/user.jpg" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarDash;
