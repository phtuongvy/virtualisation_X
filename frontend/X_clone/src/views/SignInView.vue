<script setup>
import { ref, computed, reactive } from 'vue'
import { useUsersStore } from '@/stores/users';

const users = useUsersStore()

const authlogin = ref("")
const authpasswd = ref("") 

function login() {
    users.login({ 
        login: authlogin.value, 
        password: authpasswd.value
   })
    console.log(authpasswd)
}
 
</script>


<template>

<div id="auth"> 

       
<input v-model="authlogin">
<input v-model="authpasswd">

<button @click="login">Connecter</button>


<!-- <div id="logout" v-if="users.user">
  <button @click="logout">Déconnecter</button>
</div> -->



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