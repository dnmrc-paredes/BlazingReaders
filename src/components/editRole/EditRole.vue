<template>
    <main>
        <form @submit.prevent="submitRole" method="post">
            <select v-model="selectedRole" name="roles">
                <option value="" selected disabled hidden> Select </option>
                <option value="admin"> Admin </option>
                <option value="normal"> Normal </option>
            </select>
            <button :disabled="isInvalid" type="submit"> Save </button>
            <img @click="toggleEdit(userID)" src="https://img.icons8.com/ios-glyphs/30/000000/macos-close.png"/>
        </form>
    </main>
</template>

<script lang="ts">
import axios from 'axios'

import {defineComponent} from 'vue'

export default defineComponent({
    props: [
        'userID',
        'role'
    ],
    data() {
        return {
            selectedRole: '' as string
        }
    },
    methods: {
        async submitRole() {
            const {data} = await axios.patch(`http://localhost:8000/editrole/${this.userID}`, {
                newRole: this.selectedRole
            })

            console.log(data.data)
            this.$emit('refetch-data')
            this.toggleEdit(this.userID)
        },
        toggleEdit(userID: string) {
            this.$emit('close-form', userID)
        }
    },
    computed: {
        isInvalid() {
            if (!this.selectedRole) {
                return true
            }

            return false
        }
    }

})

</script>

<style scoped>

form {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    transition-duration: 0.3s;
}

select {
    padding: 0.2rem;
}

button {
    cursor: pointer;
    margin: 0 0.2rem;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    border: none;
    /* background-color: #010101; */
    background-color: #FFAF00;
    color: white;
    font-size: 0.7rem;
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

img {
    cursor: pointer;
}


</style>