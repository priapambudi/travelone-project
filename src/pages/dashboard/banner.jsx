import NavbarDash from "../../components/dashboard/NavbarDash";
import SidebarDash from "../../components/dashboard/SidebarDash";
import BannerTable from "../../components/dashboard/BannerTable";

const Banner = () => {
  return (
    <div className="flex">
      <SidebarDash />
      <div className="flex-[6]">
        <NavbarDash />
        <BannerTable />
      </div>
    </div>
  );
};

export default Banner;
