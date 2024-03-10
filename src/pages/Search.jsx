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
import AppLayout from "../layout/AppLayout.jsx";

export default function Search(){
    const user = useUser();
    const navigate = useNavigate();
    const [gameOptions, setGameOptions] = useState([]);
    const [searchresult, setSearchresult] = useState("");
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

      console.log(gameOptions)
  

    return(
        <AppLayout>
            <div>lol</div>
        </AppLayout>
    )
}