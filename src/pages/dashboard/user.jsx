import React from "react";
import SidebarDash from "../../components/dashboard/SidebarDash";
import NavbarDash from "../../components/dashboard/NavbarDash";
import UserTable from "../../components/dashboard/UserTable";

const User = () => {
  return (
    <div className="flex list">
      <SidebarDash />
      <div className="flex-[6] listContainer">
        <NavbarDash />
        <UserTable />
      </div>
    </div>
  );
};

export default User;
