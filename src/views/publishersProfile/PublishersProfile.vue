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
                    <h1>
                        <img id="profile2" v-if="user.avatar" :src="`https://blazing-readers-rest-api.herokuapp.com/${user.avatar}`" alt="">
                        <img v-else src="https://img.icons8.com/ios-glyphs/45/2c3e50/user-male-circle.png"/>
                        {{ user.firstName }} {{ user.lastName }}
                    </h1>
                    <button @click="followUser(user._id)" v-if="!notSame" > {{ isFollowed ? 'Unfollow' : 'Follow' }} </button>
                </div>

                <p v-if="isPublisher" > Publisher <img src="https://img.icons8.com/material-sharp/15/000000/star.png"/> </p>

                <div class="followingandfollowers">
                    <p @click="toggleFollowing" > Following: {{ user.following.length }} </p>
                    <p @click="toggleFollowers" v-if="isPublisher" > Followers: {{ user.followers.length }} </p>
                </div>

                <transition name="togglefollow">
                    <userlist @close-following="toggleFollowing" v-if="toggleFollow" :users="user.following" title="Following" />
                </transition>

                <transition name="togglefollowers" >
                    <userlist @close-following="toggleFollowers" :users="user.followers" v-if="toggleFollower" title="Followers" />
                </transition>

                <transition name="loginpopup" >
                    <login-pop-up @close-form="togglePopUp" v-if="isLoggedIn" />
                </transition>

            </div>
        </transition>

        <transition name="tab" >
            <div v-if="!isLoading" class="switchtabs">
                <div @click="toggleTab('feed')" class="feedtab">
                    <p> Feed </p>
                </div>

                <div v-if="user.role === 'admin'" @click="toggleTab('publish')" class="publishtab">
                    <p> Blogs </p>
                </div>
            </div>
        </transition>

        <div v-if="tab === 'feed'" class="feedtab">
            <transition name="profileroot3" >
                <div v-if="!isLoading" class="profilefeed">
                    
                    <div class="nofeed">
                        <h2 v-if="myTweets.length > 0"> Feed </h2>
                        <h2 v-else > No tweets </h2>
                    </div>

                    <div v-if="notSame" class="createtweet">
                        <form @submit.prevent="" method="post">
                            <textarea name="tweet" placeholder="Say something..." cols="30" rows="10"></textarea>
                            <button> Tweet </button>
                        </form>
                    </div>

                    <div class="feedbox">
                        <transition-group name="everytweet" >
                            <div v-for="tweet in myTweets" :key="tweet._id" class="feed">
                                <div class="feedupper">
                                    <h2> <img src="https://img.icons8.com/ios-glyphs/40/2c3e50/user-male-circle.png"/> {{ user.firstName }} {{ user.lastName }} </h2>
                                    <div v-if="notSame" class="openoptions">
                                        <img @click="toggleOptions(tweet._id)" src="https://img.icons8.com/material-sharp/25/000000/dots-loading--v3.png"/>
                                        <div v-if="tweet.openOptions" class="optionslist">
                                            <li> Edit </li>
                                            <li> Delete </li>
                                        </div>
                                    </div>
                                </div>
                                <p> {{ tweet.content }} </p>
                            </div>
                        </transition-group>
                    </div>
                </div>
            </transition>
        </div>

        <div v-else class="publishtab">
            <transition name="profileroot3" >
                <div v-if="!isLoading" class="profileblogs">
                    <h2 v-if="user.myBlogs.length === 0" > No Blogs </h2>
                    <h2 v-else > Recent publish </h2>
                    
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
import Userlist from '@/components/userlist/Userlist.vue'

// Typescript
import { Roles } from '@/interfaces/enumsRole'
import { Iuser } from '@/interfaces/user'
import { Itweet } from '@/interfaces/tweet'

import {defineComponent} from 'vue'
import { RouteLocation } from 'vue-router'

export default defineComponent({
    components: {
        SyncLoader,
        Userlist
    },
    data() {
        return {
            user: {} as Iuser,
            isLoading: true,
            myTweets: [] as Itweet[],
            toggleFollow: false,
            toggleFollower: false,
            isLoggedIn: false,
            color: '#FFAF00',
            size: '15px',
            tab: 'feed'
        }
    },
    methods: {
        async getUserInfo() {
            const {data} = await axios.get(`https://blazing-readers-rest-api.herokuapp.com/getuserinfo/${this.userID}`)
            this.user = data.data
            this.myTweets = data.myTweets
            this.isLoading = false
        },
        async followUser(otherID: string) {

            if (!this.isAuth) {
                return this.isLoggedIn = !this.isLoggedIn
            }

            await axios.patch(`https://blazing-readers-rest-api.herokuapp.com/followunfollow/${this.myID}/${otherID}`, null, {
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }
            })

            this.getUserInfo()
        },
        toggleTab(tabName: string) {
            this.tab = tabName
        },
        toggleFollowing() {
            this.toggleFollow = !this.toggleFollow
        },
        toggleFollowers() {
            this.toggleFollower = !this.toggleFollower
        },
        togglePopUp() {
            this.isLoggedIn = !this.isLoggedIn
        }
    },
    computed: {
        myID() {
            return this.$store.state.user._id
        },
        userID() {
            return this.$route.params.userID
        },
        isAuth() {
            return this.$store.state.isAuth
        },
        isPublisher() {
            if (this.user.role === Roles.ADMIN) {
                return true
            }

            return false
        },
        notSame() {
            if (this.userID === this.$store.state.user._id) {
                return true
            }

            return false
        },
        isFollowed() {
            const result = this.user.followers?.filter((item) => item._id == this.myID).length as number

            return result
        },
        token() {
            return this.$store.state.token
        }
    },
    watch: {
        $route(prev: RouteLocation, newValue: RouteLocation) {
            if (prev.params.userID !== newValue.params.userID && prev.matched[0].path === newValue.matched[0].path) {
                this.isLoading = true
                this.getUserInfo()
                return 
            }
        }
    },
    created() {
        this.getUserInfo()
    }
})

</script>

<style scoped>

/* Animations & Transitions */

.loginpopup-enter-active,
.togglefollowers-enter-active,
.togglefollow-enter-active,
.btn-enter-active,
.tab-enter-active,
.profileroot-enter-active,
.profileroot2-enter-active, 
.profileroot3-enter-active {
    animation: fade 0.3s ease-in;
}

.loginpopup-leave-active,
.togglefollowers-leave-active,
.togglefollow-leave-active {
    animation: fade 0.3s ease-in reverse;
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
    margin: 2rem 2rem 0 2rem;
    padding: 2rem;
    /* border-bottom: solid black 1px; */
}

.profilename {
    display: flex;
    justify-content: space-between;
}

.followingandfollowers {
    display: flex;
}

.followingandfollowers p {
    cursor: pointer;
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

.switchtabs .feedtab,
.switchtabs .publishtab {
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

/* If No Tweets */

/* .nofeed {
    margin-top: 2rem;
} */

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
    margin: 0.5rem 0;
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


/* Feed Box */

.feedbox {
    margin-top: 2rem;
    height: 500px;
    overflow-y: auto;
}

.feed {
    margin: 1rem 0;
    padding: 0.5rem 0.5rem 1.5rem 0.5rem;
}

.feed img {
    cursor: pointer;
}

.feed h2 {
    color: #2c3e50;
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
}

.feedupper {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

/* Media Q's */

@media screen and (max-width: 750px) {

    .profilename h1 {
        font-size: 5vw;
    }

}

@media screen and (max-width: 500px) {

    .profilebox {
        margin: 1rem;
        padding: 1rem 0.5rem;
    }

    .switchtabs {
        margin: 1rem;
        padding: 0.5rem;
    }

    .profilename {
        flex-direction: column;
    }

    button {
        margin-bottom: 1rem;
        width: 80px;
    }

    .profilename h1 {
        font-size: 8vw;
    }

    .profileblogs,
    .profilefeed {
        margin: 0rem 1rem;
        padding: 0.5rem;
    }
    
}

</style>