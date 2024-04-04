<template>
  <div class="home-view">
    <nav class="sidebar">
      <RouterLink to="/home">Accueil</RouterLink>
      <RouterLink to="/explore">Explorer</RouterLink>
      <RouterLink to="/notifications">Notifications</RouterLink>
      <RouterLink to="/messages">Messages</RouterLink>
      <RouterLink to="/profile" class="profile-link">
        <img src="https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1114445501.jpg"
          alt="Image de profil" class="profile-image">
        Profil
      </RouterLink>
    </nav>
    <div class="main-content">
      <div class="profile-details">
        <div class="user-profile-card">
          <div class="user-image-section">
            <img src="https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1114445501.jpg"
            alt="Image de profil" class="profile-image">
          </div>
          <div class="user-info-section">
            <h1 class="user-pseudo">{{ userInfo.YUSERPSEUDO }}</h1>
            <p class="user-detail"><strong>Nom :</strong> {{ userInfo.YUSERNAME }}</p>
            <p class="user-detail"><strong>Date de naissance :</strong> {{ userInfo.YUSERBIRTHDAY }}</p>
          </div>
        </div>
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
    const yuserId = ref(localStorage.getItem('yuserId'));
    const userInfo = ref({}); // On utilise un objet réactif pour stocker les infos de l'utilisateur

    // Récupère les informations de l'utilisateur et les stocke dans userInfo
    const fetchUserInfo = async () => {
      if (yuserId.value) {
        try {
          const response = await axios.get(`http://localhost:30001/users/${yuserId.value}`);
          userInfo.value = response.data[0]; // Supposons que l'API renvoie un tableau
        } catch (error) {
          console.error('Erreur lors de la récupération des informations utilisateur', error);
        }
      }
    };

    onMounted(fetchUserInfo);

    return {
      userInfo,
      yuserId
    };
  },   
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


.user-profile-card {
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  margin-bottom: 20px;
  overflow: hidden;
}

.user-image-section {
  padding: 20px;
}

.profile-image {
  border-radius: 50%;
  width: 100px;
  height: 100px;
  object-fit: cover;
}

.user-info-section {
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.user-pseudo {
  margin-top: 0;
  font-size: 24px;
  color: var(--link-color);
}

.user-detail {
  margin: 5px 0;
  font-size: 18px;
  color: #666;
}
</style>
