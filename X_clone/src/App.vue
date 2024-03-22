<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ref, computed, createApp } from 'vue'
import HelloWorld from './components/HelloWorld.vue'


const title = ref("Ça se passe maintenant!")

</script>

<template>
  <header>
    <div>
      <div>
        <img src="./assets/ylogo.png" alt="Y logo">
    
      </div>
  
      <div>
        
          <HelloWorld :msg="title" /> 
    
          <HelloWorld msg="Inscrivez-vous."/>
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/about">About</RouterLink>
          <RouterLink to="/user">User name</RouterLink>
        
      </div>

    </div>

  </header>

  <RouterView />
</template>

<style scoped>
div {
  flex-direction: row;
  display: flex;

}
img{
  width: 265px;
  height: 239px;
}

</style>
