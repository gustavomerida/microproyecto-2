import { useState } from "react";
import { loadGameData, loadClubData } from "../services/importData";

/* eslint-disable no-unused-vars */
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

  return (
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
    </div>
  );
}
