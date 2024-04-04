<template>
  <div class="bookmark-view">
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

    <div class="content-area">
      <h1>Vos marques pages</h1>
      <h2>@{{ currentUser.YUSERNAME }}</h2>
      <div v-if="bookmarks.length === 0">
        <h2>Enregistrer les publications pour les voir plus tard</h2>
        <p>Marquez les pages des publications pour les retrouver facilement plus tard.</p>
      </div>
      <div v-else v-for="tweet in bookmarks" :key="tweet.POSTID" class="tweet">
        <div class="tweet-user">{{ getUserInfo(tweet.YUSERID).YUSERNAME }}</div>
        <div class="tweet-description">{{ tweet.POSTDESCRIPTION }}</div>
      </div>
    </div>
  </div>
</template>

<script>

import { ref, onMounted, computed } from 'vue';
import { RouterLink } from 'vue-router';
import axios from 'axios';

export default {
  setup() {
    const yuserId = ref(null);
    const tweets = ref([]);
    const users = ref([]);
    const comments = ref([]);
    const medias = ref([]);
    const liked = ref([]);
    const bookmarks = ref([]);

    let currentUser = ref({});


    onMounted(async () => {
      yuserId.value = localStorage.getItem('yuserId');
      console.log('yuserId', yuserId.value);

      const userId = yuserId.value;
      try {
        const responses = await Promise.all([
          axios.get('http://localhost:30001/posts'), // get posts
          axios.get('http://localhost:30001/users'), // get users
          axios.get('http://localhost:30001/comment'), // get comments
          axios.get('http://localhost:30001/media'), // get media
          axios.get('http://localhost:30001/liked'), // get tweets liked
          axios.get(`http://localhost:30001/posts/${userId}/saved`) // get tweets saved for current user
        ]);
        
        tweets.value = responses[0].data;
        users.value = responses[1].data;
        comments.value = responses[2].data;
        medias.value = responses[3].data;
        liked.value = responses[4].data;
        bookmarks.value = responses[5].data;

        currentUser.value = users.value.find(user => user.YUSERID == userId) || {};
        console.log('currentUser', currentUser.value);

      } catch (error) {
        console.error(error);
      }
    });

    const getUserInfo = (userId) => {
      return users.value.find(user => user.YUSERID == userId) || {};
    };

    return {
      yuserId,
      tweets,
      users,
      comments,
      medias,
      liked,
      bookmarks,
      currentUser,
      getUserInfo

    };
  },
};
</script>

<style scoped>
* {
  font-family: 'ChirpRegular', sans-serif;
}

.bookmark-view {
  display: flex;
  justify-content: space-between;
  padding: 20px;
  background-color: #f5f8fa;
}

.content-area {
  width: 75%;
  padding: 20px;
}

.content-area h1 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #14171a;
}

.content-area h2 {
  font-size: 20px;
  font-weight: bold;
  color: #657786;
}

/* sidebar styles */
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

.tweet {
  border-bottom: 1px solid #e1e8ed;
  padding: 10px 0;
  background-color: white;
  margin-bottom: 10px;
  border-radius: 15px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.tweet-user {
  font-weight: bold;
  color: #14171a;
}

.tweet-description {
  color: #657786;
}
</style>