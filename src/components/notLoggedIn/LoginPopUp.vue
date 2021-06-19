<template>
    <main>
        <div @click="closeForm" class="close"> </div>
        <div class="popup">
            <h3> You must be Logged In to continue </h3>
            <button @click="toLogin" > Log In </button>
        </div>
    </main>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
export default defineComponent({
    methods: {
        closeForm() {
            this.$emit('close-form')
        },
        toLogin() {
            this.$router.push({name: 'Login', path: '/login'})
        }
    }
})
</script>

<style scoped>

main {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: center;
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
    font-weight: bold;
    font-size: 1rem;
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

.close {
    background-color: rgba(0, 0, 0, 0.212);
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 3;
}

.popup {
    text-align: center;
    justify-content: center;
    padding: 2rem;
    background-color: whitesmoke;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    margin: auto;
    flex-direction: column;
    align-items: center;
    width: 25%;
    z-index: 4;
}

</style>