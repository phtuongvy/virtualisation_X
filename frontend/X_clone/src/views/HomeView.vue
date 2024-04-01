<template>
  <div class="home-view">
    <h1>Bienvenue à Y</h1>
    <div v-for="tweet in tweets" :key="tweet.POSTID" class="tweet" v-if="users.length && media.length">
      <div class="tweet-header">
        <img :src="getUserAvatar(tweet.YUSERID)" alt="User avatar" class="avatar">
        <div class="user-info">
          <h3>{{ getUserInfo(tweet.YUSERID).YUSERPSEUDO }}</h3>
          <p>{{ getUserInfo(tweet.YUSERID).YUSERNAME }}</p>
        </div>
      </div>
      <p class="tweet-content">{{ tweet.POSTDESCRIPTION }}</p>
      <div class="tweet-footer">
        <button @click="likeTweet(tweet)" class="like-button">
          {{ tweet.likes }} J'aime
        </button>
        <button @click="save(tweet.POSTID)" class="save-button">
          <i class="fas fa-bookmark"></i> Enregistrer
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
    Promise.all([
      axios.get('http://localhost:30001/posts'),
      axios.get('http://localhost:30001/users'),
      axios.get('http://localhost:30001/media')
    ])
    .then(([postsResponse, usersResponse, mediaResponse]) => {
      this.tweets = postsResponse.data;
      this.users = usersResponse.data;
      this.media = mediaResponse.data;
    })
    .catch(error => {
      console.error(error);
    });
  },
  methods: {
    likeTweet(tweet) {
      console.log(tweet); // Log the tweet object

      const userid = tweet.YUSERID;
      console.log(userid); // Log the user ID

      axios.post(`http://localhost:30001/posts/${tweet.POSTID}/like`, { userid })
        .then(response => {
          // Update the tweet's likes in the local state
          tweet.likes += 1; // Increment the tweet's likes
        })
        .catch(error => {
          console.error(error);
        });
    },
    save(tweet) {

      axios.post(`http://localhost:30001/posts?yuserid=${tweet.YUSERID}&postid=${tweet.POSTID}/save`)
        .then(response => {
          // Update the tweet's save status in the local state
          const savedTweet = this.tweets.find(t => t.POSTID === tweet.POSTID);
          if (savedTweet) {
            savedTweet.save = response.data.save;
          }
        })
        .catch(error => {
          console.error(error);
        });
    },
    getUserAvatar(userId) {
      const userMedia = this.media.find(media => media.YUSERID === userId);
      return userMedia ? userMedia.MEDIACONTENT : 'https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1114445501.jpg';
    },
    getUserInfo(userId) {
      return this.users.find(user => user.YUSERID === userId) || {};
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
.save-button {
  background-color: transparent;
  border: none;
  padding: 5px 10px;
  margin-right: 10px;
  cursor: pointer;
  color: #657786;
  font-size: 13px;
}

.like-button:hover,
.save-button:hover {
  color: #1da1f2;
}

</style>