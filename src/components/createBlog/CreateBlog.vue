<template>
    <main>
        <div @click="toggleForm" class="close"> </div>
        <form @submit.prevent="submitBlog" enctype="multipart/form-data" method="post">
            <h1> Create a Blog </h1>

            <transition-group name="showerror" >
                <div v-for="err in errors" :key="err" class="errorhandling">
                    <p class="errmsg"> {{ err }} </p>
                </div>
            </transition-group>

            <label for="img"> Blog Image </label>
                <input class="fileinput" type="file" name="img">
            <label for="title"> Blog Title </label>
                <input class="withdesign" v-model="title" type="text" name="title">
            <label for="content"> Blog Content </label>
                <textarea wrap="soft" class="withdesign" name="content" v-model="content" cols="30" rows="10"/>

            <button :disabled="isEmpty" type="submit"> Create Blog </button>
        </form>
    </main>
</template>


<script lang="ts">
import axios from 'axios'

import {defineComponent} from 'vue'

export default defineComponent({
    data() {
        return {
            title: '' as string,
            content: "" as string,
            errors: [] as string[]
        }
    },
    methods: {
        toggleForm() {
            this.$emit('close-form')
        },
        /* eslint-disable */
        async submitBlog(e: any) {

            this.errors = []

            const formData = new FormData()
            formData.append('img', e.target[0].files[0])
            formData.append('title', this.title)
            formData.append('content', this.content)

            const {data} = await axios.post(`http://localhost:8000/createblog/${this.userID}`, formData , {
                headers: {
                    "Content-Type": "multipart/form-data",
                    'Authorization': `Bearer ${this.token}`
                }
            })

            if (data.msg === 'Blog created.') {
                this.toggleForm()
            }

            if (data.msg) {
                this.errors.push(data.msg)
                setTimeout(() => {
                    this.errors = []
                }, 5000)
            }
        }
    },
    computed: {
        userID() {
            return this.$store.state.user._id
        },
        token() {
            return this.$store.state.token
        },
        isEmpty() {
            if (!this.title || !this.content) {
                return true
            }

            return false
        }
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

.showerror-enter-active {
    animation: fade 0.3s ease-in;
}

.showerror-leave-active {
    animation: fade 0.3s ease-in reverse;
}

main {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: center;
}

h1 {
    margin-bottom: 1rem;
    font-size: 2.5rem;
}

label {
    font-size: 0.9rem;
    margin-top: 0.3rem;
    margin-bottom: 0.3rem;
    font-weight: bold;
}

input.fileinput {
    padding: 0.7rem 0;
}

input.withdesign, textarea {
    border-radius: 5px;
    padding: 0.7rem;
    font-size: 1rem;
    margin-bottom: 0.2rem;
    border: #2c3e50 solid 0.1px;
    outline: none;
}

form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 2rem;
    background-color: whitesmoke;
    margin: auto;
    width: 50%;
    border-radius: 10px;
    position: relative;
    z-index: 3;
}

p.errmsg {
    color: red;
}

button {
    cursor: pointer;
    margin-top: 1rem;
    padding: 1rem;
    border-radius: 5px;
    border: none;
    /* background-color: #010101; */
    background-color: #FFAF00;
    color: white;
    font-weight: bold;
    font-size: 1rem;
    transition-duration: 0.3s;
}

button:hover {
    background-color: rgba(207, 143, 3, 0.877);
}

button:disabled {
    color: white;
    background-color: #010101;
    transition-duration: 0.3s;
}

.close {
    background-color: rgba(0, 0, 0, 0.329);
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
}

</style>