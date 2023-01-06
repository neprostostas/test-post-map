<template>
  <div class="main-wrapper-outer">
    <div class="main-wrapper-inner">
      <div class="main-content">
        <input class="input-filter" v-model="searchTerm" placeholder="Filter by title" />
        <h3 class="no-posts" v-if="!filteredPosts?.length">
          There is no matched posts.
        </h3>
        <div class="posts-list" v-for="post in filteredPosts" :key="post.id">
          <h2>{{post.id}}. {{ post.title }}</h2>
          <p class="body-post-text">{{ post.body }}</p>
          <p class="comments-text">Comments: {{ post.comments?.length }}</p>
        </div>
        <div v-if="filteredPosts?.length" class="pagination">
          <button @click="prevPage" :disabled="currentPage === 1">Prev</button>
          Page {{ currentPage }} of {{ numPages }}
          <button @click="nextPage" :disabled="currentPage === numPages">Next</button>
        </div>
        <div id="chart"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import ApexCharts from 'apexcharts'

export default {
  name: 'CustomMain',
  setup() {
    const searchTerm = ref('')
    const posts = ref([])
    const chart = ref(null)
    const currentPage = ref(1)
    const numPages = ref(null)
    const itemsPerPage = 10

    const drawChart = () => {
      if (chart.value) {
        chart.value.destroy()
      }
      const labels = []
      const data = []
      filteredPosts.value.forEach((post) => {
        post.comments.forEach((comment) => {
          labels.push(comment.name)
          data.push(comment.email?.length)
        })
      })
      chart.value = new ApexCharts(document.querySelector('#chart'), {
        series: [
          {
            name: 'Number of characters in comments',
            data,
          },
        ],
        chart: {
          type: 'bar',
        },
        xaxis: {
          categories: labels,
        },
      })
      chart.value.render()
    }

    const filteredPosts = computed(() => {
      if (!searchTerm.value) {
        return paginatedPosts.value
      }
      return paginatedPosts.value.filter((post) =>
          post.title.toLowerCase().includes(searchTerm.value.toLowerCase())
      )
    })

    const paginatedPosts = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage
      const end = start + itemsPerPage
      return posts.value.slice(start, end)
    })

    const prevPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--
      }
    }

    const nextPage = () => {
      if (currentPage.value < numPages.value) {
        currentPage.value++
      }
    }

    const getPosts = async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts')
      posts.value = await response.json()
      numPages.value = Math.ceil(posts.value?.length / itemsPerPage)
    }

    const getComments = async () => {
      const promises = posts.value.map((post) =>
          fetch(`https://jsonplaceholder.typicode.com/comments?postId=${post.id}`)
      )
      const responses = await Promise.all(promises)
      const commentLists = await Promise.all(responses.map((r) => r.json()))
      posts.value.forEach((post, i) => {
        post.comments = commentLists[i]
      })
    }

    onMounted(async () => {
      await getPosts()
      await getComments()
      drawChart()
    })

    onUnmounted(() => {
      if (chart.value) {
        chart.value.destroy()
      }
    })

    return {
      searchTerm,
      posts,
      currentPage,
      numPages,
      filteredPosts,
      paginatedPosts,
      prevPage,
      nextPage,
      chart,
    }
  },
}
</script>

<style scoped>

#chart {
  margin: 20px 0;
}

.body-post-text {
  padding: 10px 0;
}

.no-posts {
  font-size: 24px;
  padding: 40px 0 40px 5px;
}

body.dark .input-filter {
  color: #242426;
  background: #8295b0;
  border: none;
}

body.dark input::placeholder{
  color: #292a2d;
}

body.dark input:focus{
  outline: none;
}

.input-filter {
  font-size: 18px;
  font-weight: 500;
  margin: 0 40px 0 5px;
  padding: 8px 15px;
  height: 20px;
  width: calc(100% - 40px);
}

.posts-list {
  padding: 20px;
  margin: 20px 0;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

body.dark .body-post-text, body.dark .comments-text {
  color: #cbc8c8;
}

body.dark .posts-list {
  border: none;
  background: #2b333f;
}

body.dark .posts-list h2 {
  color: #5873a3;
}

body.dark .main-wrapper-outer {
  background: rgb(97 97 97 / 62%);
}

body.dark .main-wrapper-inner {
  background: rgb(97 97 97 / 53%);
}

.main-wrapper-outer {
  background: #ffffff;
}

.main-wrapper-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 90px 60px 20px;
  background: rgba(255, 255, 255, 0.2);
}

.pagination {
  font-size: 20px;
  padding: 10px 0;
  display: grid;
  grid-template-columns: repeat(3, auto);
  gap: 10px;
  justify-items: center;
  align-items: center;
  justify-content: center;
}

.pagination button {
  padding: 5px 10px;
  border: none;
  font-style: normal;
  font-weight: 600;
  font-size: 19px;
  text-align: center;
  color: #fff;
  background: #f1bf3c;
  border-radius: 6px;
}

button:disabled {
  background: #a2a2a2;
  opacity: .3;
  filter: grayscale(60%);
}

</style>