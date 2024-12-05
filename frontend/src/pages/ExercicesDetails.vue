<template>
  <section class="display-exercice-page">
    <button class="btn-trash" @click="handleDelete">
      <img class="icon-trash" src="../assets/icon-trash.png" alt="trash">
    </button>
      <h1>{{ exerciceData.name }}</h1>
      <p>{{ exerciceData.description }}</p>
      <p>{{ exerciceData.difficulty }}</p>
      <p>{{ exerciceData.time }}</p>
      <p>{{ exerciceData.repetitions }}</p>
      <p>{{ exerciceData.category?.name }}</p>
      <button type="button" @click="handleEditionExercice">Éditer</button>
    <edition-exercice-modal :exerciceData="exerciceData" :isOpen="openEditionModalExercice" @close="openEditionModalExercice = false"
    @fetch-data="fetchData"/>
  </section>
</template>

<script lang="ts">
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { Exercice } from '../types/Exercice';
import ExerciceEditionModal from '../components/ExerciceEditionModal.vue';

export default {
name: 'exercice-details',
components: {
  'edition-exercice-modal': ExerciceEditionModal,
},
emits: ['update-data'],
setup (_, { emit }) {
  const exerciceData = ref<Partial<Exercice>>({});
  const route = useRoute();
  const router = useRouter();
  const exerciceId = route.params.exerciceId;
  const openEditionModalExercice = ref(false);

  const handleEditionExercice = () => {
    openEditionModalExercice.value = true;
  }

  const fetchData = async () => {
    try {
      const response = await axios.get<Exercice>(`http://localhost:3001/exercices/${exerciceId}`)
      if(response.status === 200) {
        exerciceData.value = response.data;
        console.log('data exercice', exerciceData.value)
      } else {
        console.error('Erreur dans la réponse', response.status);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des données', error);
    }
  };

  console.log('fetch data', fetchData)
  const handleDelete = async () => {
    await axios.delete(`http://localhost:3001/exercices/${exerciceId}`);
    router.push("/")
  }

  const refreshData = () => {
    emit('update-data')
  }

  onMounted(() => {
    fetchData()
  });

  return {
    // Data
    exerciceData,
    openEditionModalExercice,
    // Method
    handleEditionExercice,
    handleDelete,
    fetchData,
    refreshData,
  }
}
}
</script>

<style>
.display-exercice-page {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.btn-trash {
  position: fixed;
  right: 5%;
  background-color: transparent;
  border: none;
  color: none;
  width: 10%;
  cursor: pointer;
}

.icon-trash {
  width: 40px;
  height: 40px;
}

.display-exercice-details-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

@media (min-width: 1024px) {
  .icon-trash {
  cursor: pointer;
  width: 40px;
  height: 40px;
  }
}

</style>