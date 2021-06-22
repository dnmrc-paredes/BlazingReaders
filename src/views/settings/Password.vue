<template>
    <div class="pagecontent">
        <div class="title">
            <h1> Password </h1>
        </div>
        
        <div class="content">
            <div @click="togglePass" class="link">
                <div class="clickable">
                    <h3> Change Password </h3>
                    <img src="https://img.icons8.com/material-sharp/19/000000/edit--v1.png"/>
                </div>
            </div>

            <transition name="passwordform" >
                <password-form v-if="isOpen" />
            </transition>
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

// Components
import PasswordForm from '@/components/settings/editPassword/PasswordForm.vue'

export default defineComponent({
    components: {
        PasswordForm
    },
    data() {
        return {
            isOpen: false as boolean,
            currentPass: "" as string,
            newPass: "" as string,
            confirmPass: "" as string
        }
    },
    methods: {
        async submitEdit() {
            console.log(this.currentPass)
            console.log(this.newPass)
            console.log(this.confirmPass)
        },
        togglePass() {
            this.isOpen = !this.isOpen
        }
    }
})
</script>

<style scoped>

/* Animations & Transitions */

.passwordform-enter-active {
    animation: fade 0.3s ease-in;
}

.passwordform-leave-active {
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