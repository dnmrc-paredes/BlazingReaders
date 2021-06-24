<template>
    <div class="pagecontent">
        <div class="title">
            <h1> Become a Publisher </h1>
        </div>

        <div class="content">
            <div class="link">
                <div @click="toggleForm" class="clickable">
                    <h3> Publisher Status </h3>
                    <img src="https://img.icons8.com/material-sharp/19/000000/edit--v1.png"/>
                </div>
            </div>

            <transition name="statusform" >
                <status-form v-if="isOpen" />
            </transition>

        </div>
    </div>
</template>

<script lang="ts">
// Components
import StatusForm from '@/components/settings/editStatus/StatusForm.vue'

import { defineComponent } from 'vue'

export default defineComponent({
    components: {
        StatusForm
    },
    data() {
        return {
            isOpen: false
        }
    },
    methods: {
        toggleForm() {
            this.isOpen = !this.isOpen
        }
    }
})

</script>

<style scoped>

/* Animations & Transitions */

.statusform-enter-active {
    animation: fade 0.3s ease-in;
}

.statusform-leave-active {
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

/* Media Q's */

@media screen and (max-width: 450px) {

    .link .clickable {
        padding: 0.5rem 0;
    }

}

@media screen and (max-width: 400px) {

    .title h1 {
        font-size: 10vw;
    }

}

</style>