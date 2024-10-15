<template>
  <main class="display-home-page">
    <h1>Exos du jour</h1>
    <section class="display-exercices">
      <router-link class="router-link" v-for="exercice in exercicesData" :key="exercice.id" :to="`/${exercice.id}`">
        <exercice-card :id="exercice.id" :name="exercice.name" :difficulty="exercice.difficulty"/>
      </router-link>
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
import { ref, onMounted, onUpdated } from 'vue';
import { useRouter } from 'vue-router';
import ModalAddExerciceForm from '../components/ModalAddExerciceForm.vue';
import ExerciceCard from '../components/ExerciceCard.vue';

export default {
  name: "home-pages",
  components: {
    ModalAddExerciceForm,
    ExerciceCard,
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

    onUpdated(() => {
      fetchData();
    })

    const handleOpenModal = () => {
      openModalAddExercice.value = true;
    };

    return {
      exercicesData,
      openModalAddExercice,
      handleOpenModal,
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

 .router-link {
 text-decoration: none;
 color: inherit;
}
</style>