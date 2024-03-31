import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'

export const useUsersStore = defineStore('users', () => {

    

    const users = reactive([])

    // Fetch the users data from an API
    fetch('http://localhost:30001/users')
        .then(response => response.json())
        .then(data => {
            users.value = data
        })
        .catch(error => {
            console.error('Error fetching users:', error)
        })

    return { users }
})
