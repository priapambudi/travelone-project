import ActivityHome from "../pages/activityHome";
import Home from "../pages/home";
import Login from "../pages/login";
import Register from "../pages/register";
import Profile from "../pages/profile";
import ProtectedRoute from "./ProtectedRoute";
import EditProfile from "../components/EditProfile";
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

  // dashboard
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <HomeDash />,
      </ProtectedRoute>
    ),
  },
  {
    path: "dashboard/user",
    element: (
      <ProtectedRoute>
        <User />
      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard/category",
    element: (
      <ProtectedRoute>
        <Category />
      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard/banner",
    element: (
      <ProtectedRoute>
        <Banner />
      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard/promo",
    element: (
      <ProtectedRoute>
        <Promo />
      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard/activity",
    element: (
      <ProtectedRoute>
        <Activity />
      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard/activity/:id",
    element: (
      <ProtectedRoute>
        <ActivityDetailDashboardPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard/category/:id",
    element: (
      <ProtectedRoute>
        <CategoryDetailDashboardPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard/promo/:id",
    element: (
      <ProtectedRoute>
        <PromoDetailDashboardPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard/banner/:id",
    element: (
      <ProtectedRoute>
        <BannerDetailDashboardPage />
      </ProtectedRoute>
    ),
  },
];
