import React from "react";
import SidebarDash from "../../components/dashboard/SidebarDash";
import NavbarDash from "../../components/dashboard/NavbarDash";
import CategoryTable from "../../components/dashboard/CategoryTable";

const Category = () => {
  return (
    <div className="flex">
      <SidebarDash />
      <div className="flex-[6]">
        <NavbarDash />
        <CategoryTable />
      </div>
    </div>
  );
};

export default Category;
