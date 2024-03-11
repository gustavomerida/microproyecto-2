/* eslint-disable no-unused-vars */
import React, { useReducer } from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/user";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase.js";
import styles from "./Register.module.css";

function ProfileEditor() {
  const user = useUser();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [usernameInput, setUsernameInput] = useState("Cargando...");
  const [isUsernameDisabled, setIsUsernameDisabled] = useState(true);
  const [nameInput, setNameInput] = useState("Cargando...");
  const [last_nameInput, setLast_nameInput] = useState("Cargando...");
  const [selectedGame, setSelectedGame] = useState("");
  const [gameOptions, setGameOptions] = useState([]);
  const [userReady, setUserReady] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showSelectGame, setShowSelectGame] = useState(false);
  const [gameTitle, setGameTitle] = useState("");

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

      const fetchUserData = async () => {
        // Código para obtener datos de usuarios
        try {
          const usersCollection = collection(db, "users");
          const usersQuery = query(usersCollection);
          const usersDataSnapshot = await getDocs(usersQuery);
          const usersData = usersDataSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setUsers(usersData);
        } catch (error) {
          console.error("Error al cargar los datos de Users:", error);
        }
      };

      fetchUserData();
    }
  }, [user, loading]);

  useEffect(() => {
    if (users.length > 0) {
      const userFound = users.find((usere) => usere.email == user.email);
      if (userFound) {
        setNameInput(userFound.name || "");
        setLast_nameInput(userFound.last_name || "");
        setUsernameInput(userFound.username || "");
        setSelectedGame(userFound.videogame || "");
      }
    }
  }, [users]);

  useEffect(() => {
    if (selectedGame != "") {
      setGameTitle(gameOptions.find((game) => game.id == selectedGame).titulo);
    }
  }, [selectedGame, gameOptions]);

  const handleLogin = async () => {
    if (!selectedGame || !nameInput) {
      alert("Por favor, completa todos los campos.");
      return;
    }
    const usersCollection = collection(db, "users");

    try {
      // Consulta para buscar el usuario por su nombre de usuario
      const usernameQuery = query(
        usersCollection,
        where("username", "==", usernameInput)
      );
      const usernameSnapshot = await getDocs(usernameQuery);

      // Verificar si se encontró un usuario
      if (usernameSnapshot.size > 0) {
        const userDoc = usernameSnapshot.docs[0];
        const userId = userDoc.id;

        // Actualizar los datos del usuario
        await updateDoc(doc(db, "users", userId), {
          name: nameInput,
          last_name: last_nameInput,
          videogame: selectedGame,
        });

        // Navegar a la página principal
        navigate("/");
        alert("¡Perfil actualizado!");
        console.log("Registrando cambios en el usuario...");
      } else {
        // El usuario no existe, realizar las acciones correspondientes
        alert(
          "Este nombre de usuario no está registrado. Por favor, verifica."
        );
      }
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
    }
  };

  const handleNameChange = (e) => {
    if (
      e.target.value !== users.find((usere) => usere.email == user.email)?.name
    ) {
      setNameInput(e.target.value);
    }
  };

  const handleLastNameChange = (e) => {
    if (
      e.target.value !==
      users.find((usere) => usere.email == user.email)?.last_name
    ) {
      setLast_nameInput(e.target.value);
    }
  };

  const handleUsernameChange = (e) => {
    if (
      e.target.value !==
      users.find((usere) => usere.email == user.email)?.username
    ) {
      setUsernameInput(e.target.value);
    }
  };

  const searchGame = () => {
    gameOptions;
    console.log(gameOptions);
  };

  return (
    <div className={styles.loginContainer}>
      {" "}
      {/* Aplica la clase de estilo al contenedor principal */}
      <h1 className={styles.loginTitle}>Configuración de perfil</h1>{" "}
      {/* Aplica la clase de estilo al título */}
      {user && console.log(`un usuario es: ${user.email}, `)}
      {/* {console.log(`EL usuario es: ${users.find(usere => usere.email == user.email).name}`)} */}
      <form>
        <label>Nombre:</label>
        <input
          className={styles.formInput}
          type="name"
          value={nameInput}
          onChange={handleNameChange}
          disabled={loading}
        />
        <label>Apellido:</label>
        <input
          className={styles.formInput}
          type="name"
          value={last_nameInput}
          onChange={handleLastNameChange}
          disabled={loading}
        />
        <label>Nombre de usuario:</label>
        <input
          className={`${styles.formInput} ${
            isUsernameDisabled ? styles.disabledInput : ""
          }`}
          type="name"
          value={usernameInput}
          onChange={handleUsernameChange}
          disabled={isUsernameDisabled}
        />
        <div>
          <p>Tu juego favorito es: {gameTitle}</p>
        </div>
        <label>Seleccionar otro juego:</label>
        <select
          className={styles.formInput}
          onChange={(e) => setSelectedGame(e.target.value)}
          disabled={loading}
        >
          <option value="">Elige tu juego favorito</option>
          {gameOptions.map((game) => (
            <option key={game.id} value={game.id}>
              {game.titulo}
            </option>
          ))}
        </select>
        <div></div>
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

export default ProfileEditor;
