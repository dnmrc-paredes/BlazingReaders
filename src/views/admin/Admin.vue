<template>
    <main>
        <div class="sidebar">
            <the-sidebar/>
        </div>

        <div class="adminbox">
            <div class="title">
                <h1> Dashboard </h1>
            </div>

            <div v-if="isLoading" class="isloading">
                <sync-loader :loading="isLoading" :color="color" :size="size"></sync-loader>
            </div>

            <transition name="dashbox">
                <div v-if="!isLoading" class="dashboardinfos">
                    <div class="totalblogs">
                        <h2> Total Blogs </h2>
                        <p> {{ totalBlogs }} </p>
                    </div>

                    <div class="blogsinfo">
                        <div class="mostlikes">
                            <h1 class="most"> Top 3 Most Likes </h1>
                            <div v-if="mostLikes.length === 0" class="nothing">
                                <p> No blogs </p>
                            </div>
                            <div v-for="blog in mostLikes" :key="blog._id" class="blog">
                                <!-- <h2> {{ blog.title }} </h2> -->
                                <router-link :to="{name: 'OneBlog', params: { blogID: blog._id }}"> {{ blog.title }} </router-link> 
                                <p> Total Likes: {{ blog.totalLikes }} </p>
                            </div>
                        </div>

                        <div class="mostcomments">
                            <h1 class="most"> Top 3 Most Comments </h1>
                            <div v-if="mostComments.length === 0" class="nothing">
                                <p> No blogs </p>
                            </div>
                            <div v-for="blog in mostComments" :key="blog._id" class="blog">
                                <!-- <h2> {{ blog.title }} </h2> -->
                                <router-link :to="{name: 'OneBlog', params: { blogID: blog._id }}"> {{ blog.title }}  </router-link> 
                                <p> Total Comments: {{ blog.totalComments }} </p>
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

// Typescript
import {Iblog} from '@/interfaces/blogs'

// Components 
import SyncLoader from 'vue-spinner/src/SyncLoader.vue'

import {defineComponent} from 'vue'

export default defineComponent({
    components: {
        SyncLoader
    },
    data() {
        return {
            totalBlogs: undefined as undefined | number,
            mostLikes: [] as Iblog[],
            mostComments: [] as Iblog[],
            isLoading: true,
            color: '#FFAF00',
            size: '15px',
        }
    },
    methods: {
        async dashboardInfo() {
            const {data} = await axios.get(`https://blazing-readers-rest-api.herokuapp.com/dashboard/${this.userID}`)
            this.totalBlogs = data.allBlogs,
            this.mostLikes = data.top3LikedBlogs,
            this.mostComments = data.top3MostCommentedBlogs
            this.isLoading = false
        }
    },
    computed: {
        userID() {
            return this.$store.state.user._id
        }
    },
    created() {
        this.dashboardInfo()
    }
})
</script>

<style scoped>

/* Animations & Transitions */

.dashbox-enter-active {
    animation: fade 0.3s ease-in;
}

main {
    display: flex;
    justify-content: center;
}

h1 {
    font-family: var(--big);
    font-size: 4rem;
}

h2, a {
    font-family: var(--big);
    font-size: 1.5rem;
    text-decoration: none;
    color: #2c3e50;
}

p {
    margin-top: 0.5rem;
    font-family: var(--small);
    font-size: 1.1rem;
    color: gray;
    font-weight: 400;
}

main {
    display: flex;
    /* background-color: gainsboro; */
}

h1.most {
    font-size: 1.5rem;
}

.sidebar {
    flex: 1;
    display: flex;
    /* min-height: 100vh; */
    height: 100%;
}

.adminbox {
    flex: 20;
    margin: 2rem;
    display: flex;
    flex-direction: column;
}

/* Dashboard */

.totalblogs {
    background-color: whitesmoke;
    /* background-color: white; */
    border-radius: 15px;
    height: 100px;
    padding: 1rem;
    margin: 1rem 0;
}

.dashboardinfos {
    display: flex;
    flex-direction: column;
}

.blogsinfo {
    display: flex;
}

.dashboardinfos .mostlikes {
    background-color: whitesmoke;
    /* background-color: white; */
    border-radius: 15px;
    padding: 1rem;
    margin: 0 0.5rem;
    flex: 1;
}

.dashboardinfos .mostcomments {
    background-color: whitesmoke;
    /* background-color: white; */
    border-radius: 15px;
    padding: 1rem;
    margin: 0 0.5rem;
    flex: 1;
}

.blog {
    margin: 1rem 0;
}


/* Media Q's */

@media screen and (max-width: 900px) {

    .blogsinfo {
        flex-direction: column;
    }

    .dashboardinfos .mostlikes, .dashboardinfos .mostcomments {
        margin: 0.5rem 0;
    }

}

@media screen and (max-width: 550px) {

    main {
        flex-direction: column;
    }

    h1 {
        font-size: 12vw;
    }

    h2, a {
        font-size: 5.2vw;
    }

    .sidebar {
        flex: 1;
        /* min-height: none; */
        height: 100%;
    }

    .adminbox {
        flex: 2;
        margin: 1rem;
    }

}

</style>