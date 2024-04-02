<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useUserStore } from '@/stores/users'; // Assurez-vous que le chemin d'importation est correct

const authlogin = ref('');
const authpasswd = ref('');
const errorMessage = ref(''); 

const userStore = useUserStore();

const login = async () => {
  errorMessage.value = ''; 
  try {
    const response = await axios.post('http://localhost:30001/login', {
      YUSERNAME: authlogin.value,
      YUSERPASSWORD: authpasswd.value,
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    userStore.setUser(response.data);
    console.log(userStore.user); // Affiche les données de l'utilisateur
  } catch (error) {
    if (error.response && error.response.status === 404) {
      errorMessage.value = "Nom d'utilisateur ou mot de passe incorrect.";
    } 
    console.error("Erreur lors de la connexion : ", error);
  }
};
</script>


<template>

  <div id="auth">
    <div v-show="errorMessage">{{ errorMessage }}</div>
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