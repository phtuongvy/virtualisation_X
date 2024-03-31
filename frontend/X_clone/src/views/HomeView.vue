<template>
  <div class="home-view">
    <h1>Bienvenue à Y</h1>
    <div v-for="tweet in tweets" :key="tweet.postid" class="tweet">
      <div class="tweet-header">
        <img :src="getUserAvatar(tweet.userid)" alt="User avatar" class="avatar">
        <div class="user-info">
          <h3>{{ getUserInfo(tweet.userid).name }}</h3>
          <p>{{ getUserInfo(tweet.userid).username }}</p>
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
import { RouterLink } from 'vue-router';


import axios from 'axios';


export default {
  data() {
    return {
      tweets: [],
      users: [],
      media: []
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
      
    axios.get('http://localhost:30001/users')
      .then(response => {
        this.users = response.data;
      })
      .catch(error => {
        console.error(error);
      });
    axios.get('http://localhost:30001/media')
      .then(response => {
        this.media = response.data;
      })
      .catch(error => {
        console.error(error);
      });
  },
  methods: {
    likeTweet(tweetId) {
      axios.post(`http://localhost:30001/posts/${tweetId}/like`)
        .then(response => {
          // Update the tweet's likes in the local state
          const tweet = this.tweets.find(tweet => tweet.postid === tweetId);
          tweet.likes = response.data.likes;
        })
        .catch(error => {
          console.error(error);
        });
    },
    retweet(tweetId) {
      axios.post(`http://localhost:30001/posts/${tweetId}/retweet`)
        .then(response => {
          // Update the tweet's retweets in the local state
          const tweet = this.tweets.find(tweet => tweet.postid === tweetId);
          tweet.retweets = response.data.retweets;
        })
        .catch(error => {
          console.error(error);
        });
    },
    getUserAvatar(userId) {
      const userMedia = this.media.find(media => media.userid === userId);
      return userMedia ? userMedia.avatar : 'https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1114445501.jpg';
    },
    getUserInfo(userId) {
      return this.users.find(user => user.userid === userId) || {};
    },
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