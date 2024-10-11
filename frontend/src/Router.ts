import { createWebHistory, createRouter } from "vue-router"
import Home from "./pages/Home.vue"
import Categories from "./pages/Categories.vue";
import ExerciceDetails from "./pages/ExercicesDetails.vue";
import Todos from "./components/Todos.vue";
import FirstTest from "./components/FirstTest.vue";

const routes = [
    {path: '/', component: Home},
    {path: '/todos', component: Todos},
    {path: '/counter', component: FirstTest},
    {path: '/categories', component: Categories},
    {path: `/:exerciceId`, component: ExerciceDetails}
];

const router = createRouter({history: createWebHistory(), routes})

export default router