/* eslint-disable no-unused-vars */
import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
//import Input from '../components/Input'
//import Button from '../components/Button'
import { useUser } from '../context/user'
import { registerWithCredentials } from '../controllers/auth'
import styles from './Register.module.css'

function Register() {

    const user= useUser();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(()=>{
        if(user){
            navigate('/', {replace : true})
            console.log(user)
        }
    }, [user, navigate]);

    const handleLogin = async ()=> {
        const user = await registerWithCredentials(email, password);
        if (user!== null){
            navigate('/');
            console.log(user)
        }else{
            alert("No se pudo crear la cuenta");
        }
    };

  return (
    <div className={styles.loginContainer}> {/* Aplica la clase de estilo al contenedor principal */}
    <h1 className={styles.loginTitle}>Registro de usuarios</h1> {/* Aplica la clase de estilo al título */}
    <form>
        <label>Nombre:</label>
        <input className={styles.formInput} type="name" placeholder="Escribe tu nombre" onChange={(e)=>setName(e.target.value)}/>
        <label>Apellido:</label>
        <input className={styles.formInput} type="lastname" placeholder="Escribe tu apellido" onChange={(e)=>setLastname(e.target.value)}/>
        <label>Email:</label>
        <input className={styles.formInput} type="email" placeholder="Correo electrónico" onChange={(e)=>setEmail(e.target.value)}/> {/* Aplica la clase de estilo al input */}
        <label>Contraseña:</label>
        <input className={styles.formInput} type="password" placeholder="Contraseña" onChange={(e)=>setPassword(e.target.value)}/> {/* Aplica la clase de estilo al input */}
        <button type="button" className={styles.loginButton} onClick={handleLogin} >Iniciar Sesión con Email</button> {/* Aplica la clase de estilo al botón */}
    </form>
    <button type="button" className={styles.socialButton} >Iniciar Sesión con Google</button> {/* Aplica la clase de estilo al botón */}
    <button type="button" className={styles.socialButton} >Iniciar Sesión con Facebook</button> {/* Aplica la clase de estilo al botón */}
    </div>
  )
}

export default Register
