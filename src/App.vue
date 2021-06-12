<template>
  <main id="app" >
    <router-view/>
  </main>
</template>

<style>

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.isloading {
  display: flex;
  padding: auto;
  margin: 10rem auto;
  justify-content: center;
}

</style>
