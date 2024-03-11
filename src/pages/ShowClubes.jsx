/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { collection, query, getDocs } from "firebase/firestore";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ClubCard from "../components/ClubCard";
import { db } from "../firebase";
import styles from "./ShowClubes.module.css";
import AppLayout from "../layout/AppLayout";
import { useUser } from "../context/user";
import { checkSubscription } from "../services/checkSuscription";

function ShowClubes() {
  const [clubs, setClubs] = useState([]);
  const user = useUser();

  useEffect(() => {
    const fetchClubData = async () => {
      try {
        const clubsCollection = collection(db, "clubs");
        const clubsQuery = query(clubsCollection);
        const clubDataSnapshot = await getDocs(clubsQuery);
        const clubData = clubDataSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setClubs(clubData);
      } catch (error) {
        console.error("Error al cargar los datos de clubes:", error);
      }
    };

    fetchClubData();
  }, []); // Se ejecuta solo una vez al montar el componente

  console.log(clubs);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className={styles.container}>
        <Slider {...settings}>
          {clubs.map((club) => (
            <div key={club.id} className={styles.card}>
              <ClubCard
                key={club.id}
                club={club}
                checkSubscription={checkSubscription}
                user={user}
              />
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
}

export default ShowClubes;
