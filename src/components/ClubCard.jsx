/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { useEffect, useState } from "react";
import { Card, CardContent, Typography, Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

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
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2">
          {club.nombre}
        </Typography>
        <Typography color="textSecondary">{club.descripcion}</Typography>
        {/* <img src={club.image} alt={club.name} style={{ maxWidth: '100%', height: 'auto' }} /> */}
        <div color="primary">{isSubscribed ? "Suscrito" : "Suscribirse"}</div>
        <Button variant="contained" color="secondary" onClick={handleDetails}>
          Ver club
        </Button>
      </CardContent>
    </Card>
  );
}
