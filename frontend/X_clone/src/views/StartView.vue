<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ref, computed, createApp } from 'vue'
import Start from '@/components/Start.vue'



</script>

<template>
  
    <div class="signupAndLogo">
      <div>
        <img src="@/assets/ylogo.png" alt="Y logo">
    
      </div>
  
      <div>
        
          <h1>Ça se passe maintenant!</h1>
    
          <h2>Inscrivez vous.</h2>
          <!-- <RouterLink to="/signup">Créer un compte</RouterLink> -->
          <button class="btnSignUp"><RouterLink to="/signup">Créer un compte</RouterLink></button>
          <h2>Vous avez déjà un compte ?</h2>
          <!-- <RouterLink to="/login">Se connecter</RouterLink> -->
          <button class="btnSignIn"><RouterLink to="/login">Se connecter</RouterLink></button>

        
      </div>

    </div>



  <RouterView />
</template>

<style scoped>

@font-face {
  font-family: 'ChirpExtendedHeavy';
  src: url('@/assets/fonts/ChirpExtendedHeavy.ttf') format('truetype');
    
}

* {
  height: 100%;
  font-family: 'ChirpExtendedHeavy', sans-serif;

}

a {
  text-decoration: none;
  color: black;
}


.startPage {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 50px;
}

.leftColumn, .rightColumn {
  flex: 1;
}

button {
  display: block;
  width: 100%;
  padding: 15px;
  margin: 10px 0;
  font-size: 16px;
  border-radius: 25px;
  cursor: pointer;
  transition-duration: 0.4s;
}

.btnSignUp {
  background-color: #1DA1F2;
  color: white;
  border: none;
}

.btnSignUp:hover {
  background-color: white;
  color: #1DA1F2;
  border: 2px solid #1DA1F2;
}

.btnSignIn {
  background-color: transparent;
  color: #1DA1F2;
  border: 2px solid #1DA1F2;
}

.btnSignIn:hover {
  background-color: #1DA1F2;
  color: white;
}

img {
  width: 265px;
  height: 239px;
  margin-bottom: 20px;
}

</style>
