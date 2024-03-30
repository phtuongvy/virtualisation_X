import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'


export const twitterStore = defineStore('twitter', () => {

  const user = ref(null)
  const tweets = ref([])
  const url = "http://localhost:30001/"


  function login(auth) {
    axios.post(url+"login", auth).then( response => {
      console.log(response.data)
    })

  }


  function post(content) {
    // Vérifier les données
    // -> pour l'ergonomie
    let newTweet = {
      content: content,
      user: "Luc",
      timestamp: Date.now()
    }
    axios.post(url+"post", newTweet).then( response => {
      tweets.value.splice(0,0,newTweet)
    })
  }

  axios.get(url+"users")
    .then( response => {
      console.log(response.data)
      tweets.value = response.data
    })

  return { tweets, post, user, login }
})
