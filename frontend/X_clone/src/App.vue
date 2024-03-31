<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ref, computed, createApp } from 'vue'
// import Auth from '@/components/Auth.vue'
import Start from './components/Start.vue';


</script>

<template>
  
    <Start/>

    <RouterLink to="/home">Home</RouterLink>



  <RouterView />
</template>

<style scoped>



</style>
