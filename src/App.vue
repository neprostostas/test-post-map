<template>
  <MainLayout>
    <router-view />
  </MainLayout>
</template>

<script>
import MainLayout from './components/MainLayout.vue'
export default {
  name: 'App',
  components: {
    MainLayout,
  },
  setup() {

    return {}
  }
}
</script>

<style>

* {
  /* transition: .5s all ease-in-out; */
}

body {
  font-family: 'Lexend', sans-serif;
  background: #ffffff;
}

body, h1, h2, h3, h4, h5, p {
  margin: 0;
}

body.dark {
  background: rgba(0, 0, 0, 0.62);
}

ul {
  list-style-type: none;
}

button {
  cursor: pointer;
}

</style>
