import { collection, setDoc, doc } from "firebase/firestore";
import { db } from "../firebase.js";
import jsonData from "../data.json";

export async function loadGameData() {
  const gamesCollection = collection(db, "videogames");

  for (const game of jsonData.videojuegos) {
    const gameId = game.ID;
    const gameDocRef = doc(gamesCollection, gameId);

    const gameDataWithoutID = { ...game };
    delete gameDataWithoutID.ID;

    await setDoc(gameDocRef, gameDataWithoutID);
    console.log(`Game with ID ${game.ID} added to the database.`);
  }
}

export async function loadClubData() {
  const clubsCollection = collection(db, "clubs");

  for (const club of jsonData.clubes) {
    const clubId = club.ID;
    const clubDocRef = doc(clubsCollection, clubId);

    const clubDataWithoutID = { ...club };
    delete clubDataWithoutID.ID;

    await setDoc(clubDocRef, clubDataWithoutID);
    console.log(`Club with ID ${club.ID} added to the database.`);
  }
}
