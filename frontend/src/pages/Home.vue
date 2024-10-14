<template>
  <main class="display-home-page">
    <h1>Exos du jour</h1>
    <section >
      <ul class="display-exercices">
        <li class="exercice-list" v-for="exercice in exercicesData" :key="exercice.id" @click="navigateToExerciceDetails(exercice.id)">{{ exercice.name }}</li>
      </ul>
    </section>
    <button @click="handleOpenModal">Créer un exercice</button>
    <modal-add-exercice-form 
      :isOpen="openModalAddExercice" 
      @close="openModalAddExercice = false" 
    />
  </main>
</template>

<script>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import ModalAddExerciceForm from '../components/ModalAddExerciceForm.vue';

export default {
  name: "home-pages",
  components: {
    ModalAddExerciceForm,
  },
  setup() {
    const exercicesData = ref([]);
    const openModalAddExercice = ref(false);
    const router = useRouter();

    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/exercices/`);
        if (response.status === 200) {
          exercicesData.value = response.data;
        } else {
          console.error('Erreur dans la réponse', response.status);
        }
      } catch (error) {
        console.log('Erreur lors de la récupération des données', error);
      }
    };

    onMounted(() => {
      fetchData();
    });

    const handleOpenModal = () => {
      openModalAddExercice.value = true;
    };

    const navigateToExerciceDetails = (exerciceId) => router.push(`/${exerciceId}`)

    return {
      exercicesData,
      openModalAddExercice,
      handleOpenModal,
      navigateToExerciceDetails
    };
  },
};
</script>

<style>
.display-home-page {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.display-exercices {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.exercice-list {
    border: 1px solid white;
    border-radius: 10px;
    padding: 1rem;
  }
</style>