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

html, body {
  height: 100%;

}
a{
    text-decoration: none;
    color: black;

}

button{
    text-align: center;
    border-radius: 20px;
    padding: 10px;
    
}

.btnSignUp {
  background-color: #1DA1F2;
  color: black; 
  border: none; 
  padding: 10px 20px; 
  text-align: center; 
  text-decoration: none; 
  display: inline-block; 
  font-size: 16px; 
  margin: 4px 2px; 
  cursor: pointer; 
  transition-duration: 0.4s;
}

.btnSignUp:hover {
  background-color: white; /* Change the background color when hovered over */
  color: #1DA1F2; /* Change the text color when hovered over */
}

body{
    margin: 0; /*reset default margin*/
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap:200px;
   
}

.signupAndLogo{ 
  flex-direction: row;
  display: flex;

}

img{
  width: 265px;
  height: 239px;
}

*:not(img){
  background-color: white;
  color: black;
  font-family: 'ChirpExtendedHeavy', sans-serif;
}

</style>
