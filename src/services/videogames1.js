import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

export async function createVideoGames({ id, title, gender, description }) {
  const gamesCollection = collection(db, "videogames");
  const data = { id, title, gender, description };
  await addDoc(gamesCollection, data);
}

export async function updateVideoGames({ id, title, gender, description }) {
  const gamesCollection = collection(db, "videogames");
  const data = { id, title, gender, description };
  await addDoc(gamesCollection, data);
}
