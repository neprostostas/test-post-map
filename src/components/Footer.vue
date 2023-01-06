<template>
  <footer>
    <div class="footer-wrapper-outer">
      <div class="footer-wrapper-inner">
        <div class="footer-content">
          <p class="made-by">Made by <a href="https://github.com/neprostostas/">Stanislav Kinash 👻</a></p>
          <p class="current-date">{{ currentDate }}</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  name: 'CustomFooter',

  setup() {
    // Data
    const currentDate = ref('');

    // Methods
    function getCurrentDate() {
      const date = new Date();
      const year = date.getFullYear();
      const month = ('0' + (date.getMonth() + 1)).slice(-2);
      const hours = ('0' + date.getHours()).slice(-2);
      const minutes = ('0' + date.getMinutes()).slice(-2);
      const seconds = ('0' + date.getSeconds()).slice(-2);
      currentDate.value = `${year}/${month} ${hours}:${minutes}:${seconds}`;
    }

    // Lifecycle hooks
    onMounted(() => {
      getCurrentDate();
      setInterval(getCurrentDate, 1000);
    });

    return {
      currentDate
    };
  }
}
</script>

<style scoped lang="scss">

.made-by {
  a {
    text-decoration: none;
    color: #707070;
    &:hover {
      text-decoration: underline;
    }
  }
}

body.dark .made-by {
  color: rgb(141, 150, 150);
}

body.dark .current-date {
  color: rgba(247, 247, 247, 0.74);
}

body.dark .made-by a {
  color: rgba(247, 247, 247, 0.74);
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(2, auto);
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

body.dark .footer-wrapper-outer {
  background: #374151;
}

.footer-wrapper-outer {
  background: #F7F7F7;
}

.footer-wrapper-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px 60px;
}

</style>
