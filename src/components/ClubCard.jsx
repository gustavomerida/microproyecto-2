/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { Card, CardContent, Typography, Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

export default function ClubCard({ club, isSubscribed }) {
  const navigate = useNavigate();

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
        <div color="primary">
          {isSubscribed ? "Suscrito" : "Suscribirse"}
        </div>
        <Button variant="contained" color="secondary" onClick={handleDetails}>
          Ver club
        </Button>
      </CardContent>
    </Card>
  );
}
