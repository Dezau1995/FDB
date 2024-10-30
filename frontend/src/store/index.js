import { createStore } from 'vuex';
import IsLogged from './IsLogged';

const store = createStore({
  modules: { IsLogged },
});

export default store;