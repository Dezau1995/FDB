<template>
  <main class="display-home-page">
    <h1>Exos du jour</h1>
    <section class="display-exercices">
      <router-link class="router-link" v-for="exercice in exercicesData" :key="exercice.id" :to="`/${exercice.id}`">
        <exercice-card :id="exercice.id" :name="exercice.name" :difficulty="exercice.difficulty" :category="exercice.category?.name"/>
      </router-link>
      </section>
    <button @click="handleOpenModal">Ajouter un exercice</button>
    <modal-add-exercice-form 
      :isOpen="openModalAddExercice" 
      @close="openModalAddExercice = false" 
    />
    <section class="display-cards">
    <p class="section-card">Séance du jour</p>
    <p class="section-card">Mes programmes</p>
    <p class="section-card">Mes exercices</p>
    <p class="section-card">Évolution</p>
  </section>
  </main>
</template>

<script>
import axios from 'axios';
import { ref, onMounted, onUpdated } from 'vue';
import { useRouter } from 'vue-router';
import ModalAddExerciceForm from '../components/ModalAddExerciceForm.vue';
import ExerciceCard from '../components/ExerciceCard.vue';
import { watch } from 'vue';

export default {
  name:'home-pages',
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
          console.log(response.data)
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

    watch(router.currentRoute, () => {
      fetchData();
    });

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
  gap: 2rem;
}

.display-exercices {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  margin: 1rem 0;
}

 .router-link {
 text-decoration: none;
 color: inherit;
}

.display-cards {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 1rem ;
  width: 100%;
}

.section-card {
  border: 1px solid white;
  border-radius: 10px;
  width: 40%;
  padding: 2rem;
  text-align: center;

}
</style>