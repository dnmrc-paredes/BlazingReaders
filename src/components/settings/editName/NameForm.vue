<template>
    <main>
        <form @submit.prevent="submitEdit" method="post">
            <label for="firstname"> First Name </label>
            <input type="text" :value="firstName" name="firstname">
            <label for="lastname"> Last Name </label>
            <input type="text" :value="lastName" name="lastname">
            <button type="submit"> Confirm </button>
        </form>
    </main>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
    props: {
        firstName: String,
        lastName: String
    },
    methods: {
        submitEdit() {
            console.log(this.firstName, this.lastName)
        }
    }
})
</script>

<style scoped>

main {
    display: flex;
    justify-content: center;
    padding: 3rem 0;
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