<template>
    <main>

        <div class="blog" v-for="blog in blogs" :key="blog._id">
            <div class="title">
                <h1> <router-link :to="{name: 'OneBlog', params: {blogID: blog._id} }" > {{ blog.title }} </router-link> </h1>
            </div>
            <img :src="`http://localhost:8000/${blog.img}`" alt="blog img">
            <p> {{ blog.content.substring(0,500) }} </p>
        </div>

    </main>
</template>

<script lang="ts">
import axios from 'axios'

// Interfaces
import { Iblog } from '@/interfaces/blogs'

import {defineComponent} from 'vue'

export default defineComponent({
    data() {
        return {
            blogs: [] as Iblog[]
        }
    },
    methods: {
        async getAllBLogs() {
            const {data} = await axios.get('http://localhost:8000/allblogs')
            console.log(data)
            this.blogs = data.data
        }
    },
    created() {
        this.getAllBLogs()
    }
})

</script>

<style scoped>

h1 {
    font-size: 3rem;
    font-family: 'Times New Roman', Times, serif;
}

p {
    margin-top: 1rem;
}

a {
    text-decoration: none;
    color: #2c3e50;
}

img {
    height: 50%;
    width: 100%;
    background-position: center;
}

.blog {
    border-radius: 5px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    /* align-items: center; */
    padding: 2rem;
    margin: 1rem auto;
    width: 50%;
    background-color: whitesmoke;
    /* box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23); */
}

.title {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 1rem;
}

</style>