<template>
    <main>
        <form @submit.prevent="submitEdit" method="post">
            <label for="firstname"> First Name </label>
            <input type="text" v-model="firstName" name="firstname">
            <label for="lastname"> Last Name </label>
            <input type="text" v-model="lastName" name="lastname">
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
            firstName: this.$store.state.rootUser.firstName,
            lastName: this.$store.state.rootUser.lastName,
        }
    },
    methods: {
        async submitEdit() {
            const {data} = await axios.patch(`http://localhost:8000/editname/${this.userID}`, {
                firstName: this.firstName,
                lastName: this.lastName
            }, {
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }
            })
            
            if (data.status === 'ok') {
                alert('Name Changed Successfully.')
                return this.$store.dispatch('myInfo')
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
            if (!this.firstName || !this.lastName) {
                return true
            }

            return false
        }
    }
})
</script>

<style scoped>

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

</style>