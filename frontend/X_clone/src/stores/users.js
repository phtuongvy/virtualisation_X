import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'


export const useUsersStore = defineStore('users', () => {

    const user = ref(null)
    const url = "http://localhost:30001/"

    const users = reactive([])

    function login(auth){
        axios.post(url,+"/login",auth).then(response => {

            console.log(response.data)
        })
    }













    // // Fetch the users data from an API
    // fetch(url)
    //     .then(response => response.json())
    //     .then(data => {
    //         users.value = data
    //     })
    //     .catch(error => {
    //         console.error('Error fetching users:', error)
    //     })

    return { users }
})
