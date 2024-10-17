<template>
  <section >
    <ul class="navigation-bar">
      <li>
        <img @click="homePage" class="icon-nav-bar" src="../assets/icon-accueil.png" alt="accueil"/>
      </li>
      <li @click="navigateCategoriesPages">Catégories</li>  
      <li @click="goToPage"> Todos List</li>
      <li @click="goToCounterPage">Counter</li>
      <li>
        <img @click="login" src="../assets/icon-avatar.png" class="icon-nav-bar" alt="avatar">
      </li>
    </ul>
  </section>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
  name:'nav-bar',
  setup() {
    const router = useRouter();

    const homePage = () => router.push('/');
    const goToPage = () => router.push('/todos');
    const goToCounterPage = () => router.push('/counter');
    const navigateCategoriesPages = () => router.push('/categories');
    const login = () => router.push('/login');

    return {
      homePage,
      goToCounterPage,
      goToPage,
      navigateCategoriesPages,
      login,
    };
  },
};
</script>

<style>
.navigation-bar {
    position: sticky;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 90vw;
    padding: 0.5rem;
  }

ul {
    display: flex;
    list-style: none;
    gap: 2rem; 
    cursor: pointer;
    }  

.icon-nav-bar {
  width: 40px;
  height: 40px;
  border-radius: 10px;
}

@media (min-width: 1024px) {
  .icon-nav-bar {
  cursor: pointer;
  width: 50px;
  height: 50px;
  transition: all 1s ease-in-out;
  border-radius: 10px;
}

.icon-nav-bar:hover {
  transform: scale(1.2);
  box-shadow: 0 0 10px 5px #FF3B30;
}
}
</style>