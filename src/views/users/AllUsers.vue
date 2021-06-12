<template>
    <main>
        <div class="sidebar">
            <the-sidebar/>
        </div>

        <div class="adminbox">
            <h1> Manage Users </h1>

            <transition name="userbox" >
                <div v-if="isLoading" class="isloading">
                    <sync-loader :loading="isLoading" :color="color" :size="size"></sync-loader>
                </div>
                <table v-else >
                    <tr class="tabletitle">
                        <th class="tabrow"> First Name </th>
                        <th class="tabrow"> Last Name </th>
                        <th class="tabrow"> Email </th>
                        <th class="tabrow"> Role </th>
                    </tr>

                    <transition-group name="users" > 
                        <tr class="tr" v-for="user in users" :key="user._id">
                            <th class="th" > {{ user.firstName }} </th>
                            <th class="th" > {{ user.lastName }} </th>
                            <th class="th" > {{ user.email }} </th>
                            <th class="th" v-if="!user.isEdit" > {{ user.role }} <img @click="toggleEdit(user._id)" src="https://img.icons8.com/material-rounded/20/000000/edit--v2.png"/> </th>
                            <th v-else>
                                <edit-role :role="user.role" :userID="user._id" @close-form="toggleEdit($event)" @refetch-data="getAllUsers"/>
                            </th>
                        </tr>
                    </transition-group>
                </table>
            </transition>

        </div>
    </main>
</template>

<script lang="ts">
import axios from 'axios'

// Interfaces
import { Iuser } from '@/interfaces/user'
// import { Roles } from '@/interfaces/enumsRole'

// Components
import SyncLoader from 'vue-spinner/src/SyncLoader.vue'
import EditRole from '@/components/editRole/EditRole.vue'

import {defineComponent} from 'vue'

export default defineComponent({
    components: {
        SyncLoader,
        EditRole
    },
    data() {
        return {
            users: [] as Iuser[],
            isLoading: true,
            color: '#FFAF00',
            size: '15px',
            selectedRole: ''
        }
    },
    methods: {
        async getAllUsers() {
            const {data} = await axios.get('http://localhost:8000/allusers', {
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }
            })
            
            data.data.forEach((element: Iuser) => {
                element.isEdit = false
            });
            // console.log(data.data)
            this.users = data.data
            this.isLoading = false
        },
        toggleEdit(userID: string) {
            const selectedUser = this.users.find(u => u._id === userID) as Iuser
            selectedUser.isEdit = !selectedUser.isEdit
        }
    },
    computed: {
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

.userbox-enter-active,
.users-enter-active {
    animation: fade 0.3s ease-in;
}

.users-leave-active {
    animation: fade 0.3s ease-in reverse;
}

main {
    display: flex;
}

h1 {
    font-size: 4rem;
}

table {
    width: 100%;
    margin-top: 3rem;
    border: 1px solid black;
    border-collapse: collapse;
}

th, tr {
    padding: 1rem;
    transition-duration: 0.3s;
}

th {
    text-align: left;
    border-bottom: solid black 1px;
}

img {
    cursor: pointer;
}

.sidebar {
    flex: 1;
    display: flex;
    min-height: 100vh;
}

.adminbox {
    flex: 20;
    margin: 2rem;
}

.tabletitle {
    background-color: #FFAF00;
    color: white;
}

</style>