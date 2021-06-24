<template>
    <main>
        <div class="alertbox">
            <p id="alertmsg" >
                <!-- <img id="firstimg" src="https://img.icons8.com/material-two-tone/25/000000/checkmark--v2.png"/> -->
                    {{ msg }}
                <img id="lastimg" src="https://img.icons8.com/material-two-tone/20/2c3e50/checkmark--v2.png"/>
                <!-- <img id="lastimg" src="https://img.icons8.com/windows/25/000000/macos-close.png"/> -->
            </p>
        </div>
    </main>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
    props: {
        msg: String
    }
})
</script>

<style scoped>

main {
    background-color: lightgreen;
    margin: 1rem;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    position: fixed;
    bottom: 0;
    right: 0;
}

.alertbox {
    display: flex;
    justify-content: center;
}

/* Alert */

p#alertmsg img#firstimg {
    margin-right: 0.5rem;
}

p#alertmsg img#lastimg {
    margin-left: 0.5rem;
    cursor: pointer;
}

p#alertmsg {
    display: flex;
    justify-content: center;
    align-items: center;
}

</style>