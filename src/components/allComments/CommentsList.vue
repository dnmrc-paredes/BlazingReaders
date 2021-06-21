<template>
    <main>

        <div class="title">
            <h1> All comments </h1>
        </div>

        <div v-if="comments.length === 0" class="nocomments">
            <h2> No comments </h2>
        </div>

        <div v-else class="commentbox">
            <transition-group name="everycomment" >
                <div v-for="item in comments" :key="item._id" class="comment">
                    <div class="commentdetails">
                        <h3> {{ item.commentBy.firstName }} {{ item.commentBy.lastName }} </h3>
                        <p> {{ item.content }} </p>
                    </div>

                    <!-- <div class="controller">
                         <p> <img src="https://img.icons8.com/ios-glyphs/22/2c3e50/facebook-like.png"/> </p>
                         <p> <img src="https://img.icons8.com/ios-glyphs/22/2c3e50/speech-bubble-with-dots.png"/> </p>
                    </div> -->
                </div>
            </transition-group>
        </div>

    </main>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
    props: [
        'comments'
    ]
})
</script>

<style scoped>

/* Animation & Transitions */

.everycomment-enter-active {
    animation: fade 0.3s ease-in;
}

.everycomment-leave-active {
    animation: fade 0.3s ease-out reverse;
}

h3 {
    margin-bottom: 0.5rem;
}

.commentbox {
    margin-top: 1.5rem;
    overflow-y: auto;
    height: 500px;
}

.comment {
    margin: 0.3rem 0;
    padding: 1rem;
    border-radius: 5px;
    background-color: whitesmoke;
    display: flex;
    flex-direction: column;
    /* border-bottom: solid black 0.1px; */
}

.controller {
    margin-top: 1rem;
    display: flex;
}

.controller img {
    margin-right: 0.5rem;
}

/* If No Comments */

.nocomments {
    margin-top: 2rem;
    display: flex;
    justify-content: center;
}
.nocomments h2 {
    color: rgb(151, 146, 146);
    font-weight: 400;
}

</style>