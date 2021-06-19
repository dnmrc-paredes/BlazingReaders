<template>
    <main>

        <transition name="loginpopup" >
            <login-pop-up @close-form="togglePopUp" v-if="isLoggedIn" />
        </transition>

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
                    <p> Like it? Give it a thumbs up! </p>
                </div>

                <div class="reactcontroller">
                    <p>
                        <transition name="switchicon" mode="out-in">
                            <img v-if="alreadyLiked" @click="likeBlog" src="https://img.icons8.com/ios-glyphs/24/2c3e50/facebook-like.png"/>
                            <img v-else @click="likeBlog" src="https://img.icons8.com/material-outlined/24/2c3e50/facebook-like--v1.png"/>
                        </transition>
                        {{ blog.likes.length }} {{ blog.likes.length >= 2 ? 'Likes' : 'Like' }}
                    </p>
                </div>

                <div class="commentsection">
                    <div class="commenticon">
                        <p @click="loadComments" >
                            <img src="https://img.icons8.com/ios-glyphs/25/2c3e50/speech-bubble-with-dots.png"/>
                            View all comments.
                        </p>
                    </div>

                    <div class="commentfunction">
                        <blog-comment @refetch-data="refetch"/>
                        <transition name="allcomments" >
                            <comments-list v-if="isCommentsOpen" :comments="blog.comments" />
                        </transition>
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
import BlogComment from '@/components/commentOnBlog/BlogComment.vue'
import CommentsList from '@/components/allComments/CommentsList.vue'

import {defineComponent} from 'vue'

export default defineComponent({
    components: {
        SyncLoader,
        BlogComment,
        CommentsList
    },
    data() {
        return {
            blog: {} as Iblog,
            isLoading: true,
            isLoggedIn: false,
            isCommentsOpen: false,
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
        async likeBlog() {

            if (!this.isAuth) {
                return  this.isLoggedIn = !this.isLoggedIn
            }

            const {data} = await axios.patch(`http://localhost:8000/likeblog/${this.userID}/${this.paramsID}`, null, {
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }
            })
            console.log(data)
            this.getBlog()
        },
        refetch() {
            this.getBlog()
        },
        loadComments() {
            this.isCommentsOpen = !this.isCommentsOpen
        },
        toPublisher(userID: string, name: string) {
            this.$router.push({name: 'UsersProfile', params: { userID, name }})
        },
        togglePopUp() {
            this.isLoggedIn = !this.isLoggedIn
        }
    },
    computed: {
        isAuth() {
            return this.$store.state.isAuth
        },
        paramsID() {
            return this.$route.params.blogID
        },
        userID() {
            return this.$store.state.user._id
        },
        token() {
            return this.$store.state.token
        },
        alreadyLiked() {
            const result = this.blog.likes?.filter((item) => item._id == this.userID).length as number
            return result
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

.allcomments-enter-active,
.loginpopup-enter-active {
    animation: fade 0.3s ease-in;
}

.allcomments-leave-active,
.loginpopup-leave-active {
    animation: fade 0.3s ease-out reverse;
}

.switchicon-enter-active {
    animation: shake 0.3s ease-in;
}

.switchicon-leave-active {
    animation: shake 0.3s ease-out reverse;
}

main {
    /* min-height: 100vh; */
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

.reactcontroller {
    margin-top: 1rem;
}

.reactcontroller img {
    cursor: pointer;
    margin-right: 0.5rem;
    transition-property: all;
    transition-duration: 0.3s;
}

.reactcontroller p {
    display: flex;
    align-items: center;
    font-family: var(--small);
    font-weight: 400;
}

/* .reactcontroller img:hover {
    animation: shake 0.3s ease-in;
} */

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