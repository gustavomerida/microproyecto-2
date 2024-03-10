/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import { useUser } from "../context/user";
import { useNavigate } from "react-router-dom";
import { logOut } from "../controllers/auth";
import NavigationBar from "../components/NavigationBar";

export default function AppLayout({ children }) {
  
    const user = useUser();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const timeout = setTimeout(() => {
        setLoading(false);
      }, 2000); // Adjust the timeout value as needed
  
      return () => clearTimeout(timeout);
    }, []);
  
    useEffect(() => {
      if (!loading && user === null) {
        navigate("/login", { replace: true });
      }
    }, [user, loading, navigate]);

  return (
    <div>
        <NavigationBar></NavigationBar>
          <button onClick={() => logOut()}>Cerrar sesión</button>
      <main>{children}</main>
    </div>
  );
}
