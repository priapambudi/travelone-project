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
    path: "dashboard/category",
    element: <Category />,
  },
];
