<template>
    <main>
        <div class="sidebar">
            <the-sidebar/>
        </div>

        <div class="adminbox">
            <h1> Dashboard </h1>
        </div>
    </main>
</template>

<style scoped>


h1 {
    font-size: 4rem;
}

main {
    display: flex;
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

</style>