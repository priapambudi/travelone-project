import SidebarDash from "../../components/dashboard/SidebarDash";
import NavbarDash from "../../components/dashboard/NavbarDash";
import ActivityDetailDash from "../../components/dashboard/ActivityDetailDash";

const ActivityDetailDashboardPage = () => {
  return (
    <div className="flex">
      <SidebarDash />
      <div className="flex-[6]">
        <NavbarDash />
        <ActivityDetailDash />
      </div>
    </div>
  );
};

export default ActivityDetailDashboardPage;
