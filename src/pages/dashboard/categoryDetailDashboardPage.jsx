import SidebarDash from "../../components/dashboard/SidebarDash";
import NavbarDash from "../../components/dashboard/NavbarDash";
import CategoryDetailDash from "../../components/dashboard/CategoryDetailDash";

const CategoryDetailDashboardPage = () => {
  return (
    <div className="flex">
      <SidebarDash />
      <div className="flex-[6]">
        <NavbarDash />
        <CategoryDetailDash />
      </div>
    </div>
  );
};

export default CategoryDetailDashboardPage;
