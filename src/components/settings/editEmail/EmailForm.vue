<template>
    <main>

        <transition name="alert" >
            <alert v-if="msg" :msg="msg" > </alert>
        </transition>

        <form @submit.prevent="submitEdit" method="post">

            <div class="errorhandler">
                <transition-group name="error" >
                    <div v-for="err in errors" :key="err" class="error">
                        <p> {{ err }} </p>
                    </div>
                </transition-group>
            </div>

            <label for="email"> Email Address </label>
            <input type="email" v-model="email" placeholder="sample@gmail.com" name="email">
            <label for="confirmpassword"> Confirm Password </label>
            <input type="password" v-model="password" name="password">
            <button :disabled="isEmpty" type="submit"> Confirm </button>
        </form>
    </main>
</template>

<script lang="ts">
import axios from 'axios'

import {defineComponent} from 'vue'

export default defineComponent({
    data() {
        return {
            email: this.$store.state.rootUser.email as string,
            password: "" as string,
            errors: [] as string[],
            msg: "" as string
        }
    },
    methods: {
        async submitEdit() {

            this.errors = []

            const {data} = await axios.patch(`http://localhost:8000/editemail/${this.userID}`, {
                email: this.email,
                password: this.password
            }, {
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }
            })

            if (data.status === 'ok') {
                this.msg = 'Email Changed Successfully.'
                setTimeout(() => {
                    this.msg = ''
                }, 5000)
                return this.$store.dispatch('myInfo')
            }

            if (data.msg) {
                this.errors.push(data.msg)
                return setTimeout(() => {
                    this.errors = []
                }, 5000)
            }
            
        }
    },
    computed: {
        userID() {
            return this.$store.state.user._id
        },
        token() {
            return this.$store.state.token
        },
        isEmpty() {
            if (!this.password || !this.email) {
                return true
            }

            return false
        }
    }
})
</script>

<style scoped>

/* Animations & Transitions */

.error-enter-active,
.alert-enter-active {
    animation: fade 0.3s ease-in;
}

.error-leave-active,
.alert-leave-active {
    animation: fade 0.3s ease-in reverse;
}

main {
    display: flex;
    justify-content: center;
    padding: 3rem 0;
    background-color: whitesmoke;
    border-radius: 5px;
}

label {
    margin-bottom: 0.2rem;
    font-family: var(--big);
    font-size: 0.8rem;
}

input {
    margin: 0.3rem 0;
    padding: 0.3rem;
    font-family: var(--small);
    font-weight: 400;
}

button {
    cursor: pointer;
    margin-top: 1rem;
    border-radius: 5px;
    padding: 0.5rem 1rem;
    border: none;
    /* background-color: #010101; */
    background-color: #FFAF00;
    color: white;
    font-weight: bold;
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

form {
    display: flex;
    flex-direction: column;
    width: 30%;
}

.error p {
    color: red;
    font-size: 0.8rem;
    font-family: var(--small);
    font-weight: 400;
    margin-bottom: 1rem;
}

</style>