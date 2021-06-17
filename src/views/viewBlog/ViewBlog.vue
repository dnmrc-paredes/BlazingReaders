<template>
    <main>

        <div class="header">
            <the-header/>
        </div>

        <transition name="blog" mode="out-in" >
            <div v-if="isLoading" class="isloading">
                <sync-loader :loading="isLoading" :color="color" :size="size"></sync-loader>
            </div>

            <div v-else class="oneblog">
                <div class="title">
                    <h1> {{ blog.title }} </h1>
                </div>
                <img id="blogimg" :src="`http://localhost:8000/${blog.img}`" alt="blog img">
                <div class="content">
                    <p id="content" > {{ blog.content }} </p>
                </div>

                <div class="thepublisher">
                    <p @click="toPublisher(blog.createdBy._id, `${blog.createdBy.firstName} ${blog.createdBy.lastName}`)">
                        Publisher: @{{ blog.createdBy.firstName }}{{ blog.createdBy.lastName }}
                    </p>
                </div>

                <div class="rate">
                    <p>
                        <img src="https://img.icons8.com/ios-glyphs/25/2c3e50/facebook-like.png"/>
                        Like it? Give it a thumbs up!
                    </p>
                </div>

                <div class="commentsection">
                    <div class="commenticon">
                        <p @click="loadComments" >
                            <img src="https://img.icons8.com/ios-glyphs/25/2c3e50/speech-bubble-with-dots.png"/>
                            View all comments.
                        </p>
                    </div>
                </div>

            </div>
        </transition>

    </main>
</template>

<script lang="ts">
import axios from 'axios'

// Interfaces
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
            blog: {} as Iblog,
            isLoading: true,
            color: '#FFAF00',
            size: '15px',
        }
    },
    methods: {
        async getBlog() {
            const {data} = await axios.get(`http://localhost:8000/getoneblog/${this.paramsID}`)
            this.blog = data.data
            this.isLoading = false
            console.log(data.data)
        },
        loadComments() {
            console.log('load')
        },
        toPublisher(userID: string, name: string) {
            this.$router.push({name: 'Publisher', params: { userID, name }})
        }
    },
    computed: {
        paramsID() {
            return this.$route.params.blogID
        }
    },
    created() {
        this.getBlog()
    }
})

</script>

<style scoped>

@keyframes fade {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}

@keyframes shake {
    0% {
        transform: rotate(20deg);
    }
    50% {
        transform: rotate(-20deg);
    }
    100% {
        transform: rotate(0);
    }
}

main {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin: 0 0 2rem 0;
}

h1 {
    margin: 2rem 0;
    font-family: var(--big);
}

p#content {
    margin-top: 1rem;
    font-family: var(--small);
    font-weight: 500;
}

img#blogimg {
    width: 50%;
    margin-bottom: 3rem;
    margin: auto;
}

.blog-enter-active {
    animation: fade 0.3s ease-in;
}

.blog-leave-active {
    animation: fade 0.3s ease-out reverse;
}

.oneblog {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 3rem 5rem 0rem 5rem;
}

.title {
    display: flex;
    justify-content: center;
}

.content {
    margin-top: 1rem;
    display: flex;
    justify-content: flex-start;
}

.thepublisher {
    margin-top: 1rem;
}

.thepublisher p {
    font-family: var(--small);
    font-weight: 400;
    cursor: pointer;
}

.rate {
    margin-top: 1rem;
}

.rate img {
    cursor: pointer;
    margin-right: 0.5rem;
    transition-property: all;
    transition-duration: 0.3s;
}

.rate img:hover {
    animation: shake 0.3s ease-in;
}

.rate p {
    display: flex;
    align-items: center;
    font-family: var(--small);
    font-weight: 400;
}

.commentsection {
    margin-top: 1rem;
}

.commenticon {
    cursor: pointer;
}

.commenticon img {
    cursor: pointer;
    margin-right: 0.5rem;
    transition-property: all;
    transition-duration: 0.3s;
}

.commenticon img:hover {
    animation: shake 0.3s ease-in;
}

.commenticon p {
    display: flex;
    align-items: center;
    font-family: var(--small);
    font-weight: 400;
}

</style>