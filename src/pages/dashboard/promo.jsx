import SidebarDash from "../../components/dashboard/SidebarDash";
import NavbarDash from "../../components/dashboard/NavbarDash";
import PromoTable from "../../components/dashboard/PromoTable";

const Banner = () => {
  return (
    <div className="flex">
      <SidebarDash />
      <div className="flex-[6]">
        <NavbarDash />
        <PromoTable />
      </div>
    </div>
  );
};

export default Banner;
