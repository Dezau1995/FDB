<template>
  <div>
    <section v-for="exerciceDetail in exerciceDetailsData" :key="exerciceDetail.id">
      <h1>{{ exerciceDetail.name }}</h1>
      <p>{{ exerciceDetail.description }}</p>
      {{ typeof exerciceDetail }}
    </section>
    {{ exerciceDetailsData }}
  </div>
</template>

<script>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

export default {
name: 'exercice-details',
setup () {
  const error = ref(null);
  const exerciceDetailsData = ref([]);
  const route = useRoute();
  const exerciceId = route.params.exerciceId;

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/exercices/${exerciceId}`)
      if(response.status === 200) {
        exerciceDetailsData.value.push(response.data);
        console.log("ICI", response.data)
      } else {
        console.error('Erreur dans la réponse', response.status);
      }
    } catch (error) {
      error.value = 'Erreur lors de la récupération des données';
    }
  }

  onMounted(() => {
    fetchData()
  });

  return {
    exerciceDetailsData,
    error,
  }
}
}
</script>

<style>

</style>