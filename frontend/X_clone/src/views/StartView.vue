<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ref, computed, createApp } from 'vue'
import Start from '@/components/Start.vue'



</script>

<template>
  <div class="startPage">
    <div class="leftColumn">
      <img src="@/assets/ylogo.png" alt="Y logo">
      <h1>Ça se passe maintenant!</h1>
    </div>
    <div class="rightColumn">
      <h2>Inscrivez vous.</h2>
      <RouterLink to="/signup"><button class="btnSignUp">Créer un compte</button></RouterLink>
      <h2>Vous avez déjà un compte ?</h2>
      <RouterLink to="/login"><button class="btnSignIn">Se connecter</button></RouterLink>
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

a{
  text-decoration: none;
  color: inherit;
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
