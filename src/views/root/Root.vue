<template>
    <main>

        <div class="header">
            <the-header/>
        </div>

        <div class="rootbox">
            <div v-if="blogs.length > 0" class="recentblogs">
                <h1 class="blogyoumightlike" > Blogs you might like </h1>
                <div class="blog" v-for="blog in blogs" :key="blog._id">
                    <div class="title">
                        <h1> <router-link :to="{name: 'OneBlog', params: {blogID: blog._id} }" > {{ blog.title }} </router-link> </h1>
                        <div class="likescomments">
                            <p> <img src="https://img.icons8.com/ios-glyphs/20/2c3e50/facebook-like.png"/> {{ blog.likes.length }} </p>
                            <p> <img src="https://img.icons8.com/ios-glyphs/20/2c3e50/speech-bubble-with-dots.png"/> {{ blog.comments.length }} </p>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="isLoading" style="flex: 2" class="isloading">
                <sync-loader :loading="isLoading" :color="color" :size="size"></sync-loader>
            </div>
            
            <div class="noblogs" v-else-if="blogs.length === 0 && !isLoading" >
                <h1> No blogs. </h1>
            </div>

            <div class="publishers">
                <h3 v-if="!isLoading" class="youmightwanttofollow" > You might want to follow: </h3>

                <transition name="nopublishers" >
                    <div v-if="publishers.length <= 0 && !isLoading " class="nopublishers">
                        <h4> No suggestions </h4>
                    </div>
                </transition>

                <transition-group name="suggestpublishers" mode="out-in" >
                    <div v-for="user in publishers" :key="user._id" class="user">
                        <div class="userinfo">
                            <p class="publisher" @click="toPublisher(user._id, `${user.firstName} ${user.lastName}`)" > <img src="https://img.icons8.com/ios-glyphs/40/2c3e50/user-male-circle.png"/> {{ user.firstName }} {{ user.lastName }} </p>
                            <button @click="followUser(user._id)" > Follow </button>
                        </div>
                    </div>
                </transition-group>
            </div>
        </div>

    </main>
</template>

<script lang="ts">
import axios from 'axios'

// Interfaces
import { Iblog } from '@/interfaces/blogs'
import { Iuser } from '@/interfaces/user'

// Components 
import SyncLoader from 'vue-spinner/src/SyncLoader.vue'

import {defineComponent} from 'vue'

export default defineComponent({
    components: {
        SyncLoader
    },
    data() {
        return {
            blogs: [] as Iblog[],
            publishers: [] as Iuser[],
            isLoading: true,
            color: '#FFAF00',
            size: '15px',
        }
    },
    methods: {
        async getAllBLogs() {
            const {data} = await axios.get(`http://localhost:8000/allblogs/${this.userID}`)
            console.log(data)
            this.blogs = data.blogs
            this.publishers = data.randomUsers
            this.isLoading = false
        },
        async followUser(otherID: string) {
            const {data} = await axios.patch(`http://localhost:8000/followunfollow/${this.userID}/${otherID}`, null, {
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }
            })
            console.log(data)
            this.getAllBLogs()
        },
        toPublisher(userID: string, name: string) {

            if (userID === this.userID) {
                return this.$router.push({name: 'Profile', path: '/profile'})
            }

            return this.$router.push({name: 'Publisher', params: { userID, name }})
        }
    },
    computed: {
        userID() {
            return this.$store.state.user._id
        },
        token() {
            return this.$store.state.token
        }
    },
    created() {
        this.getAllBLogs()
    }
})

</script>

<style scoped>

/* Animations & Transition */

.suggestpublishers-enter-active,
.nopublishers-enter-active {
    animation: fade 0.3s ease-in;
}

.suggestpublishers-leave-active,
.nopublishers-leave-active {
    animation: fade 0.3s ease-out reverse;
}

main {
    display: flex;
    flex-direction: column;
}

button {
    cursor: pointer;
    padding: 0.5rem 1rem;
    border-radius: 25px;
    border: none;
    /* background-color: #010101; */
    background-color: #FFAF00;
    color: white;
    font-weight: 500;
    transition-duration: 0.3s;
}

button:hover {
    background-color: rgba(207, 143, 3, 0.877);
}

h1.blogyoumightlike {
    padding: 0 2rem;
    font-size: 3rem;
    font-family: var(--big);
    font-weight: 700;
}

h1 {
    font-size: 1.5rem;
    font-family: var(--big);
    font-weight: 500;
}

h3.youmightwanttofollow {
    text-align: center;
    margin-bottom: 3rem;
}

a {
    text-decoration: none;
    color: #2c3e50;
}

p.publisher {
    cursor: pointer;
}

.header {
    flex: 1;
}

.rootbox {
    flex: 2;
    /* margin-top: 6rem; */
    margin-top: 2rem;
    display: flex;
}

.recentblogs, .publishers {
    display: flex;
    flex-direction: column;
}

.recentblogs {
    flex: 2;
    padding: 1rem;
    height: 520px;
    overflow-y: auto;
}

.publishers {
    flex: 1;
    display: flex;
    font-family: var(--big);
    font-weight: 500;
    /* background-color: blue; */
}

.userinfo {
    margin: 0 1rem;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.userinfo img {
    margin-right: 0.5rem;
}

.userinfo p {
    display: flex;
    justify-content: center;
    align-items: center;
}

.blog {
    display: flex;
    /* align-items: center; */
    padding: 0.5rem 1rem;
    margin: 1rem 1rem 0rem 1rem;
    background-color: white;
    border-bottom: 1px solid rgba(0, 0, 0, 0.247);
    /* box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23); */
}

.noblogs {
    flex: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.title {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 1rem;
    flex-direction: column;
}

.likescomments {
    margin-top: 1rem;
    display: flex;
}

.likescomments img {
    margin-right: 0.3rem;
}

.likescomments p {
    display: flex;
    align-items: center;
    margin-right: 1rem;
    font-family: var(--big);
    font-weight: 500;
}

/* If No Suggested Users */

.nopublishers {
    display: flex;
    justify-content: center;
}


</style>