import ActivityDetail from "../pages/activityDetail";
import Home from "../pages/home";
import Login from "../pages/login";
import Register from "../pages/register";
import Profile from "../pages/profile";
import ProtectedRoute from "./ProtectedRoute";
import EditProfile from "../components/EditProfile";
import HomeDash from "../pages/dashboard/homeDash";
import User from "../pages/dashboard/user";

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
    path: "/actDetail/:id",
    element: <ActivityDetail />,
  },
  {
    path: "/dashboard",
    element: <HomeDash />,
  },
  {
    path: "dashboard/user",
    element: <User />,
  },
];
