/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import {
  getDocs,
  getDoc,
  query,
  collection,
  where,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import styles from "../components/Club.module.css";
import fetchGameDetails from "../services/videogames.js";
import AppLayout from "../layout/AppLayout.jsx";
import { useParams } from "react-router-dom";
import { useUser } from "../context/user";

import bg1 from "../assets/images/Club/1.jpg";
import bg2 from "../assets/images/Club/2.jpg";
import bg3 from "../assets/images/Club/3.jpg";
import bg4 from "../assets/images/Club/4.jpg";
import bg5 from "../assets/images/Club/5.jpg";

import gm1 from "../assets/images/Club/Games/1.jpg";
import gm2 from "../assets/images/Club/Games/2.jpg";
import gm3 from "../assets/images/Club/Games/3.jpg";
import gm4 from "../assets/images/Club/Games/4.jpg";
import gm7 from "../assets/images/Club/Games/7.jpg";
import gm8 from "../assets/images/Club/Games/8.jpg";
import gm9 from "../assets/images/Club/Games/9.jpg";
import gm10 from "../assets/images/Club/Games/10.jpg";
import gm11 from "../assets/images/Club/Games/11.jpg";
import gm13 from "../assets/images/Club/Games/13.jpg";
import gm14 from "../assets/images/Club/Games/14.jpg";
import gm15 from "../assets/images/Club/Games/15.jpg";
import gm16 from "../assets/images/Club/Games/16.jpg";
import gm17 from "../assets/images/Club/Games/17.jpg";
import gm18 from "../assets/images/Club/Games/18.jpg";
import gm112 from "../assets/images/Club/Games/112.jpg";




export default function Club() {
  const [clubData, setClubData] = useState();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [, setGameImageIds] = useState([]);
  const [backgroundImage, setBackgroundImage] = useState("");
  const [gameDetails, setGameDetails] = useState([]);
  const { id } = useParams();

  const clubId = id;
  const user = useUser();
  const fondos = [bg1, bg2, bg3, bg4, bg5];
  const juegos = {1: gm1, 2: gm2, 3: gm3, 4: gm4, 7: gm7, 8: gm8, 9: gm9, 10: gm10, 
    11: gm11, 13: gm13, 14: gm14, 15: gm15, 16: gm16, 17: gm17, 18: gm18, 112: gm112};

  useEffect(() => {
    const fetchClubData = async () => {
      const clubDocRef = doc(db, "clubs", clubId);
      const clubDocSnapshot = await getDoc(clubDocRef);

      if (clubDocSnapshot.exists()) {
        const clubDataFromFirebase = clubDocSnapshot.data();
        setClubData(clubDataFromFirebase);

        const videojuegoIds = clubDataFromFirebase.videojuegos || [];
        setGameImageIds(videojuegoIds);

        const imageUrl = `/src/assets/images/Club/${clubId}.jpg`;
        setBackgroundImage(fondos[clubId- 1]);

        const details = await fetchGameDetails(videojuegoIds);
        setGameDetails(details);
      } else {
        console.log("El club no existe en Firebase");
      }
    };

    const checkSubscription = async () => {
      if (user) {
        try {
          const userQuerySnapshot = await getDocs(
            query(collection(db, "users"), where("email", "==", user.email))
          );

          if (userQuerySnapshot.size > 0) {
            const userDocSnapshot = userQuerySnapshot.docs[0];
            const userMemberships = userDocSnapshot.data()?.memberships || [];

            const subscribed = userMemberships.includes(clubId);
            setIsSubscribed(subscribed);
          }
        } catch (error) {
          console.error(
            "Error al verificar la suscripción del usuario al club:",
            error
          );
        }
      }
    };

    if (clubId) {
      fetchClubData();
      checkSubscription();
    }
  }, [clubId, user]);

  const handleSubscribe = async () => {
    if (user) {
      try {
        const userQuerySnapshot = await getDocs(
          query(collection(db, "users"), where("email", "==", user.email))
        );

        if (userQuerySnapshot.size > 0) {
          const userDocSnapshot = userQuerySnapshot.docs[0];
          const userDocRef = doc(db, "users", userDocSnapshot.id);

          const userMemberships = userDocSnapshot.data()?.memberships || [];

          if (isSubscribed) {
            // Usuario está suscrito, proceder con cancelar suscripción
            const shouldUnsubscribe = window.confirm(
              "¿Estás seguro que deseas cancelar la suscripción a este club?"
            );

            if (shouldUnsubscribe) {
              const updatedMemberships = userMemberships.filter(
                (id) => id !== clubId
              );

              await updateDoc(userDocRef, { memberships: updatedMemberships });

              console.log(`Usuario canceló la suscripción al club ${clubId}`);
              setIsSubscribed(false);
            }
          } else {
            // Usuario no está suscrito, proceder con suscripción
            const shouldSubscribe = window.confirm(
              "¿Estás seguro que deseas unirte a este club?"
            );

            if (shouldSubscribe) {
              const updatedMemberships = [...userMemberships, clubId];

              await updateDoc(userDocRef, { memberships: updatedMemberships });

              console.log(`Usuario se unió al club ${clubId}`);
              setIsSubscribed(true);
            }
          }
        } else {
          console.error(
            "No se encontró un documento del usuario con ese correo electrónico"
          );
        }
      } catch (error) {
        console.error("Error al manejar la suscripción al club:", error);
      }
    }
  };

  return (
    <AppLayout>
      <div className={styles.container}>
        
        {clubData ? (
          <div className={styles.clubContainer}>
            <div className={styles.text}>{clubData.nombre}</div>
            <p>{clubData.descripcion}</p>
            <div className={styles.gamesContainer}>
              {gameDetails.map((gameDetail) => (
                <div key={gameDetail.id} className={styles.gameCard}>
                  <img
                    src={juegos[gameDetail.id]}
                    alt={`Game ${gameDetail.id}`}
                    className={styles.gameImage}
                  />
                  <h2>{gameDetail.name}</h2>
                  <p>{gameDetail.description}</p>
                </div>
              ))}
            </div>
            <button
              className={styles.subscribeButton}
              style={{ backgroundColor: isSubscribed ? "#e74c3c" : "#2ecc71" }}
              onClick={handleSubscribe}
            >
              {isSubscribed ? "Cancelar suscripción" : "Suscribirse"}
            </button>
          </div>
        ) : (
          <p>Cargando datos del club...</p>
        )}
      </div>
      <style>
        {`
          body {
            margin: 0;
            padding: 0;
            background-image: url("${backgroundImage}");
            background-size: cover;
            background-repeat: no-repeat; 
            background-attachment: fixed;
            background-position: center;
            box-sizing: border-box;
            display: flex;
            height: 100vh;
            justify-content: center;
            align-items: center;
          }
        `}
      </style>
    </AppLayout>
  );
}
