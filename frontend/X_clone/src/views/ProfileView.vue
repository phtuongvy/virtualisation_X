<template>
  <div class="home-view">

    <div class="sidebar">
      <RouterLink to="/home">Accueil</RouterLink>
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
      <!-- Contenu du profil ici -->
      <div class="profile-details">
        <h1>Votre pseudo : {{ yuserInfo.YUSERPSEUDO }}</h1>
        <!-- Ajoutez plus de détails ici -->
        <p>Bio de l'utilisateur...</p>
        <!-- Vous pouvez ajouter des listes de tweets, des abonnements, des abonnés, etc. ici. -->
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/users.js';

import axios from 'axios';

export default {
    setup() {
        const yuserId = ref(null);
        const yuserInfo = ref(null);

        const getYuserInfo= (yuserId) => {
            try {
                const response =  axios.get(`http://localhost:30001/users/${yuserId}`);
                return response.data;
            } catch (error) {
                console.error('Erreur lors de la récupération des informations utilisateur', error);
                return {}; // Retourne un objet vide en cas d'erreur
            }
        };

        onMounted(() => {
          yuserId.value = localStorage.getItem('yuserId');
            if (yuserId.value) {
                yuserInfo.value =  getYuserInfo(yuserId.value);
            }
        });

        return {
            yuserInfo ,
            yuserId
        };
    },
    data() {
        return {
          tweets: [],
          users: [],
          medias: [],
          liked: [],
          comments: [],
          currentTweet: null,
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
        axios.get('http://localhost:30001/liked'), // get tweets liked
        
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
        
    }
}


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