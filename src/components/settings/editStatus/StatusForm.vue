<template>
    <main>

        <transition name="alert" >
            <alert v-if="msg" :msg="msg" > </alert>
        </transition>

        <form @submit.prevent="submitRole" method="post">
            <label for="role"> <strong> Current Status: {{ role }} </strong> </label>
            <select v-model="newRole" name="role">
                <option value="" selected disabled hidden> Select </option>
                <option value="admin"> Publisher </option>
                <option value="normal"> Normal </option>
            </select>
            <button :disabled="isEmpty" type="submit"> Confirm </button>
        </form>
    </main>
</template>

<script lang="ts">
import axios from 'axios'

import { defineComponent } from 'vue'

export default defineComponent({
    data() {
        return {
            newRole: "" as string,
            msg: "" as string
        }
    },
    methods: {
        async submitRole() {

            if (!this.newRole) {
                return 
            }

            const {data} = await axios.patch(`http://localhost:8000/editrole/${this.userID}`, {
                newRole: this.newRole
            }, {
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }
            })

            if (data.status === 'ok') {
                this.msg = 'Status Succesfully Changed.'
                setTimeout(() => {
                    this.msg = ''
                }, 5000)
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
        role() {
            return this.$store.state.rootUser.role
        },
        isEmpty() {
            if (!this.newRole) {
                return true
            }

            return false
        }
    }
})

</script>

<style scoped>

/* Animatios & Transitions */

.alert-enter-active {
    animation: fade 0.3s ease-in;
}

.alert-leave-active {
    animation: fade 0.3s ease-out reverse;
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

select {
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
    width: 20%;
}

.error p {
    color: red;
    font-size: 0.8rem;
    font-family: var(--small);
    font-weight: 400;
    margin-bottom: 1rem;
}

</style>