import ActivityDetail from "../pages/activityDetail";
import Home from "../pages/home";
import Login from "../pages/login";
import Register from "../pages/register";
import Profile from "../pages/profile";
import ProtectedRoute from "./ProtectedRoute";
import EditProfile from "../components/EditProfile";

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
];
