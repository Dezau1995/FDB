<template>
  <section class="navigation-bar">
    <img @click="homePageNavigation()" class="logo" src="../assets/component-1.png" alt="logo" width="125" height="75"/>
    <ul>
      <li @click="navigateCategoriesPages">Catégories</li>  
      <li @click="goToPage"> Todos List</li>
      <li @click="goToCounterPage">Counter</li>
    </ul>
  </section>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();

    const homePageNavigation = () => router.push('/');
    const goToPage = () => router.push('/todos');
    const goToCounterPage = () => router.push('/counter');
    const navigateCategoriesPages = () => router.push('/categories')

    return {
      homePageNavigation,
      goToCounterPage,
      goToPage,
      navigateCategoriesPages,
    };
  },
};
</script>

<style>
  .navigation-bar {
    display: flex;
    justify-content: space-between;
    padding: 2rem;
  }
  ul {
    display: flex;
    list-style: none;
    gap: 2rem; 
    cursor: pointer;
    }  
</style>