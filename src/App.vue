<template>
  <main id="app" >
    <router-view/>
  </main>
</template>

<style>

@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700;800&family=Roboto:wght@100;300;400;500;700;900&display=swap');

/* Animations & Transitions */

@keyframes fade {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}

@keyframes shake {
    0% {
        transform: rotate(20deg);
    }
    50% {
        transform: rotate(-20deg);
    }
    100% {
        transform: rotate(0);
    }
}

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

:root {
  --big: 'Open Sans', sans-serif;
  --small: 'Roboto', sans-serif;
}

/* width */
::-webkit-scrollbar {
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  position: relative;
}

.isloading {
  display: flex;
  padding: auto;
  margin: 10rem auto;
  justify-content: center;
}

</style>
