import {
  collection,
  query,
  where,
  getDoc,
  doc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { db } from "../firebase";

const updateUserMemberships = async (user, clubId, setUserClubs) => {
  const usersCollectionRef = collection(db, "users");
  const userQuery = query(usersCollectionRef, where("email", "==", user.email));
  const userQuerySnapshot = await getDoc(userQuery);

  if (userQuerySnapshot.exists()) {
    const userDocRef = doc(db, "users", userQuerySnapshot.id);

    const updatedMemberships = arrayUnion(clubId);

    await updateDoc(userDocRef, {
      memberships: updatedMemberships,
    });

    setUserClubs(updatedMemberships);

    console.log(`Añadiendo club ${clubId} a la lista de clubes del usuario`);
  } else {
    console.log("Usuario no encontrado en la base de datos");
  }
};

export default updateUserMemberships;
