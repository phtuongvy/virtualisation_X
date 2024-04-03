// Dans votre fichier users.js

import { defineStore } from 'pinia';
import axios from 'axios';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null
  }),
  actions: {
    setUser(userData) {
      this.user = userData;
    },
  },
});