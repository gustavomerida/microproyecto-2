/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
// import { on AuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'
// import { auth } from '../firebase'
// import { User Context } from '../context/user'

export default function UserProvider( {children} ) {
    const [user, setUser] = useState(null)

    //useEffect(()=> {
        //console.log('Hola')
        // onAuthStateChanged(auth, (user) => {
        //     console.log(user !== null ? "Usuario Loggeado": "Usuario no loggeaado");
        //     setUser(user);
       // });
    //}, [] );

  return (
    <>
    {/* <UserContext.Provider value={user}>{children}</UserContext.Provider> */}
    </>
  )
}

