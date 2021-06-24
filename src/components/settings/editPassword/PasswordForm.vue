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

            <label for="currentpassword"> Current Password </label>
            <input type="password" v-model="currentPass" name="currentpassword">
            <label for="newpassword"> New Password </label>
            <input type="password" v-model="newPass" name="newpassword">
            <label for="confirmpassword"> Confirm Password </label>
            <input type="password" v-model="confirmPass" name="confirmpassword">
            <button type="submit"> Confirm </button>
        </form>
    </main>
</template>

<script lang="ts">
import axios from 'axios'

import {defineComponent} from 'vue'

export default defineComponent({
    data() {
        return {
            currentPass: "" as string,
            newPass: "" as string,
            confirmPass: "" as string,
            errors: [] as string[],
            msg: "" as string
        }
    },
    methods: {
        async submitEdit() {

            this.errors = []

            if (this.newPass !== this.confirmPass) {
                this.errors.push('Password must match.')
                return setTimeout(() => {
                    this.errors = []
                }, 5000)
            }

            const {data} = await axios.patch(`https://blazing-readers-rest-api.herokuapp.com/editpassword/${this.userID}`, {
                currentPass: this.currentPass,
                newPass: this.newPass
            }, {
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }
            })

            if (data.status === 'ok') {
                this.currentPass = ""
                this.newPass = ""
                this.confirmPass = ""
                this.msg = 'Password Succesfully Changed.'
                return setTimeout(() => {
                    this.msg = ''
                }, 5000)
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
        token() {
            return this.$store.state.token
        },
        userID() {
            return this.$store.state.user._id
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

/* Media Q's */

@media screen and (max-width: 900px) {

    form {
        width: 50%;
    }

}

@media screen and (max-width: 450px) {

    form {
        width: 80%;
    }

}

</style>