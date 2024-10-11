<template>
  <main id="display">
    <p :class="{ active: count > 5 }">Compteur : {{ count }}</p>
    <button v-on:click="increment">Incrémenter</button>
    <button @click="decrement">Décrémenter</button>
    <hr />
    <button @click="sortMovies">Réorganiser</button>
    <form action="" @submit.prevent="addMovie">
      <input type="text" placeholder="Nouveau Film" v-model="movieName" />
      <button>Ajouter</button>
    </form>
    <ul>
      <li v-for="movie in movies" :key="movie">
        {{ movie }} <button @click="deleteMovie(movie)">Supprimer</button>
      </li>
    </ul>
  </main>
</template>

<script setup>
import { ref } from "vue";

const count = ref(0);
const movieName = ref("");
const movies = ref(["Matrix", "Lilo & Stitch", "Titanic"]);
const increment = () => {
  count.value++;
};
const decrement = () => {
  count.value--;
};

const deleteMovie = (movie) => {
  movies.value = movies.value.filter((m) => m != movie);
};

const sortMovies = () => {
  movies.value.sort((a, b) => (a > b ? 1 : -1));
};

const addMovie = () => {
  movies.value.push(movieName.value);
  movieName.value = "";
};
</script>

<style>
#display {
  background-color: red;
  display: flex;
  flex-direction: column;
  border-radius: 5%;
  /* padding: 5%; */
}
</style>
