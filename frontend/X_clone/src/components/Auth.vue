<script setup>
import { twitterStore } from '@/stores/twitter'
import { ref, computed } from 'vue'

const twitter = twitterStore()

const authlogin = ref("")
const authpasswd = ref("")

function login() {
  twitter.login({ 
    login: authlogin.value, 
    password: authpasswd.value
  })
}

function logout() {
  twitter.user = null
}


</script>



<template>
  <div id="auth"> 

    <div id="login" v-if="!twitter.user">
      <input v-model="authlogin">
      <input v-model="authpasswd">

      <button @click="login">Connecter</button>
    </div>

    <div id="logout" v-if="twitter.user">
      <button @click="logout">Déconnecter</button>
    </div>



  </div>
</template>



<style scoped>
</style>
