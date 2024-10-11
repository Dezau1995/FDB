<template>
  <section>
    <h1>Hello World !</h1>
    <label for="exercices-select"> Choisir une catégorie</label>
      <select name="exercices" id="exercices-select">
        <option value="">--Choissez une catégorie--</option>
        <option v-for="category in categoriesData" :key="category.id" :value="category.name">
      {{ category.name }}
        </option>
      </select>
  </section>
</template>

<script>
import axios from 'axios';
import { ref, onMounted } from 'vue';

export default {
  name: "exercices-pages",
  setup() {
    const error = ref(null);
    const categoriesData = ref([]);

    const fetchData = async () => {
      try {
       const response = await axios.get(`http://localhost:3001/categories/`);
       if (response.status === 200) {
        categoriesData.value = response.data; 
        } else {
           console.error('Erreur dans la réponse', response.status);
        }
      } catch (error) {
        error.value = 'Erreur lors de la récupération des données';
      }
    };

    onMounted(() => {
      fetchData();
    });

    return {
      categoriesData,
      error
    };
  },
};
</script>

<style></style>

