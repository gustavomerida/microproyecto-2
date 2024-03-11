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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // Establece el temporizador en 3 segundos

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loading && user === null) {
      navigate("/login", { replace: true });
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (!loading && user !== null) {
      const fetchGameOptions = async () => {
        // Código para obtener opciones de juegos
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
    }
  }, [user, loading]);

  const handleLogin = async () => {
    if (!usernameInput || !selectedGame) {
      alert("Por favor, completa todos los campos.");
      return;
    } else {
      const usersCollection = collection(db, "users");
      const usernameQuery = query(
        usersCollection,
        where("username", "==", usernameInput.toLowerCase())
      );
      const usernameSnapshot = await getDocs(usernameQuery);

      if (usernameSnapshot.size > 0) {
        alert(
          "Este nombre de usuario ya está registrado. Por favor, elige otro."
        );
      } else {
        updateUsers({
          username: usernameInput.toLowerCase(),
          videogame: selectedGame,
          email: user.email.toLowerCase(),
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
