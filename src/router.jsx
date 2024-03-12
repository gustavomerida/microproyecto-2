/* eslint-disable no-unused-vars */
import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import AppLayout from "./layout/AppLayout";
import Register2 from "./pages/Register2";
import ShowClubes from "./pages/ShowClubes";
import Club from "./pages/Club";
import Start from "./pages/Start";
import ProfileEditor from "./pages/ProfileEditor";
import Search from "./pages/Search";

export const router = createBrowserRouter([
  {
    path: "/user/profile",
    element: <ProfileEditor />,
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
    path: "/start",
    element: <Start />,
  },
  { path: "/club/:id", element: <Club /> },
  {
    path: "/search",
    element: <Search />,
  },
  {
    path: "/club/:clubId",
    element: <Club />,
  },
]);
