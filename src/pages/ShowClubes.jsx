/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { collection, query, getDoc, doc, getDocs } from "firebase/firestore";
import { loadClubData } from '../services/importData';
import ClubCard from '../components/ClubCard';
import { db } from '../firebase';
import styles from './ShowClubes.module.css'
import AppLayout from "../layout/AppLayout";

function ShowClubes() {
    const [clubs, setClubs] = useState([]);

  useEffect(() => {
    const fetchClubData = async () => {
      try {
          const clubsCollection = collection(db, "clubs");
          const clubsQuery = query(clubsCollection);
        const clubDataSnapshot = await getDocs(clubsQuery); 
        const clubData = clubDataSnapshot.docs.map((doc) => ({id : doc.id,
            ...doc.data()})); 
        setClubs(clubData); 
      } catch (error) {
        console.error('Error al cargar los datos de clubes:', error);
      }
    };

        fetchClubData();
    }, []); // Se ejecuta solo una vez al montar el componente

    console.log(clubs)

      return (
        <AppLayout>
            <div className={styles.container}>
                {clubs.map(club => (
                    <div key={club.id} className={styles.card}>
                    <ClubCard club={club} isSubscribed={false} />
                    </div>
                ))}
            </div>
        </AppLayout>
      )
    }
export default ShowClubes
