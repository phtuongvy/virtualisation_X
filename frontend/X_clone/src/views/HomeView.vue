<template>
  <div class="home-view">
    <h1>Bienvenue à Y</h1>
    <nav class="menu">

      <RouterLink to="/home">Acceuil</RouterLink>
      <RouterLink to="/explore">Explorer</RouterLink>
      <RouterLink to="/notifications">Notifications</RouterLink>
      <RouterLink to="/messages">Messages</RouterLink>
      <RouterLink to="/profile" class="profile-link">
        <img src="https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1114445501.jpg"
          alt="Profile" class="profile-image">
        Profil
      </RouterLink>


    </nav>

    <form @submit.prevent="postTweet" class="tweet-form">
      <textarea v-model="newTweet" placeholder="Quoi de neuf ?"></textarea>
      <button type="submit">Tweet</button>
    </form>

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
          {{ getLikes(tweet) }} J'aime
        </button>
        <button @click="save(tweet)" class="save-button">
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
      media: [],
      liked: [],
      newTweet: ''
    };
  },
  created() {
    Promise.all([
      axios.get('http://localhost:30001/posts'),
      axios.get('http://localhost:30001/users'),
      axios.get('http://localhost:30001/media'),
      axios.get('http://localhost:30001/liked')
    ])
      .then(([postsResponse, usersResponse, mediaResponse, likedResponse]) => {
        this.tweets = postsResponse.data;
        this.users = usersResponse.data;
        this.media = mediaResponse.data;
        this.liked = likedResponse.data;
      })
      .catch(error => {
        console.error(error);
      });
  },
  methods: {
    likeTweet(tweet) {
      console.log(tweet);
      const userid = tweet.YUSERID;

      axios.post(`http://localhost:30001/posts/${tweet.POSTID}/like`, { POSTID: tweet.POSTID, YUSERID: userid })
        .then(response => {
          // Find the corresponding 'like' record and increment the 'likes' count
          const likeRecord = this.liked.find(like => like.POSTID === tweet.POSTID && like.YUSERID === userid);
          if (likeRecord) {
            likeRecord.likes += 1;
          }
        })
        .catch(error => {
          console.error(error);
        });
    },
    save(tweet) {
      axios.post(`http://localhost:30001/posts/${tweet.YUSERID}/save`, { YUSERID: tweet.YUSERID, POSTID: tweet.POSTID })
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
    postTweet() {
      const url = 'http://localhost:30001/posts/';
      let newTweet = {
        YUSERID: 2,
        POSTDATE: Date.now(),
        POSTDESCRIPTION: this.newTweet
      }

      axios.post(url, newTweet)
        .then(response => {
          this.tweets.splice(0, 0, newTweet)
          this.newTweet = ''; // Clear the textarea
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
    getLikes(tweet) {
      return this.liked.filter(like => like.POSTID === tweet.POSTID).length;
    }
  }
};
</script>

<style scoped>
@font-face {
  font-family: 'ChirpRegular';
  src: url('@/assets/fonts/ChirpRegular.ttf') format('truetype');
}

* {
  font-family: 'ChirpRegular', sans-serif;
}

/* menu and forms style */

.home-view {
  width: 600px;
  margin: 0 auto;
  background-color: #F5F8FA;
  font-family: 'Helvetica Neue', sans-serif;
}

.menu {
  display: flex;
  justify-content: space-around;
  padding: 10px 0;
  background-color: #FFFFFF;
  border-bottom: 1px solid #E1E8ED;
}

.menu a:active {
  color: #1DA1F2;
}

.menu a {
  color: #657786;
  text-decoration: none;
  font-weight: bold;
  font-size: 18px;
}

.tweet-form {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #E1E8ED;
  background-color: #FFFFFF;
}

.tweet-form textarea {
  width: 85%;
  height: 50px;
  border: none;
  font-size: 18px;
  padding: 10px;
  border-radius: 4px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
}

.tweet-form button {
  width: 10%;
  height: 50px;
  background-color: #1DA1F2;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
}

.tweet {
  padding: 10px;
  border-bottom: 1px solid #E1E8ED;
  background-color: #FFFFFF;
}

.tweet-header {
  display: flex;
  align-items: center;
}

.tweet-header .avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  margin-right: 10px;
}

.tweet-header .user-info h3,
.tweet-header .user-info p {
  margin: 0;
}

.tweet-content {
  margin: 10px 0;
  font-size: 15px;
}

.tweet-footer {
  display: flex;
  justify-content: space-between;
  color: #657786;
}

.tweet-footer button {
  background: none;
  border: none;
  cursor: pointer;
}

.profile-link {
  display: flex;
  align-items: center;
  color: #657786;
  text-decoration: none;
}

.profile-image {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  margin-right: 5px;
}
</style>