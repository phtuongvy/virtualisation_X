<script setup>

import { RouterLink } from 'vue-router';
import { ref, computed, reactive } from 'vue'
import axios from 'axios';
import user from '@/stores/users';

// Définissez les variables réactives pour le login et le mot de passe
const authlogin = ref('');
const authpasswd = ref('');

// Définissez la méthode login pour envoyer une requête POST au serveur
const login = async () => {
  try {
    console.log(authlogin.value, authpasswd.value); // Juste pour déboguer
    const response = await axios.post('http://localhost:30001/login', {
      YUSERNAME: authlogin.value,
      YUSERPASSWORD: authpasswd.value,
    }, {
          headers: {
          'Content-Type': 'application/json'
        }
    });;
    // Mettre à jour le magasin avec les données de l'utilisateur
    store.setUser(response.data.user);
    console.log(store.user); // Affiche les données de l'utilisateur stockées globalement
  } catch (error) {
    console.error("Erreur lors de la connexion : ", error);
  }
};

 
</script>


<template>

  <div id="auth">
    <input v-model="authlogin" type="email" placeholder="Login">
    <input v-model="authpasswd" type="password" placeholder="Mot de passe">
    <button @click="login">Connecter</button>
  </div>
    
</template>



<style scoped>

    body {
      font-family: Arial, sans-serif;
      background-color: #f5f8fa;
      color: #14171a;
      display: flex;
      justify-content: center; /* Centre horizontalement */
      align-items: center; /* Centre verticalement */
      height: 100vh; /* S'assure que le body prend toute la hauteur de la fenêtre */
      margin: 0;
    }

    #auth {
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      padding: 20px;
      width: 300px;
    }

    #login {
      display: flex;
      flex-direction: column;
    }

    input[v-model="authlogin"],
    input[v-model="authpasswd"] {
      border: 1px solid #ccd6dd;
      border-radius: 4px;
      padding: 10px;
      margin-bottom: 15px;
      font-size: 14px;
    }

    button {
      background-color: #1da1f2;
      color: white;
      border: none;
      border-radius: 20px;
      padding: 10px;
      cursor: pointer;
      font-weight: bold;
      font-size: 14px;
    }

    button:hover {
      background-color: #1991db;
    }



</style>