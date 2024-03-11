/* eslint-disable no-unused-vars */
import React, { useReducer } from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/user";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase.js";
import styles from "./Register.module.css";
import { updateUsers } from "../services/users.js";
import { Divider } from "@material-ui/core";

function ProfileEditor() {

  const user = useUser();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [usernameInput, setUsernameInput] = useState("cargando...");
  const [nameInput, setNameInput] = useState("cargando...");
  const [last_name, setLast_name] = useState("cargando...");
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
            const usersData = usersDataSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setUsers(usersData);
            
        } catch (error) {
            console.error('Error al cargar los datos de Users:', error);
        }
      };

      fetchUserData();
    }
  }, [user, loading]);

  useEffect(() => {
    if (users.length > 0) {
      const userFound = users.find(usere => usere.email == user.email);
      if (userFound) {
        setNameInput(userFound.name || "");
        setLast_name(userFound.last_name || "");
        setUsernameInput(userFound.username || "");
        setSelectedGame(userFound.videogame || "");
        
      }
    }
  }, [users]);

  useEffect(()=>{
    if (selectedGame!=""){
        setGameTitle(gameOptions.find((game) => game.id == selectedGame).titulo)

    }
  }, [selectedGame, gameOptions]);

  const handleLogin = async () => {
    if (!usernameInput || !selectedGame || !nameInput) {
      alert("Por favor, completa todos los campos.");
      return;
    } else {
      const usersCollection = collection(db, "users");
      const usernameQuery = query(
        usersCollection,
        where("username", "==", usernameInput)
      );
      const usernameSnapshot = await getDocs(usernameQuery);
      const usernames = usernameSnapshot.docs.map((doc) => ({...doc.data() }))

      if (usernameSnapshot.size > 0 && usernames[0].email!=user.email) {
        alert(
          "Este nombre de usuario ya está registrado. Por favor, elige otro."
        );
        console.log(usernames[0].email)
      } else {
        updateUsers({
          name: nameInput,
          username: usernameInput,
          videogame: selectedGame,
          email: user.email,
        });
        navigate("/");
        alert("Perfil actualizado!")
        console.log("Registrando cambios en el usuario...");
      }
    }
  };

  const handleNameChange = (e) => {
    if (e.target.value !== users.find(usere => usere.email == user.email)?.name) {
      setNameInput(e.target.value);
    }
  };

  const handleLastNameChange = (e) => {
    if (e.target.value !== users.find(usere => usere.email == user.email)?.last_name) {
      setLast_name(e.target.value);
    }
  };

  const handleUsernameChange = (e) => {
    if (e.target.value !== users.find(usere => usere.email == user.email)?.username) {
      setUsernameInput(e.target.value);
    }
  };

  const searchGame = () => {
    gameOptions
    console.log(gameOptions)
  }

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
        />
        <label>Apellido:</label>
        <input
        className={styles.formInput}
        type="name"
        value={last_name}
        onChange={handleLastNameChange}
        />
        
        <label>Nombre de usuario</label>
        <input
          className={styles.formInput}
          type="name"
          value={usernameInput}
          onChange={handleUsernameChange}
        />

        <div>
        <p>Tu juego favorito es: {gameTitle}</p>
        
        </div>
        <label>Seleccionar otro juego:</label>
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
        <div>Membresías: </div>
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
