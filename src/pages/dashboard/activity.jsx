import SidebarDash from "../../components/dashboard/SidebarDash";
import NavbarDash from "../../components/dashboard/NavbarDash";
import ActivityTable from "../../components/dashboard/ActivityTable";

const Activity = () => {
  return (
    <div className="flex">
      <SidebarDash />
      <div className="flex-[6]">
        <NavbarDash />
        <ActivityTable />
      </div>
    </div>
  );
};

export default Activity;
