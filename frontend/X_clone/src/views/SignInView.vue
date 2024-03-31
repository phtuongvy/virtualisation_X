<template>
    <div class="card" v-if="showCard">
        <div class="card-header">
            <h1>Connectez-vous à Y</h1>
            <button class="close-button" @click="closeCard">X</button>
        </div>
        <div class="card-body">
            <label for="username">Nom d'utilisateur :</label>
            <input type="username" id="username" v-model="username" required>
            <label for="password">Mot de passe :</label>
            <input type="password" id="password" v-model="password" required>
            <button type="submit" @click="signIn">Suivant</button>
            <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>


        </div>
    </div>
</template>

<script>
import { RouterLink } from 'vue-router';

import axios from 'axios';

export default {
    data() {
        return {
            username: '',
            password: '',
            errorMessage: '',
            showCard: true
        };
    },
    methods: {
        async signIn() {
            try {
                const response = await axios.post('http://localhost:30001/login', {
                    username: this.username,
                    password: this.password
                });

                if (response.status === 200) {
                    // Successful login logic
                    this.$router.push('/home');
                } else {
                    // Failed login logic
                    this.errorMessage = 'Nom d\'utilisateur ou mot de passe incorrect. Veuillez réessayer.';
                }
            } catch (error) {
                // Error handling logic
                console.error(error);
                this.errorMessage = 'Une erreur est survenue. Veuillez réessayer.';
            }
        },
        closeCard() {
            this.showCard = false;
        }

    }
};
</script>

<style scoped>
.card {
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