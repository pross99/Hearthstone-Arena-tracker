import {createRouter,createWebHistory} from "vue-router"
import Home from "@/views/Home.vue"
import Testing from "@/views/Rules.vue"

const router = createRouter ({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path:'/runs/add',
            name: 'add',
            component: Testing
        }
    ]
})


export default router