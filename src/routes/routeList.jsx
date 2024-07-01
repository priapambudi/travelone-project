import ActivityDetail from "../pages/activityDetail";
import Home from "../pages/home";
import Login from "../pages/login";
import Register from "../pages/register";
import ProtectedRoute from "./ProtectedRoute";

export const routeList = [
  {
    path: "/",
    element: <Home />,
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
