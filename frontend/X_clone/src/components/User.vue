<script>
import { useUsersStore } from '@/stores/users'
import { ref, computed, reactive } from 'vue'

const users = useUsersStore()

const authlogin = ref("")
const authpasswd = ref("")

function login() {


    console.log(users.authlogin)
}

function logout() {
    users.user = null
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
</style>