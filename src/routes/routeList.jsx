import ActivityHome from "../pages/activityHome";
import Home from "../pages/home";
import Login from "../pages/login";
import Register from "../pages/register";
import Profile from "../pages/profile";
import ProtectedRoute from "./ProtectedRoute";
import EditProfile from "../components/EditProfile";
import PromoDetail from "../pages/promoDetail";
import HomeDash from "../pages/dashboard/homeDash";
import User from "../pages/dashboard/user";
import Category from "../pages/dashboard/category";
import Banner from "../pages/dashboard/banner";
import Promo from "../pages/dashboard/promo";
import Activity from "../pages/dashboard/activity";
import ActivityDetailDashboardPage from "../pages/dashboard/activityDetailDashboardPage";
import CategoryDetailDashboardPage from "../pages/dashboard/categoryDetailDashboardPage";
import PromoDetailDashboardPage from "../pages/dashboard/promoDetailDashboardPage";
import BannerDetailDashboardPage from "../pages/dashboard/bannerDetailDashboardPage";
import ActivityDetail from "../pages/activityDetail";
import PromoHome from "../pages/promoHome";

export const routeList = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/profile/",
    element: <Profile />,
  },
  {
    path: "/profile/edit",
    element: <EditProfile />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/act-home/",
    element: <ActivityHome />,
  },
  {
    path: "/act-detail/:id",
    element: <ActivityDetail />,
  },
  {
    path: "/promo-home/",
    element: <PromoHome />,
  },
  {
    path: "/promoDetail/:id",
    element: (
      <ProtectedRoute>
        <PromoDetail />
      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard",
    element: <HomeDash />,
  },
  {
    path: "dashboard/user",
    element: <User />,
  },
  {
    path: "/dashboard/category",
    element: <Category />,
  },
  {
    path: "/dashboard/banner",
    element: <Banner />,
  },
  {
    path: "/dashboard/promo",
    element: <Promo />,
  },
  {
    path: "/dashboard/activity",
    element: <Activity />,
  },
  {
    path: "/dashboard/activity/:id",
    element: <ActivityDetailDashboardPage />,
  },
  {
    path: "/dashboard/category/:id",
    element: <CategoryDetailDashboardPage />,
  },
  {
    path: "/dashboard/promo/:id",
    element: <PromoDetailDashboardPage />,
  },
  {
    path: "/dashboard/banner/:id",
    element: <BannerDetailDashboardPage />,
  },
];
