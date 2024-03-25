<script setup>
import { ref, reactive, computed } from 'vue';

import { useFeedsStore } from '@/stores/feeds';

// Define an array of tweets
const feeds  = useFeedsStore();

</script>

<template>
  <main>
    <section>
      <header>
        <h2>Bienvenue sur Y!</h2>
      </header>

      <!-- Iterate over the tweets and render each tweet using the Tweet component -->
      <div v-for="feed in feeds" :key="feed.id">
        {{ feed.id }}
      </div>
    </section>
  </main>
</template>
