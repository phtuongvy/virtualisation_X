<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';
import { useUserStore } from '@/stores/users'; // Assurez-vous que le chemin d'importation est correct
import { useRouter } from 'vue-router';


const authlogin = ref('');
const authpasswd = ref('');
const errorMessage = ref(''); 
const router = useRouter(); 
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
       // Supposons que response.data est un tableau et que vous souhaitez le premier objet
    if (response.data && response.data.length > 0) {
      const userData = response.data[0];
      userStore.setUser(userData); // Ici vous définissez les données utilisateur dans le store
      localStorage.setItem('yuserId', userData.YUSERID); // Assurez-vous que userData contient bien la propriété YUSERID
      console.log(userData.YUSERID); // Devrait afficher l'ID de l'utilisateur
      console.log(localStorage.getItem('yuserId')); // Devrait afficher l'ID de l'utilisateur
      router.push({ name: 'home' }); // Assurez-vous que 'home' est le nom correct de la route
    }
  } catch (error) {
    if (error.response && error.response.status === 404) {
      errorMessage.value = "Nom d'utilisateur ou mot de passe incorrect.";
    } 
    console.error("Erreur lors de la connexion : ", error);
  }
};

onMounted(() => {

const userId = localStorage.getItem('yuserId');
console.log(userId)
});
</script>


<template>

  <div class="startPage">
    <div class="leftColumn">
      <img src="@/assets/ylogo.png" alt="Y logo">
      <h1>Ça se passe maintenant!</h1>
    </div>
    <div class="rightColumn">
      <div class="error-message" v-show="errorMessage">{{ errorMessage }}</div>
      <label for="password">Login :</label>
      <input v-model="authlogin" type="email" >
      <label for="password">Mot de passe :</label>
      <input v-model="authpasswd" type="password" >
      <button @click="login">Connecter</button>
    </div>
  </div>
    
</template>



<style scoped>
  @font-face {
    font-family: 'ChirpExtendedHeavy';
    src: url('@/assets/fonts/ChirpExtendedHeavy.ttf') format('truetype');
  }

  * {
    font-family: 'ChirpExtendedHeavy', sans-serif;
    color: black; /* Mettre la couleur de texte en noir */
  }

  .startPage {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 50px;
    height: auto; /* ajustement pour assurer la hauteur auto */
  }

  .leftColumn, .rightColumn {
    flex: 1;
  }

  input[type="email"], input[type="password"] {
    width: 100%;
    padding: 15px;
    margin: 10px 0;
    border-radius: 5px; /* Bordures plus subtiles */
    border: 1px solid #ddd; /* Bordure légère */
    box-sizing: border-box; /* Pour inclure padding dans la largeur */
  }

  button {
    display: block;
    width: 100%;
    padding: 15px;
    margin: 10px 0;
    font-size: 16px;
    border-radius: 25px;
    cursor: pointer;
    transition: background-color 0.3s ease; /* Transition plus douce */
    border: none;
    background-color: #1DA1F2;
    color: white;
  }

  button:hover {
    background-color: #117dbb; /* Un bleu plus foncé au survol */
  }

  .error-message {
    color: #D8000C;
    background-color: #FFD2D2;
    padding: 10px;
    border-radius: 5px;
}

  img {
    width: 265px;
    height: 239px;
    margin-bottom: 20px;
  }
</style>
