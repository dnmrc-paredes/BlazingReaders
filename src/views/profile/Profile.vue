<template>
    <main>
        <div class="header">
            <the-header/>
        </div>

        <div v-if="isLoading" style="flex: 2" class="isloading">
            <sync-loader :loading="isLoading" :color="color" :size="size"></sync-loader>
        </div>

        <transition name="profileroot" >
            <div v-if="!isLoading" class="profilebox">
                <div class="profilename">
                    <h1> {{ user.firstName }} {{ user.lastName }} </h1>
                </div>

                <p v-if="isPublisher" > Publisher <img src="https://img.icons8.com/material-sharp/15/000000/star.png"/> </p>

                <div class="followingandfollowers">
                    <p> Following: {{ user.following.length }} </p>
                    <p v-if="isPublisher" > Followers: {{ user.followers.length }} </p>
                </div>
            </div>
        </transition>

        <transition name="tab" >
            <div v-if="!isLoading" class="switchtabs">
                <div @click="toggleTab('feed')" class="feed">
                    <p> Feed </p>
                </div>

                <div @click="toggleTab('publish')" class="publish">
                    <p> Blogs </p>
                </div>
            </div>
        </transition>

        <div v-if="tab === 'feed'" class="feedtab">
            <transition name="profileroot3" >
                <div v-if="!isLoading" class="profilefeed">
                    <h2> Feed </h2>

                    <div class="createtweet">
                        <form @submit.prevent="" method="post">
                            <textarea name="tweet" placeholder="Say something..." cols="30" rows="10"></textarea>
                            <button> Create </button>
                        </form>
                    </div>
                </div>
            </transition>
        </div>

        <div v-else class="publishtab">
            <transition name="profileroot2" >
                <div v-if="!isLoading" class="profileblogs">
                    <h2> Recent publish </h2>
                    <div class="blogsbox">
                        <div v-for="blog in user.myBlogs" :key="blog._id" class="blog">
                            <router-link :to="{name: 'OneBlog', params: { blogID: blog._id }}" > {{ blog.title }} </router-link>
                            <div class="likescomments">
                                <p> <img src="https://img.icons8.com/ios-glyphs/20/2c3e50/facebook-like.png"/> {{ blog.likes.length }} </p>
                                <p> <img src="https://img.icons8.com/ios-glyphs/20/2c3e50/speech-bubble-with-dots.png"/> {{ blog.comments.length }} </p>
                            </div>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
        
    </main>
</template>

<script lang="ts">
import axios from 'axios'

// Components 
import SyncLoader from 'vue-spinner/src/SyncLoader.vue'

// Typescript
import { Roles } from '@/interfaces/enumsRole'
import { Iuser } from '@/interfaces/user'

import {defineComponent} from 'vue'

export default defineComponent({
    components: {
        SyncLoader
    },
    data() {
        return {
            user: {} as Iuser,
            isLoading: true,
            color: '#FFAF00',
            size: '15px',
            tab: 'feed'
        }
    },
    methods: {
        async getUserInfo() {
            const {data} = await axios.get(`http://localhost:8000/getuserinfo/${this.userID}`)
            this.user = data.data
            this.isLoading = false
            console.log(data.data)
        },
        toggleTab(tabName: string) {
            this.tab = tabName
        }
    },
    computed: {
        userID() {
            return this.$store.state.user._id
        },
        isPublisher() {
            if (this.$store.state.user.role === Roles.ADMIN) {
                return true
            }

            return false
        }
    },
    created() {
        this.getUserInfo()
    }
})

</script>

<style scoped>

/* Animations & Transitions */

.tab-enter-active,
.profileroot-enter-active,
.profileroot2-enter-active, 
.profileroot3-enter-active {
    animation: fade 0.3s ease-in;
}

h1 {
    font-family: var(--big);
    font-size: 3rem;
}

h2 {
    color: gray;
}

a {
    font-family: var(--small);
    font-weight: 500;
    text-decoration: none;
    color: #2c3e50;
}

p {
    font-family: var(--small);
    font-weight: 400;
}

button {
    cursor: pointer;
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    border-radius: 25px;
    border: none;
    /* background-color: #010101; */
    background-color: #FFAF00;
    color: white;
    font-family: var(--small);
    font-weight: 500;
    font-size: 0.8rem;
    transition-duration: 0.3s;
}

button:hover {
    background-color: rgba(207, 143, 3, 0.877);
}

.header {
    margin-bottom: 5rem;
}

.profilebox {
    margin: 10rem 2rem 0 2rem;
    padding: 2rem;  
}

.profilename {
    display: flex;
    justify-content: space-between;
}

.followingandfollowers {
    display: flex;
}

.followingandfollowers p:first-child {
    margin-right: 0.5rem;
}

/* Tabs */

.switchtabs {
    margin: 0 2rem;
    background-color: #FFAF00;
    display: flex;
    padding: 0.5rem;
}

.switchtabs p {
    cursor: pointer;
    color: white;
    font-weight: 500;
}

.switchtabs .feed,
.switchtabs .publish {
    flex: 1;
    display: flex;
    justify-content: center;
}

/* Feed */

.createtweet form {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    height: 150px;
}

.createtweet form textarea {
    padding: 0.5rem;
}

.createtweet form button {
    width: 100px;
}

/* Blogs */

.profileblogs,
.profilefeed {
    margin: 0rem 2rem;
    padding: 2rem;
}

.blogsbox {
    margin-top: 1rem;
    height: 300px;
    overflow-y: auto;
}

.blog {
    padding: 1rem 0;
}

/* Blog Likes & Comments */

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

</style>