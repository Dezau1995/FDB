import { createWebHistory, createRouter } from "vue-router"
import Home from "./pages/Home.vue"
import Categories from "./pages/Categories.vue";
import ExerciceDetails from "./pages/ExercicesDetails.vue";
import Todos from "./components/Todos.vue";
import FirstTest from "./components/FirstTest.vue";
import Login from "./components/auth/Login.vue";
import CreateAccount from "./components/auth/CreateAccount.vue";

const routes = [
    {path: '/', component: Home},
    {path: '/todos', component: Todos},
    {path: '/counter', component: FirstTest},
    {path: '/categories', component: Categories, meta: { requiresAuth: true }},
    {path: `/:exerciceId`, component: ExerciceDetails, meta: { requiresAuth: true }},
    {path: '/login', component: Login},
    {path: '/signin', component: CreateAccount},
];

const router = createRouter({history: createWebHistory(), routes})

router.beforeEach((to, _from, next) => {
    const token = localStorage.getItem('authToken');

    if (to.meta.requiresAuth && !token) {
        next('/login');
    } else {
        next();
    }
});

export default router