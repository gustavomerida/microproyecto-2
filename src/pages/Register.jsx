/* eslint-disable no-unused-vars */
import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//import Input from '../components/Input'
//import Button from '../components/Button'
import { useUser } from "../context/user";
import { registerWithCredentials } from "../controllers/auth";
import styles from "./Register.module.css";
import { auth, googleProvider } from "../firebase";
import { db } from "../firebase.js";
import { collection, addDoc } from "firebase/firestore";
import {
  getAdditionalUserInfo,
  signInWithPopup,
  signInWithRedirect,
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
} from "firebase/auth";

function Register() {
  const user = useUser();
  const [isFieldsEmpty, setIsFieldsEmpty] = useState();
  const navigate = useNavigate();

  const [nameInput, setNameInput] = useState("");
  const [lastnameInput, setLastnameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
      console.log(user);
    }
  }, [user, navigate]);

  const handleLogin = async () => {
    if (!nameInput || !lastnameInput || !emailInput || !passwordInput) {
      alert("Por favor, completa todos los campos.");
      return;
    }
    fetchSignInMethodsForEmail(auth, emailInput)
      .then((signInMethods) => {
        if (signInMethods.length > 0) {
          // El correo ya está en uso
          alert(
            "Este correo electrónico ya está registrado. Por favor, utiliza otro."
          );
        } else {
          // El correo no está registrado, proceder con el registro
          return createUserWithEmailAndPassword(
            auth,
            emailInput,
            passwordInput
          );
        }
      })
      .then((userCredential) => {
        const user = userCredential.user;

        const userCollection = collection(db, "users");
        alert("Registro exitoso");
        return addDoc(userCollection, {
          name: nameInput,
          last_name: lastnameInput,
          username: "",
          email: emailInput,
          videogame: "",
          memberships: "",
        });
      })
      .then(() => {
        navigate("/register2");
        console.log("Registro exitoso");
      })
      .catch((error) => {
        console.error("Error al registrar:", error.message);
        alert(
          "No se pudo crear la cuenta porque este correo electrónico ya está registrado. Por favor, inténtalo de nuevo o inicie sesión."
        );
      });
  };

  const handleLogin_Google = async () => {
    const user = await signInWithPopup(auth, googleProvider);
    const data = getAdditionalUserInfo(user);

    if (data.isNewUser) {
      const userCollection = collection(db, "users");
      const displayName = user.user.displayName;
      const picture = user.user.photoURL;
      const [firstName, lastName] = displayName.split(" ");
      await addDoc(userCollection, {
        name: firstName,
        last_name: lastName,
        username: "",
        email: user.user.email,
        videogame: "",
        memberships: "",
      });

      console.log("Nombre:", firstName);
      console.log("Apellido:", lastName);
      alert("Registro exitoso");
      navigate("/register2");
      console.log(user);
    } else if (!data.isNewUser) {
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
      <h1 className={styles.loginTitle}>Registro de usuarios</h1>{" "}
      {/* Aplica la clase de estilo al título */}
      <form>
        <label>Nombre:</label>
        <input
          className={styles.formInput}
          type="name"
          placeholder="Escribe tu nombre"
          onChange={(e) => setNameInput(e.target.value)}
        />
        <label>Apellido:</label>
        <input
          className={styles.formInput}
          type="lastname"
          placeholder="Escribe tu apellido"
          onChange={(e) => setLastnameInput(e.target.value)}
        />
        <label>Email:</label>
        <input
          className={styles.formInput}
          type="email"
          placeholder="Correo electrónico"
          onChange={(e) => setEmailInput(e.target.value)}
        />{" "}
        {/* Aplica la clase de estilo al input */}
        <label>Contraseña:</label>
        <input
          className={styles.formInput}
          type="password"
          placeholder="Contraseña"
          onChange={(e) => setPasswordInput(e.target.value)}
        />{" "}
        {/* Aplica la clase de estilo al input */}
        <button
          type="button"
          className={styles.loginButton}
          onClick={handleLogin}
          disabled={isFieldsEmpty}
        >
          Registrarse con Email
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
        ¿Ya tienes una cuenta?. <a href='./login'>Inicia sesión</a>
      </div>
    </div>
  );
}

export default Register;
