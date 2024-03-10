/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { useEffect } from "react";
import Button from "../components/Button";
import { useUser } from "../context/user";
import { useNavigate } from "react-router-dom";
import { logOut } from "../controllers/auth";

export default function AppLayout({ children }) {
  const user = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/club", { replace: true });
    }
  }, [user, navigate]);

  return (
    <div>
      <main>{children}</main>
    </div>
  );
}
