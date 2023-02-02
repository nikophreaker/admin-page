import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    { path: '/login', name: 'login', component: () => import('../components/AdminLogin.vue') },
    { path: '/', name: 'panel', component: () => import('../components/AdminPanel.vue') }
]

const router = createRouter({
    routes,
    history: createWebHistory(),
});

export default router;