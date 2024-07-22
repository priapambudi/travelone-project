import SidebarDash from "../../components/dashboard/SidebarDash";
import NavbarDash from "../../components/dashboard/NavbarDash";
import BannerDetailDash from "../../components/dashboard/BannerDetailDash";

const BannerDetailDashboardPage = () => {
  return (
    <div className="flex">
      <SidebarDash />
      <div className="flex-[6]">
        <NavbarDash />
        <BannerDetailDash />
      </div>
    </div>
  );
};

export default BannerDetailDashboardPage;
