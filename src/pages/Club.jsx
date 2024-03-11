import { useState, useEffect } from "react";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import styles from "../components/Club.module.css";
import fetchGameDetails from "../services/videogames.js";
import AppLayout from "../layout/AppLayout.jsx";
import { useParams } from 'react-router-dom';

export default function Club() {
  const [clubData, setClubData] = useState();
  const [isSubscribed, setIsSubscribed] = useState();
  const [userClubs, setUserClubs] = useState([]);
  const [, setGameImageIds] = useState([]);
  const [backgroundImage, setBackgroundImage] = useState("");
  const [gameDetails, setGameDetails] = useState([]);

  const { clubId } = useParams();

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
        setBackgroundImage(imageUrl);

        const details = await fetchGameDetails(videojuegoIds);
        setGameDetails(details);
      } else {
        console.log("El club no existe en Firebase");
      }
    };

    if (clubId) {
      fetchClubData();
    }
  }, [clubId]);

  const handleSubscribe = () => {
    const isConfirmed = window.confirm(
      "¿Estás seguro que deseas suscribirte a este club?"
    );

    if (isConfirmed) {
      setIsSubscribed((prevState) => !prevState);
      if (!userClubs.includes(clubId)) {
        setUserClubs((prevClubs) => [...prevClubs, clubId]);

        console.log(
          `Añadiendo club ${clubId} a la lista de clubes del usuario`
        );
      }
    }
  };

  return (
    <>
    <AppLayout>
      <div className={styles.container}>
        <div>
          <button className={styles.backButton}>Regresar</button>
        </div>
        {clubData ? (
          <div className={styles.clubContainer}>
            <h1>{clubData.nombre}</h1>
            <p>{clubData.descripcion}</p>
            <div className={styles.gamesContainer}>
              {gameDetails.map((gameDetail) => (
                <div key={gameDetail.id} className={styles.gameCard}>
                  <img
                    src={`/src/assets/images/Club/Games/${gameDetail.id}.jpg`}
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
            background-image: url("${backgroundImage}");
            background-size: cover;
            background-position: center;
            box-sizing: border-box;
            margin: 0;
            padding: 32px;
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        `}
      </style>
    </AppLayout>
    </>
  );
}
