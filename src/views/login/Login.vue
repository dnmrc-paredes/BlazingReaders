<template>
    <main>
        <div class="login1">
            
        </div>

        <div class="login2">
            <form @submit.prevent="loginSubmit" method="post">
                <h1> Log in to your account </h1>

                <transition-group name="showerror" >
                    <div v-for="err in errors" :key="err" class="errorhandler">
                        <p class="errmsg" v-if="errors.length > 0" > {{ err}} </p>
                    </div>
                </transition-group>

                <label for="email"> Email Address / Username </label>
                <input type="email" placeholder="Email" v-model="email" name="email">
                <label for="password"> Password </label>
                <input type="password" placeholder="Password" v-model="password" name="password">
                <button :disabled="isEmpty" type="submit"> Login </button>
                <p> Don't have an account? <router-link to="/signup"> Sign up. </router-link> </p>
            </form>
        </div>
    </main>
</template>

<script lang="ts">
import axios from 'axios'

import {defineComponent} from 'vue'

export default defineComponent({
    data() {
        return {
            email: "" as string,
            password: "" as string,
            errors: [] as string[]
        }
    },
    methods: {
        async loginSubmit() {

            this.errors = []

            const {data} = await axios.post('http://localhost:8000/login', {
                email: this.email,
                password: this.password
            })

            if (data.data) {
                this.$store.dispatch('setUser', data)
                this.$store.dispatch('setAuth')
                this.$store.dispatch('myInfo')
                return this.$router.push({name: 'Root', path: '/'})
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
            if (!this.email || !this.password) {
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
    margin: 2rem;
    border: #2c3e50 solid 1px;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
}

p {
    margin-top: 0.5rem;
}

p.errmsg {
    margin-bottom: 1rem;
    color: red;
}

a {
    color: #FFAF00;
}

h1 {
    margin-bottom: 1rem;
    font-size: 2.5rem;
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

/* .login1, .login2 {
    flex: 1;
} */

/* Login 1 */

.login1 {
    flex: 2;
    background: url('../../assets/3506328.jpg');
    background-size: contain;
    /* background-size: cover; */
    /* background-repeat: no-repeat; */
}

/* Login 2 */

.login2 {
    flex: 1;
    display: flex;
    justify-content: center;
}

.login2 form {
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    padding: 4rem 2rem;
    margin: auto 0;
}

</style>