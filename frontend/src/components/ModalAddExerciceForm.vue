<template>
  <dialog class="display-modal-add-exercice" v-if="isOpen" @close="closeModal" @update-data="refreshData">
    <button type="button" @click="closeModal" class="close-form-modal">Annuler</button>
    <form @submit.prevent="handleSubmit" class="display-add-exercice-form">
      <div class="input-container"> 
      <label>
        Nom :
        <input class="text-field" type="text" name="name" />
      </label>
    </div>
    <div class="input-container">
      <label>
        Description :
        <input class="text-field" type="text" name="description" />
      </label>
    </div>
    <div class="input-container">
      <label>
        Difficultée :
        <input type="text" name="difficulty" />
      </label>
    </div>
    <div class="input-container">
      <label>
        Durée :
        <input type="text" name="time" />
      </label>
    </div>
    <div class="input-container">
      <label>
        Équipement :
        <input type="text" name="equipement" />
      </label>
    </div>
    <div class="input-container">
      <label>
        Nombre de répetitions :
        <input type="text" name="repetitions" />
      </label>
    </div>
    <div class="input-container">
      <label> Catégorie
      <select name="categoryId" id="category-select">
        <option value="Choose a category">--Choissez une catégorie--</option>
        <option v-for="category in categoriesData" :key="category.id" :value="category.id">
      {{ category.name }}
        </option>
      </select>
    </label>
    </div>
      <button class="btn-add-exercice">Ajouter l'exercice !</button>
    </form>
  </dialog>
</template>

<script lang="ts" >
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { Category } from '../types/Category';

export default {
  name: 'add-exercice',
  props: {
    isOpen: { type: Boolean, required: true },
  },
  emits: ['close', 'update-data'],
  setup(_, { emit }) {
    const categoriesData = ref<Partial<Category[]>>([]);

    const handleSubmit = async (e: Event) => {
      const form= e.target;
      const formData = new FormData(form as HTMLFormElement);
      const formJson = (Object as any).fromEntries((formData as any).entries()) as Record<string, number>;
      try {
        await axios.post(`http://localhost:3001/exercices/`, formJson);
        emit('close');
        emit('update-data');
      } catch (error) {
        console.log('Erreur lors de l\'ajout de l\'exercice', error)
      }

    };

    const fetchData = async () => {
      try {
       const response = await axios.get(`http://localhost:3001/categories/`);
       if (response.status === 200) {
        categoriesData.value = response.data; 
        } else {
           console.error('Erreur dans la réponse', response.status);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données", error);
      }
    };

    onMounted(() => {
      fetchData();
    });

    const closeModal = () => {
      emit('close');
    };

    const refreshData = () => {
      emit('update-data')
    }

    return {
      // Data
      categoriesData,
      // Method
      handleSubmit,
      closeModal,
      refreshData,
    };
  }
}
</script>

<style>
.display-modal-add-exercice {
  position: fixed;
  overflow: hidden;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  top: 10%;
  height: 60vh;
  padding: 1.5rem;
  color: #2D2D2D;
  background-color: #F0F0F0;
  box-shadow: var(--secondary-color) 0 0 10px 0;
  z-index: 9999;
  border-radius: 10px;
}

.close-form-modal {
  position: absolute;
  top: 5%;
  right: 5%;
}

.display-add-exercice-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.input-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60%;
  margin: 0.25rem;
}

.btn-add-exercice {
  margin: 2rem 0;
}
</style>
