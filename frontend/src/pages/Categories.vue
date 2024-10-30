<template>
  <section>
    <h1>Hello World !</h1>
    <label for="categories-select"> Choisir une catégorie
      <select name="categories" id="categories-select">
        <option value="">--Choissez une catégorie--</option>
        <option v-for="category in categoriesData" :key="category.id" :value="category.name">
      {{ category.name }}
        </option>
      </select>
    </label>
  </section>
</template>

<script lang="ts">
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { Category } from '../types/Category';

export default {
  name: "exercices-pages",
  setup() {
    const categoriesData = ref<Category[]>([]);

    const fetchData = async () => {
      try {
       const response = await axios.get(`http://localhost:3001/categories/`);
       if (response.status === 200) {
        categoriesData.value = response.data; 
        } else {
           console.error('Erreur dans la réponse', response.status);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données', error)
      }
    };

    onMounted(() => {
      fetchData();
    });

    return {
      categoriesData,
    };
  },
};
</script>

<style></style>

