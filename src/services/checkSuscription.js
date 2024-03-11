import { getDocs, query, where, collection } from "firebase/firestore";
import { db } from "../firebase";

export const checkSubscription = async (user, clubId) => {
  try {
    const userQuerySnapshot = await getDocs(
      query(collection(db, "users"), where("email", "==", user.email))
    );

    if (userQuerySnapshot.size > 0) {
      const userDocSnapshot = userQuerySnapshot.docs[0];
      const userMemberships = userDocSnapshot.data()?.memberships || [];

      return userMemberships.includes(clubId);
    } else {
      console.error(
        "No se encontró un documento del usuario con ese correo electrónico"
      );
      return false;
    }
  } catch (error) {
    console.error(
      "Error al verificar la suscripción del usuario al club:",
      error
    );
    return false;
  }
};
