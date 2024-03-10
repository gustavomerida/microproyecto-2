/* eslint-disable no-unused-vars */
import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/user";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase.js";
import styles from "./Register.module.css";
import { updateUsers } from "../services/users.js";

function Register2() {
  const user = useUser();
  const navigate = useNavigate();

  const [usernameInput, setUsernameInput] = useState("");
  const [selectedGame, setSelectedGame] = useState("");
  const [gameOptions, setGameOptions] = useState([]);

  useEffect(() => {
    const fetchGameOptions = async () => {
      const gamesCollection = collection(db, "videogames");
      const gamesQuery = query(gamesCollection);
      const gamesSnapshot = await getDocs(gamesQuery);

      const gamesData = gamesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setGameOptions(gamesData);
    };

    fetchGameOptions();
  }, []);

  const handleLogin = async () => {
    if (!usernameInput || !selectedGame) {
      alert("Por favor, completa todos los campos.");
      return;
    } else {
      const usersCollection = collection(db, "users");
      const usernameQuery = query(
        usersCollection,
        where("username", "==", usernameInput)
      );
      const usernameSnapshot = await getDocs(usernameQuery);

      if (usernameSnapshot.size > 0) {
        alert(
          "Este nombre de usuario ya está registrado. Por favor, elige otro."
        );
      } else {
        updateUsers({
          username: usernameInput,
          videogame: selectedGame,
          email: user.email,
        });
        navigate("/");
        console.log("Registrando cambios en el usuario...");
      }
    }
  };

  return (
    <div className={styles.loginContainer}>
      {" "}
      {/* Aplica la clase de estilo al contenedor principal */}
      <h1 className={styles.loginTitle}>Continuaciación de registro</h1>{" "}
      {/* Aplica la clase de estilo al título */}
      <form>
        <label>Nombre de usuario</label>
        <input
          className={styles.formInput}
          type="name"
          placeholder="Escribe tu nombre de usuario"
          onChange={(e) => setUsernameInput(e.target.value)}
        />
        <label>Selecciona un juego:</label>
        <select
          className={styles.formInput}
          onChange={(e) => setSelectedGame(e.target.value)}
        >
          <option value="">Elige tu juego favorito</option>
          {gameOptions.map((game) => (
            <option key={game.id} value={game.id}>
              {game.titulo}
            </option>
          ))}
        </select>
        <button
          type="button"
          className={styles.loginButton}
          onClick={handleLogin}
        >
          Continuar
        </button>{" "}
        {/* Aplica la clase de estilo al botón */}
      </form>
    </div>
  );
}

export default Register2;
