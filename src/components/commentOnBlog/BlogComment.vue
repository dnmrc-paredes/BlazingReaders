<template>
    <main>

        <transition name="loginpopup" >
            <login-pop-up @close-form="togglePopUp" v-if="isLoggedIn" />
        </transition>

        <form @submit.prevent="commentOnBlog" method="post">
            <textarea placeholder="Write a comment" v-model="comment" name="comment" cols="30" rows="4"></textarea>
            <button :disabled="isEmpty" type="submit"> Comment </button>
        </form>
    </main>
</template>

<script lang="ts">
import axios from 'axios'

import {defineComponent} from 'vue'

export default defineComponent({
    data() {
        return {
            comment: "" as string,
            isLoggedIn: false,
        }
    },
    methods: {
        async commentOnBlog() {

            if (!this.isAuth) {
                return  this.isLoggedIn = !this.isLoggedIn
            }

            const {data} = await axios.post(`http://localhost:8000/commentonblog/${this.userID}/${this.params}`, {
                content: this.comment
            }, {
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }
            })
            console.log(data)
            this.comment = ""
            this.$emit('refetch-data')
        },
        togglePopUp() {
            this.isLoggedIn = !this.isLoggedIn
        }
    },
    computed: {
        userID() {
            return this.$store.state.user._id
        },
        token() {
            return this.$store.state.token
        },
        isAuth() {
            return this.$store.state.isAuth
        },
        isEmpty() {
            if (!this.comment) {
                return true
            }

            return false
        },
        params() {
            return this.$route.params.blogID
        }
    }
})

</script>

<style scoped>

/* Animations & Transitions */

.loginpopup-enter-active {
    animation: fade 0.3s ease-in;
}

.loginpopup-leave-active {
    animation: fade 0.3s ease-out reverse;
}

main {
    display: flex;
    flex-direction: column;
}

form {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    width: 100%;
}

textarea {
    padding: 0.5rem;
    font-family: var(--small);
    font-weight: 400;
}

button {
    cursor: pointer;
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    border: none;
    /* background-color: #010101; */
    background-color: #FFAF00;
    color: white;
    font-weight: 500;
    width: 100px;
    transition-duration: 0.3s;
    z-index: 2;
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