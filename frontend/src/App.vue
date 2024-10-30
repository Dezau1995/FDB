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
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2rem 0.25rem;
}
</style>
