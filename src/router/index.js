import Vue from 'vue'
import VueRouter from 'vue-router'
import main from '/src/views/main/main'
import myvault from '/src/views/myvault/my-vault'
import vault from '/src/views/vault/vault'
Vue.use(VueRouter)

const routes = [
    {path: '/', name: 'main', component: main},
    {path: '/home', name: 'main', component: main},
    {path: '/myvault', name: 'my-vault', component: myvault},
    {path: '/vault', name: 'vault', component: vault},
]


const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router