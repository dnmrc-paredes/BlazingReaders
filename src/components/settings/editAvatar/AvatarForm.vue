<template>
    <main>

        <transition name="alert" >
            <alert v-if="msg" :msg="msg" > </alert>
        </transition>

        <form @submit.prevent="submitAvatar" enctype="multipart/form-data">
            <input @change="onFileChange" type="file" name="img">

            <h2 v-if="!imgSource" > No image </h2>
            <img v-else :src="imgSource" alt="Avatar Preview">

            <button type="submit"> Confirm </button>
        </form>
    </main>
</template>

<script lang="ts">
import axios from 'axios'

import { defineComponent } from 'vue'

export default defineComponent({
    data() {
        return {
            imgSource: "",
            msg: "" as string
        } 
    },
    methods: {
        /* eslint-disable */
        async submitAvatar(e: any) {
            // console.log(e.target[0].files[0])
            const formData = new FormData()
            formData.append('img', e.target[0].files[0])

            const {data} = await axios.patch(`https://blazing-readers-rest-api.herokuapp.com/editavatar/${this.userID}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    'Authorization': `Bearer ${this.token}`
                }
            })
            
            if (data.status === 'ok') {
                this.msg = 'Avatar Changed Successfully.'
                setTimeout(() => {
                    this.msg = ''
                }, 5000)
                return this.$store.dispatch('myInfo')
            }
        },
        onFileChange(e: any) {
            const file = e.target.files[0]
            this.imgSource = URL.createObjectURL(file)
        }
    },
    computed: {
        userID() {
            return this.$store.state.user._id
        },
        token() {
            return this.$store.state.token
        },
        myProfile() {
            return this.$store.state.rootUser.avatar
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

h2 {
    margin-top: 1rem;
    text-align: center;
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

img {
    width: 100%;
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