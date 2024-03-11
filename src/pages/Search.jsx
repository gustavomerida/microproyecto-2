/* eslint-disable no-unused-vars */
import React, { useReducer } from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/user";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase.js";
import styles from "./Search.module.css";
import { updateUsers } from "../services/users.js";
import { Divider } from "@material-ui/core";
import AppLayout from "../layout/AppLayout.jsx";
import { Card, CardContent, Typography, Button, TextField  } from '@material-ui/core';

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

      //console.log(gameOptions)
      const searcher = (e) => {
        setSearchresult(e.target.value)
      }

      // let results = [];
      // if (!searchresult){
      //   results = gameOptions
      // }else{
      //   results = gameOptions.filter((dato) => dato.titulo.toLowerCase().includes(searchresult.toLocaleLowerCase()))
      // }

      const results = !searchresult ? gameOptions : gameOptions.filter((dato) => dato.titulo.toLowerCase().includes(searchresult.toLocaleLowerCase()))

    return(
        
      <AppLayout>
        <TextField 
        className={styles.searchBar}
        value={searchresult}
        onChange={searcher}
        type="text"
        placeholder="Buscar..."
        variant="outlined" 
        />
    <div className={styles.gamesContainer}>
      {gameOptions.length > 0 ? (results.map((game) => (
        <Card key={game.id} className={styles.gameCard}>
          <CardContent>
            <Typography variant="h5" component="h2">
              {game.titulo}
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              {game.genero}
            </Typography>
            <Typography variant="body2" component="p">
              {game.descripcion}
            </Typography>
          </CardContent>
        </Card>
      ))) : (<h3>Cargando juegos...</h3>)}
    </div>
  </AppLayout>
    )
}