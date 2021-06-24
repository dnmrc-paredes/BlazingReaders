<template>
    <main>
        <div class="modal">
            <slot> </slot>
        </div>
    </main>
</template>

<style scoped>

main {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.295);
}

.modal {
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    background-color: whitesmoke;
    margin: auto;
    border-radius: 10px;
}

@media screen and (max-width: 400px) {

    .modal {
        margin: auto 2rem;
    }

}

</style>