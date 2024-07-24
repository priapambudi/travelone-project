import React from "react";
import SidebarDash from "../../components/dashboard/SidebarDash";
import NavbarDash from "../../components/dashboard/NavbarDash";
import Widget from "../../components/dashboard/Widget";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import AttractionsRoundedIcon from "@mui/icons-material/AttractionsRounded";
import PublicRoundedIcon from "@mui/icons-material/PublicRounded";
import SellRoundedIcon from "@mui/icons-material/SellRounded";
import PhotoLibraryRoundedIcon from "@mui/icons-material/PhotoLibraryRounded";
import axios from "axios";

const HomeDash = () => {
  const getUserCount = async () => {
    const res = await axios.get(
      "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/all-user",
      {
        headers: {
          apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiI5NWE4MDNjMy1iNTFlLTQ3YTAtOTBkYi0yYzJmM2Y0ODE1YTkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2Nzk4NDM0NDR9.ETsN6dCiC7isPReiQyHCQxya7wzj05wz5zruiFXLx0k",
        },
      }
    );
    return res.data.data.length;
  };

  const getCategoryCount = async () => {
    const res = await axios.get(
      "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/categories",
      {
        headers: {
          apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
        },
      }
    );
    return res.data.data.length;
  };

  const getActivityCount = async () => {
    const res = await axios.get(
      "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/activities",
      {
        headers: {
          apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
        },
      }
    );
    return res.data.data.length;
  };

  const getPromoCount = async () => {
    const res = await axios.get(
      "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/promos",
      {
        headers: {
          apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
        },
      }
    );
    return res.data.data.length;
  };

  const getBannerCount = async () => {
    const res = await axios.get(
      "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/banners",
      {
        headers: {
          apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
        },
      }
    );
    return res.data.data.length;
  };

  return (
    <div className="flex home">
      <SidebarDash />
      <div className="flex-[6] homeContainer">
        <NavbarDash />
        <div className="grid grid-cols-4 gap-3 p-5 widgets">
          <Widget title="Users" fetchCount={getUserCount}>
            <AccountCircleRoundedIcon
              style={{ fontSize: 50, color: "orange" }}
            />
          </Widget>
          <Widget title="Category" fetchCount={getCategoryCount}>
            <PublicRoundedIcon style={{ fontSize: 50, color: "orange" }} />
          </Widget>
          <Widget title="Activity" fetchCount={getActivityCount}>
            <AttractionsRoundedIcon style={{ fontSize: 50, color: "orange" }} />
          </Widget>
          <Widget title="Promo" fetchCount={getPromoCount}>
            <SellRoundedIcon style={{ fontSize: 50, color: "orange" }} />
          </Widget>
          <Widget title="Banner" fetchCount={getBannerCount}>
            <PhotoLibraryRoundedIcon
              style={{ fontSize: 50, color: "orange" }}
            />
          </Widget>
        </div>
      </div>
    </div>
  );
};

export default HomeDash;
