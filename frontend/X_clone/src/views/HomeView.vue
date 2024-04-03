<template>
  <div class="home-view">
    <div class="sidebar">
      <!-- Add your navigation links here -->
      <RouterLink to="/home">Acceuil</RouterLink>
      <RouterLink to="/explore">Explorer</RouterLink>
      <RouterLink to="/notifications">Notifications</RouterLink>
      <RouterLink to="/messages">Messages</RouterLink>
      <RouterLink to="/profile" class="profile-link">
        <img src="https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1114445501.jpg"
          alt="Profile" class="profile-image">
        Profil
      </RouterLink>
    </div>

    <div class="main-content">
      <form @submit.prevent="postTweet" class="tweet-form">
        <textarea v-model="newTweet" placeholder="Quoi de neuf ?"></textarea>
        <button type="submit">Tweet</button>
      </form>

      <!-- users tweets part -->

      <div v-for="tweet in tweets" :key="tweet.POSTID" class="tweet" v-if="users.length && medias.length">

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
            <textarea v-model="newComments" placeholder="Poster votre commentaire"></textarea>
            <button type="submit">Commenter</button>
          </div>

          <div v-for="comment in getComments(tweet)" :key="comment.COMMENTID" class="comment">
            <img :src="comment.userAvatar" alt="User avatar" class="avatar">
            <p>{{ comment.userInfo.YUSERPSEUDO }}</p>
            <p>@{{ comment.userInfo.YUSERNAME }}</p>
            <p class="comment-text">{{ comment.COMMENTTEXT }}</p>
          </div>


        </div>


      </div>
    </div>

    <div class="right-sidebar">
      <!-- Add your trending topics and suggestions here -->
      <h3>Tendances</h3>
      <ul>
        <li>#VueJS</li>
        <li>#JavaScript</li>
        <li>#WebDevelopment</li>
        <!-- Add more trending topics -->
      </ul>
      <h3>À qui vous follow ?</h3>
      <ul>
        <li>User 1</li>
        <li>User 2</li>
        <li>User 3</li>
        <!-- Add more users to follow -->
      </ul>
    </div>
  </div>
</template>

<script>
import { RouterLink } from 'vue-router';
import { useUserStore } from '@/stores/users';


import axios from 'axios';


export default {
  data() {
    return {
      tweets: [],
      users: [],
      medias: [],
      liked: [],
      comments: [],
      newTweet: '',
      newComment: ''
    };
  },
  created() {
    Promise.all([
      axios.get('http://localhost:30001/posts'), // get posts
      axios.get('http://localhost:30001/users'), // get users
      axios.get('http://localhost:30001/comment'), // get comments
      axios.get('http://localhost:30001/media'), // get media
      axios.get('http://localhost:30001/liked') // get tweets liked
    ])
      .then(([postsResponse, usersResponse, commentsResponse, mediaResponse, likedResponse]) => {
        this.tweets = postsResponse.data;
        this.users = usersResponse.data;
        this.comments = commentsResponse.data;
        this.medias = mediaResponse.data;
        this.liked = likedResponse.data;
      })
      .catch(error => {
        console.error(error);
      });
  },
  methods: {

    // Like tweet
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

    // Save tweet
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

    // post tweet
    postTweet() {
      const url = 'http://localhost:30001/posts/';
      const userStore = useUserStore();
      const userId = userStore.user.YUSERID;
      let newTweet = {
        YUSERID: userId000,
        POSTDATE: Date.now(),
        POSTDESCRIPTION: this.newTweet
      }

      axios.post(url, newTweet)
        .then(response => {
          this.tweets.splice(0, 0, newTweet)
          this.newTweet = '';
        })
        .catch(error => {
          console.error(error);
        });
    },

    // post comment
    postComment() {
      const userStore = useUserStore();
      const userId = userStore.user.YUSERID;
      const postId = userStore.user.POSTID;
      console.log(userId, postId);

      let newComment = {
        YUSERID: userId,
        POSTID: postId,
        COMMENTDATE: Date.now(),
        COMMENTTEXT: this.newComment
      }

      axios.post('http://localhost:30001/posts/${userId}/comment', newComment)
        .then(response => {
          this.comments.splice(0, 0, newComment)
          this.newComment = '';
        })
        .catch(error => {
          console.error(error);
        });
    },

    getUserAvatar(userId) {
      // console.log(userId);
      const userMedia = this.medias.find(media => media.YUSERID === userId);
      return userMedia ? userMedia.MEDIACONTENT : 'https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1114445501.jpg';
    },
    getUserInfo(userId) {
      return this.users.find(user => user.YUSERID === userId) || {};
    },
    getLikes(tweet) {
      return this.liked.filter(like => like.POSTID === tweet.POSTID).length;
    },
    getComments(tweet) {
      return this.comments
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
  padding: 10px 0;
  border-top: 1px solid #e6ecf0;
}

.comment {
  display: flex;
  align-items: start;
  padding: 10px 0;
  border-bottom: 1px solid #e6ecf0;
}

.comment .avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  margin-right: 10px;
}

.comment p:first-of-type {
  font-size: 15px;
  color: #14171a;
  margin-right: 10px;
  font-weight: bold; 
  margin-bottom: 5px; 
}

.comment p:nth-of-type(2) {
  font-size: 14px;
  color: #657786;
}

.comment p:last-of-type {
  font-size: 14px;
  color: #657786;
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