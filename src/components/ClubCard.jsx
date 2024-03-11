/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { Card, CardContent, Typography, Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

export default function ClubCard({ club, isSubscribed }) {
  const navigate = useNavigate();

  const handleSubscribe = () => {
    // Lógica para suscribirse al club
  };

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
        <Button variant="contained" color="primary" onClick={handleSubscribe}>
          {isSubscribed ? "Suscrito" : "Suscribirse"}
        </Button>
        <Button variant="contained" color="secondary" onClick={handleDetails}>
          Ver club
        </Button>
      </CardContent>
    </Card>
  );
}
