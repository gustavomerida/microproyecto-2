/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { loadGameData, loadClubData } from "../services/importData";
import React from "react";
import AppLayout from "../layout/AppLayout";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/user";


export default function Home() {
  const [id, setID] = useState("");
  const [title, setTitle] = useState("");
  const [gender, setGender] = useState("");
  const [description, setDescription] = useState("");

  async function handleSubmit() {
    await loadGameData();
    await loadClubData();
    alert("Pelicula creada");
  }

  const user = useUser();
  const navigate = useNavigate();

  const vistaClubs=() => {
    if (user) {
      navigate("/clubs", { replace: true });
      console.log(user);
    }
  };

  return (
    <AppLayout>
      <div>
        <h1>Esta es la página principal jeje</h1>
        <input value={id} onChange={(e) => setID(e.target.value)} />
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
        <input value={gender} onChange={(e) => setGender(e.target.value)} />
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={handleSubmit}>Enviar</button>
        <div><button onClick={vistaClubs}>Ver Clubs</button></div>
      </div>
    </AppLayout>
  );
}
