<template>
  <main>
    <router-view />
    <nav-bar/>
  </main>
</template>

<script>
import NavBar from './components/NavBar.vue'

export default {
  name: 'App',
  components: {
    'nav-bar': NavBar,
  },

  setup () {
    return {
      NavBar,
    };
},
};
</script>

<style>
@import './css/global.css';
@import './css/reset.css';

main {
  margin: 1rem 0.5rem;
}

.logo {
  cursor: pointer;
  transition: all 1s ease-in-out;
  border: 1px solid white;
  border-radius: 10px;
}

.logo:hover {
  transform: scale(1.2);
  box-shadow: 0 0 10px 5px white;
}
</style>
