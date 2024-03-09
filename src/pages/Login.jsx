/* eslint-disable no-unused-vars */
import React from 'react'
import styles from './Login.module.css'

function Login() {
  const handleEmailLogin = () => {
      // Lógica para iniciar sesión con correo electrónico y contraseña
  };

  const handleGoogleLogin = () => {
      // Lógica para iniciar sesión con Google
  };

  const handleTwitterLogin = () => {
      // Lógica para iniciar sesión con Twitter
  };

  return (
    <div className={styles.loginContainer}> {/* Aplica la clase de estilo al contenedor principal */}
    <h1 className={styles.loginTitle}>Inicio de Sesión</h1> {/* Aplica la clase de estilo al título */}
    <form>
        <label>Email:</label>
        <input className={styles.formInput} type="email" placeholder="Correo electrónico" /> {/* Aplica la clase de estilo al input */}
        <label>Contraseña:</label>
        <input className={styles.formInput} type="password" placeholder="Contraseña" /> {/* Aplica la clase de estilo al input */}
        <button type="button" className={styles.loginButton} onClick={handleEmailLogin}>Iniciar Sesión con Email</button> {/* Aplica la clase de estilo al botón */}
    </form>
    <button type="button" className={styles.socialButton} onClick={handleGoogleLogin}>Iniciar Sesión con Google</button> {/* Aplica la clase de estilo al botón */}
    <button type="button" className={styles.socialButton} onClick={handleTwitterLogin}>Iniciar Sesión con Twitter</button> {/* Aplica la clase de estilo al botón */}
</div>
  );
}

export default Login;
