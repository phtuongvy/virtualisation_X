<template>
    <div class="cardSignUp" v-if="showCard">
        <div class="card-header">
            <h1>Créer votre compte</h1>
            <button class="close-button" @click="closeCard">X</button>
        </div>
        <div class="card-body">
            <label for="name">Nom et prénom :</label>
            <input type="name" id="name" v-model="name" required>
            <label for="username">Nom d'utilisateur :</label>
            <input type="username" id="username" v-model="username" required>
            <label for="password">Mot de passe :</label>
            <input type="password" id="password" v-model="password" required>
            <button type="submit" @click="signUp">Suivant</button>
            <p class="error-message">{{ errorMessage }}</p>
        </div>
    </div>
</template>

<script>

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
                this.$router.push('/home');
            } catch (error) {
                // Handle sign-up error
                console.error(error);
                this.errorMessage = 'Erreur lors de la création du compte. Veuillez réessayer.';
            }
        },
        closeCard() {
            this.showCard = false;

        }
    }
};
</script>

<style scoped>
.cardSignUp {
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 16px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    max-width: 400px;
    margin: 0 auto;
    background-color: black;
    color: white;
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
}

.close-button {
    background-color: transparent;
    color: white;
    border: none;
    cursor: pointer;
}

.card-body {
    display: flex;
    flex-direction: column;
}

input[type="username"],
input[type="password"] {
    margin-bottom: 8px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

button[type="submit"] {
    padding: 8px 16px;
    background-color: white;
    color: black;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

button[type="submit"]:hover {
    background-color: rgb(79, 78, 78);
}

.close-button:hover {
    background-color: rgb(79, 78, 78);
    border-radius: 50%;
    padding: 15px;
}
</style>