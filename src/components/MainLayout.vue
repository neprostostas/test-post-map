<template>
  <div class="main-layout">
    <CustomHeader/>
    <main>
      <slot/>
    </main>
    <CustomFooter/>
  </div>
</template>

<script>

import CustomHeader from '../components/Header.vue'
import CustomFooter from '../components/Footer.vue'

export default {
  name: 'MainLayout',
  components: {
    CustomHeader,
    CustomFooter,
  },

  setup() {

    return { }
  }

}
</script>


<style scoped>

</style>
