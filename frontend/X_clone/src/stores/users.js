import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'


export const user = reactive({
    user: null,
  
    setUser(userData) {
      this.user = userData;
    },
  });
