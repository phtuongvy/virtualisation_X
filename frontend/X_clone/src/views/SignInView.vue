<template>
    <div class="card" v-if="showCard">
        <div class="card-header">
            <h1>Connectez-vous à Y</h1>
            <button class="close-button" @click="closeCard">X</button>
        </div>
        <div class="card-body">
            <label for="username">Nom d'utilisateur :</label>
            <input type="username" id="username" v-model="YUSERNAME" required>
            <label for="password">Mot de passe :</label>
            <input type="password" id="password" v-model="YUSERPASSWORD" required>
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
            YUSERNAME: '',
            YUSERPASSWORD: '',
            errorMessage: '',
            showCard: true
        };
    },
    methods: {
        async signIn() {
            const auth = { YUSERNAME: this.YUSERNAME, YUSERPASSWORD: this.YUSERPASSWORD };
            const url = 'http://localhost:30001/login';
            try {
                const response = await axios.post(url, auth)
                    .then(response => console.log(response.data))
                if (response.data.error) {
                    this.errorMessage = response.data.error;
                } else {
                    this.$router.push('/home');
                    this.$emit('signed-in', response.data);
                    this.showCard = false;
                }
            } catch (error) {
                console.error(error);
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