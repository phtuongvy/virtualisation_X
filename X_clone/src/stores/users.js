import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUsersStore = defineStore('users', () => {
  
    const theUsers = ref([
        {
            "name": "BMW X3 SUV",
            "year": 2023,
            "price": 45000
            
        },
        {
            "name": "BMW X5 SUV",
            "year": 2022,
            "price": 60000
        },
        {
            "name": "BMW X7 SUV",
            "year": 2024,
            "price": 75000
        },
        {
            "name": "BMW 3 Series Sedan",
            "year": 2022,
            "price": 41000
        },
        {
            "name": "BMW 5 Series Sedan",
            "year": 2023,
            "price": 54000
        },
        {
            "name": "BMW 7 Series Sedan",
            "year": 2024,
            "price": 86000
        }
    ])

  return { theUsers }
})
