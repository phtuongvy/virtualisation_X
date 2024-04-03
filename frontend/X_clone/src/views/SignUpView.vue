<script>
import { useUserStore } from '@/stores/users'; 

import axios from 'axios';

export default {
    data() {
        return {
            userPseudo: '',
            username: '',
            userBirthday: '',
            password: '',
            userRole: '',
            userPremium: '',
            errorMessage: '',
            showCard: true
        };
    },
    methods: {
        async signUp() {
            try {
                const response = await axios.post('http://localhost:30001/register', {
                    YUSERPSEUDO: this.userPseudo, // assuming you have a data property for userPseudo
                    YUSERNAME: this.username,
                    YUSERBIRTHDAY: this.userBirthday, // assuming you have a data property for userBirthday
                    YUSERPASSWORD: this.password,
                    YUSERROLE: this.userRole, // assuming you have a data property for userRole
                    YUSERPREMIUM: this.userPremium // assuming you have a data property for userPremium
                });

                // Handle successful sign-up
                console.log(response.data);
                this.$router.push('/login');
            } catch (error) {
                // Handle sign-up error
                console.error(error);
                this.errorMessage = 'Erreur lors de la création du compte. Veuillez réessayer.';
            }
        },
    }
};
</script>


<template>
      <div class="startPage" v-if="showCard">
        <div class="leftColumn">
            <img src="@/assets/ylogo.png" alt="Y logo">
            <h1>Ça se passe maintenant!</h1>
        </div>

        <div class="rightColumn">
            <div class="form-group">
                <label for="name">Nom et prénom :</label>
                <input type="text" id="name" v-model="userPseudo" required>
            </div>
            <div class="form-group">
                <label for="username">Nom d'utilisateur :</label>
                <input type="text" id="username" v-model="username" required>
            </div>
            <div class="form-group">
                <label for="username">Date d'anniversaire :</label>
                <input type="date" id="birthaday" v-model="userBirthday" required>
            </div>
            <div class="form-group">
                <label for="password">Mot de passe :</label>
                <input type="password" id="password" v-model="password" required>
            </div>
            <button type="submit" @click="signUp">Suivant</button>
            <p class="error-message" v-if="errorMessage">{{ errorMessage }}</p>
        </div>
    </div>
</template>



<style scoped>
  @font-face {
    font-family: 'ChirpExtendedHeavy';
    src: url('@/assets/fonts/ChirpExtendedHeavy.ttf') format('truetype');
}

* {
    font-family: 'ChirpExtendedHeavy', sans-serif;
    color: black; /* Mettre la couleur de texte en noir */
}

.startPage {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 50px;
    height: auto; /* Ajustement pour assurer la hauteur auto */
}

.leftColumn, .rightColumn {
    flex: 1;
}

.rightColumn {
    display: flex;
    flex-direction: column;
}

.form-group {
    margin-bottom: 20px;
}

input[type="text"], input[type="password"] {
    width: 100%;
    padding: 15px;
    margin: 10px 0;
    border-radius: 5px; /* Bordures plus subtiles */
    border: 1px solid #ddd; /* Bordure légère */
    box-sizing: border-box; /* Pour inclure padding dans la largeur */
}

button {
    padding: 15px;
    margin: 10px 0;
    font-size: 16px;
    border-radius: 25px;
    cursor: pointer;
    transition: background-color 0.3s ease; /* Transition plus douce */
    background-color: #1DA1F2;
    color: white;
    border: none;
}

button:hover {
    background-color: #117dbb; /* Un bleu plus foncé au survol */
}

.error-message {
    color: #D8000C;
    background-color: #FFD2D2;
    padding: 10px;
    border-radius: 5px;
}

img {
    width: 265px;
    height: 239px;
    margin-bottom: 20px;
}
</style>