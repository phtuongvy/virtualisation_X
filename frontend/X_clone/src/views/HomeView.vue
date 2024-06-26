<template>
  <div class="home-view">
    <div class="sidebar">
      <!-- navigations -->
      <RouterLink to="/home">Accueil</RouterLink>
      <RouterLink to="/explore">Explorer</RouterLink>
      <RouterLink to="/notifications">Notifications</RouterLink>
      <RouterLink to="/bookmarks">Bookmarks</RouterLink>
      <RouterLink to="/profile" class="profile-link">
        <img src="https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1114445501.jpg"
          alt="Profile" class="profile-image">
        Profil
      </RouterLink>
    </div>

    <!-- main content -->
    <div class="main-content">

      <!-- post tweets part -->
      <form @submit.prevent="postTweet" class="tweet-form">
        <textarea v-model="state.newTweet" placeholder="Quoi de neuf ?"></textarea>
        <button type="submit">Tweet</button>
      </form>

      <!-- users tweets part -->

      <div v-for="tweet in state.tweets" :key="tweet.POSTID" class="tweet" v-if="state.users.length && state.medias.length">

        <!-- tweets' info -->
        <div class="tweet-header">

          <img :src="getUserAvatar(tweet.YUSERID)" alt="User avatar" class="avatar">
          <div class="user-info">
            <h3>{{ getUserInfo(tweet.YUSERID).YUSERPSEUDO }}</h3>
            <p>@{{ getUserInfo(tweet.YUSERID).YUSERNAME }}</p>
            <p class="tweet-date">{{ formatDate(tweet.POSTDATE) }}</p>
          </div>
        </div>

        <p class="tweet-content">{{ tweet.POSTDESCRIPTION }}</p>

        <div class="tweet-footer">

          <button @click="likeTweet(tweet)" class="like-button">
            {{ getLikes(tweet) }} <img width="50" height="50" src="https://img.icons8.com/ios-glyphs/30/like--v1.png"
              alt="like--v1" />
          </button>

          <button @click="save(tweet)" class="save-button">
            <img width="50" height="50" src="https://img.icons8.com/ios-filled/50/bookmark-ribbon.png"
              alt="bookmark-ribbon" /> Enregistrer
          </button>

        </div>

        <!-- Comments part -->
        <div class="comments">

          <div id="form-comment">
            <textarea v-model="state.newComment" placeholder="Poster votre commentaire"></textarea>
            <button type="submit" @click="postComment(tweet)">Commenter</button>
          </div>

          <div v-for="comment in getComments(tweet)" :key="comment.COMMENTID" class="comment">
            <div>
              <img :src="comment.userAvatar" alt="User avatar" class="avatar">
              <p>{{ comment.userInfo.YUSERPSEUDO }}</p>
              <p>@{{ comment.userInfo.YUSERNAME }}</p>
              <p class="comment-text">{{ formatDate(comment.COMMENTDATE) }}</p>
            </div>
            <p class="comment-text">{{ comment.COMMENTTEXT }}</p>
          </div>

        </div>


      </div>
    </div>

    <!-- Trendings & who to follow -->

    <div class="right-sidebar">

      <!-- search bar -->
      <div class="search-container">
        <input type="text" v-model="state.searchQuery" placeholder="Rechercher" class="search-input" />

        <div v-if="state.searchQuery" class="search-results">
          <div class="search-section">
            <div v-for="tweet in filteredTweets" :key="tweet.POSTID" class="search-result">
              <div class="tweet-user">{{ getUserInfo(tweet.YUSERID).YUSERNAME }}</div>
              <div class="tweet-description">{{ tweet.POSTDESCRIPTION }}</div>
            </div>
          </div>

          <div class="search-section">
            <div v-for="user in filteredUsers" :key="user.YUSERID" class="search-result">
              <div class="user-name">@{{ user.YUSERNAME }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Trendings -->
      <h3>Tendances</h3>
      <ul>
        <li>#VueJS</li>
        <li>#JavaScript</li>
        <li>#WebDevelopment</li>
      </ul>

      <!-- Who to follow -->
      <h3>À qui vous follow ?</h3>
      <ul>
        <li>User 1</li>
        <li>User 2</li>
        <li>User 3</li>

      </ul>
    </div>
  </div>
</template>

<script>

// Importing dependencies
import { ref, onMounted, reactive } from 'vue';
import { RouterLink } from 'vue-router';



import axios from 'axios';


export default {

  // Initialize setup
  setup() {
    const yuserId = ref(null);
    const state = reactive({
      tweets: [],
      users: [],
      medias: [],
      liked: [],
      comments: [],
      currentTweet: null,
      newTweet: '',
      newComment: '',
      searchQuery: ''
    });

    // Fetch data from server side
    onMounted(() => {
      yuserId.value = localStorage.getItem('yuserId');
      Promise.all([
        axios.get('http://localhost:30001/posts'), // get posts
        axios.get('http://localhost:30001/users'), // get users
        axios.get('http://localhost:30001/comment'), // get comments
        axios.get('http://localhost:30001/media'), // get media
        axios.get('http://localhost:30001/liked') // get tweets liked
      ])
        .then(([postsResponse, usersResponse, commentsResponse, mediaResponse, likedResponse]) => {
          state.tweets = postsResponse.data;
          state.users = usersResponse.data;
          state.comments = commentsResponse.data;
          state.medias = mediaResponse.data;
          state.liked = likedResponse.data;
        })
        .catch(error => {
          console.error(error);
        });
    });

    // Save tweet for current user
    const save = (tweet) => {
      console.log(yuserId.value, tweet.POSTID);
      axios.post(`http://localhost:30001/posts/${yuserId.value}/save`, { YUSERID: yuserId.value, POSTID: tweet.POSTID })
        .then(response => {
          // Update the tweet's save status in the local state
          const savedTweet = state.tweets.find(t => t.POSTID === tweet.POSTID);
          if (savedTweet) {
            savedTweet.save = response.data.save;
          }
          location.reload();
        })
        .catch(error => {
          console.error(error);
        });
    };

    return {
      state,
      yuserId,
      save
    };
  },

  // Computed properties (things that will changes instantly)
  computed: {
    filteredTweets() {
      if (!this.state.searchQuery) {
        return [];
      }

      return this.state.tweets.filter(tweet =>
        tweet.POSTDESCRIPTION.toLowerCase().includes(this.state.searchQuery.toLowerCase())
      );
    },
    filteredUsers() {
      if (!this.state.searchQuery) {
        return [];
      }

      return this.state.users.filter(user =>
        user.YUSERNAME.toLowerCase().includes(this.state.searchQuery.toLowerCase())
      );
    },
  },
  // Methods
  methods: {

    // Like tweet
    likeTweet(tweet) {
      console.log(tweet);
      const userid = tweet.YUSERID;

      axios.post(`http://localhost:30001/posts/${tweet.POSTID}/like`, { POSTID: tweet.POSTID, YUSERID: userid })
        .then(response => {
          // Find the corresponding 'like' record and increment the 'likes' count
          const likeRecord = this.state.liked.find(like => like.POSTID === tweet.POSTID && like.YUSERID === userid);
          if (likeRecord) {
            likeRecord.likes += 1;
          }
          location.reload();
        })
        .catch(error => {
          console.error(error);
        });
    },

    // post tweet
    postTweet() {

      const url = 'http://localhost:30001/posts/';
      let newTweet = {
        YUSERID: this.yuserId,
        POSTDATE: Date.now(),
        POSTDESCRIPTION: this.state.newTweet
      }

      axios.post(url, newTweet)
        .then(response => {
          this.state.tweets.splice(0, 0, newTweet)
          this.newTweet = '';
          location.reload();
        })
        .catch(error => {
          console.error(error);
        });

    },

    selectPost(tweet) {
      this.currentTweet = tweet;
    },

    // post comment
    postComment(tweet) {
      if (!tweet) {
        console.error('Aucun tweet a été sélectionné pour commenter.');
        return;
      }

      const tweetId = tweet.POSTID;
      console.log(this.yuserId, tweetId);

      let newComment = {
        YUSERID: this.yuserId,
        POSTID: tweetId,
        COMMENTDATE: new Date().toISOString().slice(0, 19).replace('T', ' '),
        COMMENTTEXT: this.state.newComment
      }

      axios.post(`http://localhost:30001/posts/${this.yuserId}/comment`, newComment)
        .then(response => {
          this.state.comments.splice(0, 0, newComment)
          this.newComment = '';
          location.reload();
        })
        .catch(error => {
          console.error(error);
        });

    },
    // Get user avatar
    getUserAvatar(userId) {
      // console.log(userId);
      const userMedia = this.state.medias.find(media => media.YUSERID === userId);
      return userMedia ? userMedia.MEDIACONTENT : 'https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1114445501.jpg';
    },
    // Get current user avatar
    getCurrentUserAvatar() {
      return this.getUserAvatar(this.yuserId);
    },
    // Get user info
    getUserInfo(userId) {
      return this.state.users.find(user => user.YUSERID === userId) || {};
    },
    // Get likes for a tweet
    getLikes(tweet) {
      return this.state.liked.filter(like => like.POSTID === tweet.POSTID).length;
    },
    // Get comments for a tweet
    getComments(tweet) {
      return this.state.comments
        .filter(comment => comment.POSTID === tweet.POSTID)
        .map(comment => {
          const userInfo = this.getUserInfo(comment.YUSERID);
          const userAvatar = this.getUserAvatar(comment.YUSERID);
          return {
            ...comment,
            userInfo,
            userAvatar: userAvatar ? userAvatar : 'https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1114445501.jpg'
          };
        });
    },
    formatDate(timestamp) {
      const date = new Date(timestamp);
      return date.toLocaleString();
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
  box-sizing: border-box;
}

/* menu and forms style */

.home-view {
  display: flex;
  justify-content: space-between;
  padding: 20px;
  background-color: #f5f8fa;
}

.sidebar {
  width: 20%;
  border-right: 1px solid #e6ecf0;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.sidebar a {
  color: #1DA1F2;
  text-decoration: none;
  font-size: 20px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  padding: 10px 15px;
  border-radius: 25px;
  transition: background-color 0.2s ease;
}

.sidebar a:hover {
  background-color: #e8f5fe;
}

.sidebar .profile-link {
  display: flex;
  align-items: center;
  background-color: #1DA1F2;
  color: white;
  padding: 10px 15px;
  border-radius: 25px;
}

.sidebar .profile-image {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
}

.main-content {
  width: 50%;
  padding: 0 20px;
}

/* search style */

.search-container {
  position: relative;
  margin: 20px 0;
}

.search-input {
  width: 100%;
  padding: 10px 30px;
  border: 1px solid #657786;
  border-radius: 50px;
  background-color: #f5f8fa;
  color: #657786;
  font-size: 15px;
  outline: none;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 5px;
  transition: border-color 0.2s ease;
}

.search-input:focus {
  border-color: #1DA1F2;
}

.search-input::placeholder {
  color: #657786;
}

.search-results {
  position: absolute;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  background-color: white;
  border: 1px solid #657786;
  border-radius: 5px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.search-result {
  padding: 10px;
  border-bottom: 1px solid #f5f8fa;
}

.search-result:last-child {
  border-bottom: none;
}

.tweet-user {
  font-weight: bold;
  margin-bottom: 5px;
}

.tweet-description {
  color: #657786;
}

/* tweets style */

.tweet-form {
  margin-bottom: 20px;
  background-color: white;
  padding: 10px;
  border-radius: 15px;
}

.tweet-form textarea {
  width: 100%;
  height: 100px;
  margin-bottom: 10px;
  border: none;
  border-radius: 15px;
  padding: 10px;
  resize: none;
  overflow: auto;
}

.tweet-form button {
  background-color: #1DA1F2;
  color: white;
  border: none;
  border-radius: 25px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.tweet-form button:hover {
  background-color: #0c85d0;
}

/* users tweets style */

.user-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.user-info h3 {
  font-size: 15px;
  font-weight: bold;
  color: #14171a;
  margin-bottom: 2px;
}

.user-info p {
  font-size: 14px;
  color: #657786;
}

.tweet {
  background-color: white;
  border-radius: 15px;
  padding: 10px;
  margin-bottom: 10px;
}

.tweet-header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.tweet-header .avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
}

.tweet-date {
  color: #657786;
  font-size: 14px;
  margin-top: 10px;
}

.tweet-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}

.right-sidebar {
  width: 20%;
  border-left: 1px solid #e6ecf0;
  padding-left: 20px;
}

.tweet-content {
  word-wrap: break-word;
  overflow-wrap: break-word;
}

/* Comments style */

.comments {
  padding: 10px;
  border-top: 1px solid #e6ecf0;
}

#form-comment {
  margin-bottom: 20px;
}

#form-comment textarea {
  width: 100%;
  height: 60px;
  border-radius: 4px;
  padding: 10px;
  border: 1px solid #ccd6dd;
  resize: none;
}

#form-comment button {
  background-color: #1da1f2;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 6px 16px;
  font-weight: bold;
  cursor: pointer;
  float: right;
  margin-top: 10px;
}

.comment {
  display: flex;
  flex-direction: column;
  align-items: start;
  padding: 10px 0;
  border-bottom: 1px solid #e6ecf0;
}

.comment .avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  margin-bottom: 10px;
  margin-right: 10px;
}

.comment div {
  display: flex;
  margin-bottom: 5px;
}

.comment p:first-of-type {
  font-size: 15px;
  color: #14171a;
  margin-right: 10px;
  font-weight: bold;
}

.comment p:nth-of-type(2) {
  font-size: 14px;
  color: #657786;
  margin-right: 20px;
}

.comment-text {
  font-size: 14px;
  color: #657786;
  font-weight: normal !important;
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-word;
}

/* like, save buton style */

.like-button,
.save-button {
  background-color: transparent;
  border: none;
  color: #657786;
  cursor: pointer;
  transition: color 0.2s ease;
}

.like-button:hover,
.save-button:hover {
  color: #1DA1F2;
}

.like-button img,
.save-button img {
  width: 20px;
  height: 20px;
  margin-right: 5px;
}
</style>