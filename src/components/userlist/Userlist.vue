<template>
    <main>
        <div @click="closeForm" class="close"> </div>
        <div class="userlist">
            <div class="title">
                <h1> {{ title }} </h1>
            </div>

            <div v-if="users.length === 0" class="noinfo">
                <h2> No {{ title }} </h2>
            </div>

            <div v-else class="usersrootbox">
                <div class="users">
                    <div v-for="user in users" :key="user._id" class="user">
                        <h3 @click="toUser(user._id, `${user.firstName} ${user.lastName}`)" > <img src="https://img.icons8.com/ios-glyphs/40/2c3e50/user-male-circle.png"/> {{ user.firstName }} {{ user.lastName }} </h3>
                        <!-- <router-link :to="{name: 'UsersProfile'}" > <img src="https://img.icons8.com/ios-glyphs/40/2c3e50/user-male-circle.png"/> {{ user.firstName }} {{ user.lastName }} </router-link> -->
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
        'users',
        'title'
    ],
    methods: {
        closeForm() {
            this.$emit('close-following')
        },
        toUser(userID: string, name: string) {
            this.closeForm()

            if (this.userID == userID) {
                return this.$router.push({name: 'Profile', path: 'profile'})
            }

            this.$router.push({name: 'UsersProfile', params: { userID, name } })
        }
    },
    computed: {
        userID(): string {
            return this.$store.state.user._id as string
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

h3 {
    display: flex;
    align-items: center;
    font-family: var(--small);
    font-weight: 400;
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
    overflow-y: auto;
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

.user img {
    margin-right: 0.3rem;
}

.user:hover {
    background-color: orange;
    border-radius: 5px;
    color: white;
}

/* If No Info */

.noinfo {
    display: flex;
    justify-content: center;
    margin-top: 2rem;
}

.noinfo h2 {
    color: rgb(177, 171, 171);
}

@media screen and (max-width: 500px) {

    .userlist {
        width: 90%;
    }

}

</style>