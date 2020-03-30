import Vue from 'vue'
import VueRouter from 'vue-router'
import Hello from '../components/hello/hello'

Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        {
            path:'/',
            redirect: '/index'
        },
        {
            path: '/index',
            component: Hello
        }
    ]
})