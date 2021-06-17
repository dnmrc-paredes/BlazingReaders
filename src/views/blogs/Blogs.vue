<template>
    <main>

        <div class="header">
            <the-header/>
        </div>

        <div v-if="isLoading" style="flex: 2" class="isloading">
            <sync-loader :loading="isLoading" :color="color" :size="size"></sync-loader>
        </div>

        <transition name="blogbox" >
            <div v-if="!isLoading" class="blogrootbox">
                <h1 id="Blogs"> Blogs </h1>

                <div class="allblogs">
                    <transition-group name="blogitems" >
                        <div v-for="blog in blogs" :key="blog._id" class="blog">
                            <h2> <router-link :to="{name: 'OneBlog', params: {blogID: blog._id} }" > {{ blog.title }} </router-link> </h2>
                        </div>
                    </transition-group>
                </div>

                <button :disabled="isTheSame" @click="loadMore" > {{ isTheSame ? 'Max Results' : 'Load more' }} </button>
            </div>
        </transition>
        
    </main>
</template>

<script lang="ts">
import axios from 'axios'

// Typescript
import { Iblog } from '@/interfaces/blogs'

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
            isLoading: true,
            color: '#FFAF00',
            size: '15px',
            limit: 0 as number,
            isTheSame: false
        }
    },
    methods: {
        async getAllBLogs() {
            this.limit+=5
            const {data} = await axios.get(`http://localhost:8000/allblogs/${this.userID}?limit=${this.limit}`)
            console.log(data)
            this.blogs = data.blogs
            this.isLoading = false
            this.isTheSame = data.max
        },
        async loadMore() {
            this.getAllBLogs()
        }
    },
    computed: {
        userID() {
            return this.$store.state.user._id
        }
    },
    created() {
        this.getAllBLogs()
    }
})
</script>

<style scoped>

/* Animations & Transitios */

.blogbox-enter-active,
.blogitems-enter-active {
    animation: fade 0.3s ease-in;
}

h1#Blogs {
    font-size: 3rem !important; 
    font-family: var(--big);
    margin-bottom: 1rem;
}

h2 {
    font-family: var(--small);
    font-weight: 400;
}

a {
    text-decoration: none;
    color: #2c3e50;
}

button {
    margin-top: 1rem;
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

button:disabled {
    color: white;
    background-color: #010101;
    transition-duration: 0.3s;
}

/* .header {
    margin-bottom: 5rem;
} */

.blogrootbox {
    margin: 2rem 3rem 3rem 3rem;
}

.blog {
    margin: 0.2rem 0;
    padding: 1rem 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.247);
}

</style>