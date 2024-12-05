<template>
  <dialog class="display-modal-edition-exercice" v-if="isOpen" @close="closeModal" @fetch-data="fetchData">
    <button type="button" @click="closeModal" class="close-form-modal">X</button>
    <form @submit.prevent="handleSubmit" class="display-edition-exercice-form">
      <div class="input-container"> 
        <label>
        Nom de l'exercice :
        <input type="text" :value="exerciceData.name" name="name">
        </label>
      </div>
      <div class="input-container"> 
        <label>
        Description:
        <input type="text" :value="exerciceData.description" name="description">
        </label>
      </div>
      <div class="input-container"> 
        <label>
        Difficulté :
        <input type="text" :value="exerciceData.difficulty" name="difficulty">
        </label>
      </div>
      <div class="input-container"> 
        <label>
          Temps :
        <input type="text" :value="exerciceData.time" name="time">
        </label>
      </div>
      <div class="input-container"> 
        <label>
          Nombre de répétitions :
        <input type="text" :value="exerciceData.repetitions" name="repetitions">
        </label>
      </div>
      <div class="input-container">
        <label> Catégories :
          <select name="categoryId" id="category-select">
            <option value="Choose a category">--Choissez une catégorie--</option>
            <option v-for="category in categoriesData" :key="category.id" :value="category.id">{{ category.name }}</option>
          </select>
        </label>
      </div>
      <button type="submit" class="btn-edition-exercice">Envoyer</button>
    </form>
  </dialog>
</template>

<script lang="ts" >
import { onMounted, ref, toRefs } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { Category } from '../types/Category';

export default {
  name: 'edition-exercice',
  props: {
    exerciceData: { type: Object, default: () => ({}) },
    isOpen: { type: Boolean, required: true },
  },
  emits: ['close', 'fetch-data'],
  setup (props: any, { emit }) {
    const { exerciceData } = toRefs(props);
    const route = useRoute();
    const exerciceId = route.params.exerciceId;
    const categoriesData = ref<Partial<Category[]>>([])

    console.log('exerciceData', exerciceData)

    const handleSubmit = async (e: Event) => {
      const form = e.target as HTMLFormElement;
      const formData = new FormData(form as HTMLFormElement);
      const formJson = (Object as any).fromEntries((formData as any).entries()) as Record<string, number>;

      console.log('edition', formJson);
        try {
          await axios.put(`http://localhost:3001/exercices/${exerciceId}`, formJson);
            toast.success("Vos modifications ont bien été prises en compte !", {
            "theme": "dark", "autoClose": 1500, "transition": "slide", "dangerouslyHTMLString": true });
          emit('close')
          emit('fetch-data')
        } catch (error) {
          console.error("Erreur lors de la modification du produit:", error);
          toast.error("Erreur lors de la modification du produit");
        }
      };

      const fetchCategories = async () => {
        try {
          const response = await axios.get(`http://localhost:3001/categories/`);
          if(response.status === 200) {
            categoriesData.value = response.data;
          } else {
            console.error('Erreur dans la réponse', response.status)
          }
        } catch (error) {
          console.log('Erreur lors de la récupération des données', error)
        }
      };

      onMounted(() => {
        fetchCategories();
      })

  const closeModal = () => emit('close');

  const fetchData = () => emit('fetch-data')

    return {
      // Data
      exerciceData,
      categoriesData,
      // Method
      handleSubmit,
      closeModal,
      fetchData,
    }
  }
}
</script>

<style>
.display-modal-edition-exercice {
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

.display-edition-exercice-form {
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

.btn-edition-exercice {
  margin: 2rem 0;
}

</style>