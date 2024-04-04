// Dans votre fichier users.js

import { defineStore } from 'pinia';
import axios from 'axios';
import { onMounted, ref } from 'vue';

export const useUserStore = defineStore('user',()=> {
  
  const user = ref(null)


  
  function setUser(userData) {
      this.user = userData;
  }


  return { user, setUser}
});