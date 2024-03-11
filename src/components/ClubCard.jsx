/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import { Card, CardContent, Typography, Button } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

export default function ClubCard({ club, isSubscribed }) {
    const navigate = useNavigate();
  
    const handleDetails = () => {
        navigate(`/club/${club.ID}`);
    };
  
    return (
      <Card>
        <CardContent>
          <Typography variant="h5" component="h2">
            {club.nombre}
          </Typography>
          <Typography color="textSecondary">
            {club.descripcion}
          </Typography>
          {/* <img src={club.image} alt={club.name} style={{ maxWidth: '100%', height: 'auto' }} /> */}
          <div>
            {isSubscribed ? 'Suscrito' : 'No estás suscrito'}
          </div>
          <Button variant="contained" color="primary" onClick={handleDetails}>
            Ver Detalles
          </Button>
        </CardContent> 
      </Card>
    );
}


