<script setup>
import { twitterStore } from '@/stores/twitter'
import { ref, computed } from 'vue'
import Tweet from '@/components/Tweet.vue'
const twitter = twitterStore()
const newTweet = ref("")

function post() {
  twitter.post(newTweet.value)
}


</script>


<template>

  <div id="userError" v-if="!twitter.user">
    Vous devez être connecté pour voir et poster des tweets !
  </div>

  <div id="post" v-if="twitter.user">
    <textarea v-model="newTweet"> </textarea>
    <button @click="post">Poster</button>
  </div>

  <section>
    
    <article v-if="twitter.user">
      
      <Tweet 
        v-for="tweet in twitter.tweets" 
        :key="tweet.idtweet"
        :value="tweet"
        />
    </article>

  </section>
</template>



<style scoped>
  
</style>