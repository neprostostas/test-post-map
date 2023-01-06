import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import Main from "@/components/Main.vue";
import MapComponent from './components/Map.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: Main },
        { path: '/map', component: MapComponent }
    ]
})

const app = createApp(App)
app.use(router)
app.mount('#app')