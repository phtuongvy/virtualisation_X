<template>
  <div class="home-view">
    <h1>Bienvenue à Y</h1>
    <div v-for="tweet in tweets" :key="tweet.postid" class="tweet">
      <div class="tweet-header">
        <img :src="tweet.user.avatar" alt="User Avatar" class="avatar" />
        <div class="user-info">
          <h3>{{ tweet.user.name }}</h3>
          <p>{{ tweet.user.username }}</p>
        </div>
      </div>
      <p class="tweet-content">{{ tweet.postdescription }}</p>
      <div class="tweet-footer">
        <button @click="likeTweet(tweet.postid)" class="like-button">
          {{ tweet.likes }} Likes
        </button>
        <button @click="retweet(tweet.postid)" class="retweet-button">
          {{ tweet.retweets }} Retweets
        </button>
      </div>
    </div>
  </div>
</template>

<script>

import axios from 'axios';


export default {
  data() {
    return {
      tweets: []
    };
  },
  created() {
    axios.get('http://localhost:30001/posts')
      .then(response => {
        this.tweets = response.data;
      })
      .catch(error => {
        console.error(error);
      });
  },
  methods: {
    likeTweet(tweetId) {
      // Implement like functionality here...
    },
    retweet(tweetId) {
      // Implement retweet functionality here...
    }
  }
};
</script>

<style scoped>
.tweet {
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #e6ecf0;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 0 5px rgba(0,0,0,0.03);
}

.tweet-header {
  display: flex;
  align-items: center;
}

.avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  margin-right: 10px;
}

.user-info {
  display: flex;
  flex-direction: column;
}

.tweet-content {
  margin-top: 10px;
  color: #14171a;
  font-size: 15px;
}

.tweet-footer {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
}

.like-button,
.retweet-button {
  background-color: transparent;
  border: none;
  padding: 5px 10px;
  margin-right: 10px;
  cursor: pointer;
  color: #657786;
  font-size: 13px;
}

.like-button:hover,
.retweet-button:hover {
  color: #1da1f2;
}

</style>