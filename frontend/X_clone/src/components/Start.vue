<template>
    <div class="cardSignIn" v-if="showCard">
        <div class="card-header">
            <h1>Connectez-vous à Y</h1>
            <button class="close-button" @click="closeCard">X</button>
        </div>
        <div class="card-body">
            <label for="email">Email :</label>
            <input type="email" id="email" v-model="email" required>
            <label for="password">Mot de passe :</label>
            <input type="password" id="password" v-model="password" required>
            <button type="submit" @click="signIn">Suivant</button>
            <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        </div>
    </div>
    <div class="cardSignUp" v-if="showCard">
        <div class="card-header">
            <h1>Créer votre compte</h1>
            <button class="close-button" @click="closeCard">X</button>
        </div>
        <div class="card-body">
            <label for="name">Nom et prénom :</label>
            <input type="name" id="name" v-model="name" required>
            <label for="email">Email:</label>
            <input type="email" id="email" v-model="email" required>
            <label for="password">Mot de passe :</label>
            <input type="password" id="password" v-model="password" required>
            <button type="submit" @click="signUp">Suivant</button>
            <p class="error-message">{{ errorMessage }}</p>
        </div>
    </div>
</template>

<script>
import { RouterLink } from 'vue-router';

export default {
    data() {
        return {
            name: '',
            email: '',
            password: '',
            errorMessage: '',
            showCard: true
        };
    },
    methods: {
        signIn() {
            if (this.email === 'idk@example.com' && this.password === 'correctPwd') {
                // Successful sign-in logic
                RouterLink.push('/home');
            } else {
                // Failed sign-in logic
                this.errorMessage = 'Email ou mot de passe incorrect. Veuillez réessayer.';
            }
        },
        signUp() {

            // Example: Send a POST request to the server with the form data
            axios.post('/api/signup', {
                name: this.name,
                email: this.email,
                password: this.password
            })
                .then(response => {
                    // Handle successful sign-up
                    console.log(response.data);
                    RouterLink.push('/home');

                })
                .catch(error => {
                    // Handle sign-up error
                    console.error(error);
                    this.errorMessage = 'Erreur lors de la création du compte. Veuillez réessayer.';
                });
        },
        closeCard() {
            this.showCard = false;
        },
        openCard() {
            this.showCard = true;
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

input[type="email"],
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