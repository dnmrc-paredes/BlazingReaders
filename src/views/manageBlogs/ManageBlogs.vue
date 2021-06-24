<template>
    <main>
        <div class="sidebar">
            <the-sidebar/>
        </div>

        <div class="adminbox">
            <h1> Manage Blogs </h1>

            <transition name="userbox" >
                <div v-if="isLoading" class="isloading">
                    <sync-loader :loading="isLoading" :color="color" :size="size"></sync-loader>
                </div>
                <table v-else >
                    <tr class="tabletitle">
                        <th class="tabrow"> Blogs </th>
                        <th class="tabrow"> Edit </th>
                    </tr>

                    <transition-group name="users" > 
                        <tr v-for="blog in blogs" :key="blog._id" >
                            <th class="th"> {{ blog.title }} </th>
                            <th>
                                <form @submit.prevent="" method="post">
                                    <button @click="toggleEdit(blog._id)" class="edit" > Edit </button>
                                    <button @click="toggleDeleteOpen(blog._id)" class="delete" > Delete </button>
                                </form>
                            </th>
                        </tr>
                    </transition-group>
                </table>
            </transition>

            <transition name="delete" >
                <modal v-if="isDeleteOpen">
                    <h3> Are you sure you want to delete? </h3>
                    <div class="grpbtns">
                        <button @click="deleteBlog" > Yes </button>
                        <button @click="toggleDeleteClose" > Cancel </button>
                    </div>
                </modal>
            </transition>

            <transition name="edit" >
                <edit-blog :blog="selectedBlog" @close-form="toggleEditRefetch" v-if="isEditOpen" propTitle="Edit Blog" propBtn="Confirm" /> 
            </transition>

        </div>
    </main>
</template>

<script lang="ts">
import axios from 'axios'

// Interfaces
import { Iblog } from '@/interfaces/blogs'

// Components
import SyncLoader from 'vue-spinner/src/SyncLoader.vue'
import Modal from '@/components/modal/Modal.vue'
import EditBlog from '@/components/editBlog/EditBlog.vue'

import {defineComponent} from 'vue'

export default defineComponent({
    components: {
        SyncLoader,
        Modal,
        EditBlog
    },
    data() {
        return {
            blogs: [] as Iblog[],
            isLoading: true,
            isDeleteOpen: false,
            isEditOpen: false,
            selectedBlog: {} as Iblog,
            color: '#FFAF00',
            size: '15px',
            toBeDeleted: '' as string
        }
    },
    methods: {
        async getAllUsers() {
            const {data} = await axios.get(`https://blazing-readers-rest-api.herokuapp.com/getmyblogs/${this.userID}`, {
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }
            })

            this.blogs = data.myBlogs
            this.isLoading = false
        },
        async deleteBlog() {
            await axios.delete(`https://blazing-readers-rest-api.herokuapp.com/deleteblog/${this.userID}/${this.toBeDeleted}`, {
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }
            })
            await this.getAllUsers()
            this.toggleDeleteClose()
        },
        toggleEdit(blogID: string) {
            
            if (blogID) {
                const blog = this.blogs.find(item => item._id == blogID) as Iblog
                this.selectedBlog = blog
            }

            this.isEditOpen = !this.isEditOpen
        },
        toggleEditRefetch() {
            this.getAllUsers()
            this.isEditOpen = !this.isEditOpen
        },
        toggleDeleteOpen(blogID: string) {
            this.toBeDeleted = blogID
            this.isDeleteOpen = true
        },
        toggleDeleteClose() {
            this.toBeDeleted = ''
            this.isDeleteOpen = false
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
        this.getAllUsers()
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

.edit-enter-active,
.delete-enter-active,
.userbox-enter-active,
.users-enter-active {
    animation: fade 0.3s ease-in;
}

.edit-leave-active,
.delete-leave-active,
.users-leave-active {
    animation: fade 0.3s ease-in reverse;
}

main {
    display: flex;
}

h1 {
    font-size: 4rem;
}

button {
    cursor: pointer;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    border: none;
    /* background-color: #010101; */
    background-color: #FFAF00;
    color: white;
    font-weight: 400;
    transition-duration: 0.3s;
}

button.edit {
    background-color: green;
}

button.delete {
    background-color: red;
}

button:hover {
    background-color: rgba(207, 143, 3, 0.877);
}

table {
    width: 100%;
    margin-top: 3rem;
    /* border: 1px solid black; */
    border-collapse: collapse;
}

th, tr {
    padding: 1rem;
    transition-duration: 0.3s;
}

th {
    text-align: left;
    /* border-bottom: solid black 1px; */
}

th.tabrow {
    text-align: center;
}

img {
    cursor: pointer;
}

form {
    display: flex;
    justify-content: center;
}

form button {
    margin-right: 0.5rem;
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
}

.tabletitle {
    background-color: #FFAF00;
    color: white;
}

.grpbtns {
    margin-top: 1rem;
    display: flex;
}

.grpbtns button {
    margin: 0 0.5rem;
}

/* Media Q's */

@media screen and (max-width: 550px) {

    main {
        flex-direction: column;
    }

    h1 {
        margin-top: 3rem;
        font-size: 12vw;
    }

    th, tr {
        padding: 1rem 0.5rem;
    }

    table {
        margin-top: 1rem;
    }

    .sidebar {
        flex: 1;
        /* min-height: none; */
        height: 100%;
    }

    .adminbox {
        margin: 1rem;
    }

}

</style>