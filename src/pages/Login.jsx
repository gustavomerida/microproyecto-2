/* eslint-disable no-unused-vars */
import React from "react";
import styles from "./Login.module.css";
import { loginWithCredentials } from "../controllers/auth";
import { useEffect, useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase.js";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../firebase";
import {
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
} from "firebase/auth";
//import Input from '../components/Input'
//import Button from '../components/Button'
import { useUser } from "../context/user";

function Login() {
  const user = useUser();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
      console.log(user);
    }
  }, [user, navigate]);

  const handleLogin = async () => {
    const user = await loginWithCredentials(email, password);
    if (user !== null) {
      navigate("/");
      console.log(user);
    } else {
      alert("No se pudo iniciar sesión. Correo o contraseña incorrecta.");
    }
  };

  const handleLogin_Google = async () => {
    const user = await signInWithPopup(auth, googleProvider);
    if (user !== null) {
      navigate("/");
      console.log(user);
    } else {
      console.log("No se pudo autenticar al usuario con Google.");
      alert(
        "No se pudo iniciar sesión con Google. Por favor, inténtalo de nuevo."
      );
    }
  };

  return (
    <div className={styles.loginContainer}>
      {" "}
      {/* Aplica la clase de estilo al contenedor principal */}
      <h1 className={styles.loginTitle}>Inicio de sesión</h1>{" "}
      {/* Aplica la clase de estilo al título */}
      <form>
        <label>Email:</label>
        <input
          className={styles.formInput}
          type="email"
          placeholder="Correo electrónico"
          onChange={(e) => setEmail(e.target.value)}
        />{" "}
        {/* Aplica la clase de estilo al input */}
        <label>Contraseña:</label>
        <input
          className={styles.formInput}
          type="password"
          placeholder="Contraseña"
          onChange={(e) => setPassword(e.target.value)}
        />{" "}
        {/* Aplica la clase de estilo al input */}
        <button
          type="button"
          className={styles.loginButton}
          onClick={handleLogin}
        >
          Iniciar Sesión con Email
        </button>{" "}
        {/* Aplica la clase de estilo al botón */}
      </form>
      <button
        type="button"
        className={styles.socialButton}
        onClick={handleLogin_Google}
      >
        Iniciar Sesión con Google
      </button>{" "}
      {/* Aplica la clase de estilo al botón */}
      <button type="button" className={styles.socialButton}>
        Iniciar Sesión con Facebook
      </button>{" "}
      {/* Aplica la clase de estilo al botón */}
      <div className={styles.mensaje}>
        ¿No tienes cuenta? <a href="./register">Registrarse</a>
      </div>
    </div>
  );
}

export default Login;
