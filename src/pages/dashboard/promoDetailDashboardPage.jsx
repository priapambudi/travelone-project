import SidebarDash from "../../components/dashboard/SidebarDash";
import NavbarDash from "../../components/dashboard/NavbarDash";
import PromoDetailDash from "../../components/dashboard/PromoDetailDash";

const PromoDetailDashboardPage = () => {
  return (
    <div className="flex">
      <SidebarDash />
      <div className="flex-[6]">
        <NavbarDash />
        <PromoDetailDash />
      </div>
    </div>
  );
};

export default PromoDetailDashboardPage;
