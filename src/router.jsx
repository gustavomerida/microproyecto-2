/* eslint-disable no-unused-vars */
import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import AppLayout from "./layout/AppLayout";
import Register2 from "./pages/Register2";
import ShowClubes from "./pages/ShowClubes";
import Club from "./pages/Club";

export const router = createBrowserRouter([
  {
    path: "/user/profile",
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
    path: "/register2",
    element: <Register2 />,
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/clubs",
    element: <ShowClubes />,
  },
  {
    path: "/club",
    element: <Club />,
  },
]);
