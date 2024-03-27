import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'

export const useUsersStore = defineStore('users', () => {
  
    // const users = ref([
    //     {
    //         "name": "User 1",
    //         "age": 25,
    //         "email": "user1@example.com"
    //     },
    //     {
    //         "name": "User 2",
    //         "age": 30,
    //         "email": "user2@example.com"
    //     },
    //     {
    //         "name": "User 3",
    //         "age": 35,
    //         "email": "user3@example.com"
    //     }
    // ])
    

    const users = reactive([])

    // Fetch the users data from an API
    fetch('https://api.example.com/users')
        .then(response => response.json())
        .then(data => {
            users.value = data
        })
        .catch(error => {
            console.error('Error fetching users:', error)
        })

    return { users }
})
