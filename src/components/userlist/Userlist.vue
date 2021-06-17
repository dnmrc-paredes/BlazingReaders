<template>
    <main>
        <div @click="closeForm" class="close"> </div>
        <div class="userlist">
            <div class="title">
                <h1> {{ title }} </h1>
            </div>

            <div class="usersrootbox">
                <div class="users">
                    <div v-for="user in user.following" :key="user._id" class="user">
                        <h3> {{ user.firstName }} {{ user.lastName }} </h3>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
    props: [
        'user',
        'title'
    ],
    methods: {
        closeForm() {
            this.$emit('close-following')
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
    /* background-color: rgb(13, 255, 65); */
    display: flex;
    justify-content: center;
    flex-direction: column;
    z-index: 1;
}

.close {
    position: fixed;
    background-color: rgba(0, 0, 0, 0.219);
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2;
}

.userlist {
    position: relative;
    display: flex;
    padding: 1rem;
    flex-direction: column;
    margin: auto;
    background-color: whitesmoke;
    border-radius: 5px;
    height: 80%;
    width: 80%;
    z-index: 3;
}

.title {
    padding: 0.5rem;
    margin-bottom: 1rem;
}

/* .usersrootbox {
    background-color: yellow;
    width: 100%;
} */

.user {
    margin: 0.3rem 0;
    padding: 0.5rem;
    transition-duration: 0.3s;
    transition-property: all;
    cursor: pointer;
    /* background-color: orange; */
}

.user:hover {
    background-color: orange;
    border-radius: 5px;
    color: white;
}

</style>