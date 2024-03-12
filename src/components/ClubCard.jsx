/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import styles from "./ClubCard.module.css";

export default function ClubCard({ club, checkSubscription, user }) {
  const navigate = useNavigate();
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    const fetchSubscriptionStatus = async () => {
      if (user) {
        const subscribed = await checkSubscription(user, club.id);
        setIsSubscribed(subscribed);
      }
    };

    fetchSubscriptionStatus();
  }, [checkSubscription, user, club.id]);

  const handleDetails = () => {
    navigate(`/club/${club.id}`);
    console.log(club.id);
  };

  return (
    <Card className={styles.cardContainer}>
      <CardContent>
        <div className={styles.cardTitle}>{club.nombre}</div>
        <div className={styles.cardDescription}>{club.descripcion}</div>
        <img
          src={`/src/assets/images/Club/Clubes/${club.id}.jpg`}
          alt={`Club ${club.id}`}
          className={styles.cardImage}
        />
        <div className={styles.cardSubscription}>
          {isSubscribed ? "Suscrito" : "No suscrito"}
        </div>
        <button className={styles.buttonClub} onClick={handleDetails}>
          Ver club
        </button>
      </CardContent>
    </Card>
  );
}
