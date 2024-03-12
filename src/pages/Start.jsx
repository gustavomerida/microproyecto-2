/* eslint-disable no-unused-vars */
import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../components/Start.module.css";

export default function Start() {
  const navigate = useNavigate();

  const handleDetails1 = () => {
    navigate(`/login`);
  };
  const handleDetails2 = () => {
    navigate(`/register`);
  };
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div>
          {" "}
          <img
            src={`/src/assets/images/logo.jpg`}
            alt={`Logo`}
            className={styles.logo}
          />
        </div>
        <div className={styles.title}>By: Daniel Fiallo | Gustavo Mérida</div>
        <button className={styles.button} onClick={handleDetails1}>
          Iniciar sesión
        </button>
        <button className={styles.button} onClick={handleDetails2}>
          Registrarse
        </button>
      </div>
    </div>
  );
}
