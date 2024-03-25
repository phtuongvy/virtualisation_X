<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ref, computed, createApp } from 'vue'
import HelloWorld from './components/HelloWorld.vue'



const title = ref("Ça se passe maintenant!")

</script>

<template>
  
    <div class="signupAndLogo">
      <div>
        <img src="./assets/ylogo.png" alt="Y logo">
    
      </div>
  
      <div>
        
          <HelloWorld :msg="title" /> 
    
          <HelloWorld msg="Inscrivez-vous."/>
          <!-- <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/about">About</RouterLink>
          <RouterLink to="/user">User name</RouterLink> -->
          <RouterLink to="/signup">Créer un compte</RouterLink>
          <h2>Vous avez déjà un compte ?</h2>
          <RouterLink to="/login">Se connecter</RouterLink>
        
      </div>

    </div>



  <RouterView />
</template>

<style scoped>

@font-face {
  font-family: 'ChirpExtendedHeavy';
  src: url('@/assets/fonts/ChirpExtendedHeavy.ttf') format('truetype');
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
