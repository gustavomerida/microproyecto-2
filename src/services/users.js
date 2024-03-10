import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";

export async function updateUsers({ username, videogame, email }) {
  const usersCollection = collection(db, "users");
  const usersQuery = query(usersCollection, where("email", "==", email));
  const usersSnapshot = await getDocs(usersQuery);

  if (usersSnapshot.size > 0) {
    const userDoc = usersSnapshot.docs[0].ref;

    await updateDoc(userDoc, { username, videogame });
    console.log(email);
    console.log("Usuario actualizado con éxito");
  } else {
    console.log(email);
    console.error("Usuario no encontrado");
  }
}
