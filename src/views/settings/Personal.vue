<template>
    <div class="pagecontent">
        <div class="title">
            <h1> Personal Information </h1>
        </div>

        <div class="content">
            <div @click="editName" class="link">
                <div class="clickable">
                    <h3> Change Name </h3>
                    <img src="https://img.icons8.com/material-sharp/19/000000/edit--v1.png"/>
                </div>
            </div>
            
            <transition name="nameform" >
                <name-form v-if="nameOpen"/>
            </transition>

            <div @click="editEmail" class="link">
                <div class="clickable">
                    <h3> Change Email Address </h3>
                    <img src="https://img.icons8.com/material-sharp/19/000000/edit--v1.png"/>
                </div>
            </div>

            <transition name="emailform" >
                <mail-form v-if="emailOpen" />
            </transition>
        </div>
    </div>
</template>

<script lang="ts">

// Typescript
import { Iuser } from '@/interfaces/user'

// Components
import NameForm from '@/components/settings/editName/NameForm.vue'
import MailForm from '@/components/settings/editEmail/EmailForm.vue'

import {defineComponent} from 'vue'

export default defineComponent({
    components: {
        NameForm,
        MailForm
    },
    data() {
        return {
            nameOpen: false,
            emailOpen: false,
            user: {} as Iuser,
            isLoading: true
        }
    },
    methods: {
        editName() {
            this.nameOpen = !this.nameOpen
        },
        editEmail() {
            this.emailOpen = !this.emailOpen
        }
    },
    computed: {
        userID() {
            return this.$store.state.user._id
        }
    }
})
</script>

<style scoped>

/* Animations & Transitions */

.nameform-enter-active,
.emailform-enter-active {
    animation: fade 0.3s ease-in;
}

.nameform-leave-active,
.emailform-leave-active {
    animation: fade 0.3s ease-in reverse;
}

h3 {
    font-weight: 400;
}

.title {
    margin-bottom: 2rem;
}

.link .clickable {
    cursor: pointer;
    padding: 0.5rem 1rem;
    margin: 0.2rem 0;
    transition-property: all;
    transition-duration: 0.3s;
    display: flex;
    justify-content: space-between;
}

.link .clickable:hover {
    background-color: rgba(0, 0, 0, 0.027);
}

</style>