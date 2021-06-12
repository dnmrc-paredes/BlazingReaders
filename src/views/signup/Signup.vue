<template>
    <main>
        <form @submit.prevent="signupSubmit" method="post">
            <h1> Sign up for account </h1>

            <transition-group name="showerror" >
                <div v-for="err in errors" :key="err" class="errorhandler">
                    <p class="errmsg" v-if="errors.length > 0" > {{ err}} </p>
                </div>
            </transition-group>

            <label for="firstname"> First Name </label>
                <input type="text" name="firstname" v-model="firstName">
            <label for="lastname"> Last Name </label>
                <input type="text" name="lastname" v-model="lastName">
            <label for="email"> Email Address </label>
                <input type="email" name="email" v-model="email">
            <label for="password"> Password </label>
                <input type="password" name="password" v-model="password">

            <button :disabled="isEmpty" type="submit"> Sign Up </button>
            <p> Already have an account? <router-link to="/login" > Log In. </router-link>  </p>
        </form>
    </main>
</template>

<script lang="ts">
import axios from 'axios'

import {defineComponent} from 'vue'

export default defineComponent({
    data() {
        return {
            firstName: "" as string,
            lastName: "" as string,
            email: "" as string,
            password: "" as string,
            errors: [] as string[]
        }
    },
    methods: {
        async signupSubmit() {

            this.errors = []

            const {firstName, lastName, email, password} = this

            const {data} = await axios.post('http://localhost:8000/register', {
                firstName,
                lastName,
                email,
                password
            })

            if (data.data) {
                this.$store.dispatch('setUser', data)
                this.$store.dispatch('setAuth')
                return this.$router.push({name: 'Admin', path: '/admin'})
            }

            if (data.msg) {
                this.errors.push(data.msg)
                setTimeout(() => {
                    this.errors = []
                }, 5000)
            }
        }
    },
    computed: {
        isEmpty() {

            const {firstName, lastName, email, password} = this

            if (!firstName || !lastName || !email || !password) {
                return true
            }

            return false
        }
    }
})


</script>

<style scoped>

/* Animation */

@keyframes fade {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}

.showerror-enter-active {
    animation: fade 0.3s ease-in;
}

.showerror-leave-active {
    animation: fade 0.3s ease-in reverse;
}

main {
    display: flex;
    min-height: 100vh;
    justify-content: center;
    margin: 2rem;
    border: #2c3e50 solid 1px;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
}

h1 {
    margin-bottom: 1rem;
    font-size: 2.5rem;
}

p {
    margin-top: 0.5rem;
}

p.errmsg {
    margin-bottom: 1rem;
    color: red;
}

a {
    color: #FFAF00;;
}

label {
    font-size: 0.9rem;
    margin-top: 0.3rem;
    margin-bottom: 0.3rem;
    font-weight: bold;
}

input {
    border-radius: 5px;
    padding: 0.7rem;
    font-size: 1rem;
    margin-bottom: 0.2rem;
    border: #2c3e50 solid 0.1px;
    outline: none;
}

form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 80%;
}

button {
    cursor: pointer;
    margin-top: 1rem;
    padding: 1rem;
    border-radius: 5px;
    border: none;
    /* background-color: #010101; */
    background-color: #FFAF00;
    color: white;
    font-weight: bold;
    font-size: 1rem;
    transition-duration: 0.3s;
}

button:hover {
    background-color: rgba(207, 143, 3, 0.877);
}

button:disabled {
    color: white;
    background-color: #010101;
    transition-duration: 0.3s;
}

</style>