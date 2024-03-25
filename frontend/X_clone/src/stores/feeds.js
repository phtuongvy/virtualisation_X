import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'

export const useFeedsStore = defineStore('feeds', () => {
  
    const feeds = reactive([])

    // Fetch the feeds data from an API
    fetch('https://api.example.com/feeds')
        .then(response => response.json())
        .then(data => {
            feeds.value = data
        })
        .catch(error => {
            console.error('Error fetching feeds:', error)
        })

    return { feeds }
})
