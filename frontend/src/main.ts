import { createApp } from 'vue'
import router from './Router'
import store from '../src/store/index'
import App from './App.vue'

const app = createApp(App);

app.use(store);
app.use(router);
app.mount('#app');
