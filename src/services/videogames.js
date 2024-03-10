import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

const fetchGameDetails = async (gameIds) => {
  const gameDetails = [];

  for (const gameId of gameIds) {
    const gameDocRef = doc(db, "videogames", gameId);
    const gameDocSnapshot = await getDoc(gameDocRef);

    if (gameDocSnapshot.exists()) {
      const gameData = gameDocSnapshot.data();
      gameDetails.push({
        id: gameId,
        name: gameData.titulo,
        description: gameData.descripcion,
      });
    } else {
      console.log(`No se encontró el juego con ID ${gameId}`);
    }
  }
  console.log(gameDetails);
  return gameDetails;
};

export default fetchGameDetails;
