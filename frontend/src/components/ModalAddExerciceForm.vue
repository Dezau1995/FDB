<template>
  <dialog class="display-modal-add-exercice" v-if="isOpen" @close="closeModal">
    <button type="button" @click="closeModal">Annuler</button>
    <form @submit.prevent="handleSubmit">
      <label>
        Nom :
        <input class="text-field" type="text" name="name" />
      </label>
      <label>
        Description :
        <input class="text-field" type="text" name="description" />
      </label>
      <label>
        Difficultée :
        <input type="text" name="difficulty" />
      </label>
      <label>
        Durée :
        <input type="text" name="time" />
      </label>
      <label>
        Équipement :
        <input type="text" name="equipement" />
      </label>
      <label>
        Nombre de répetitions :
        <input type="text" name="repetitions" />
      </label>
      <label>
        Créer :
        <input type="text" name="createdAt" />
      </label>

      <button>Ajouter l'exercice !</button>
    </form>
  </dialog>
</template>

<script>
import axios from 'axios';

export default {
  name: 'add-exercice',
  props: {
    isOpen: { type: Boolean, required: true },
  },
  emits: ['close'],
  setup(_, { emit }) {
    const handleSubmit = (e) => {
      e.preventDefault();
      const form = e.target;
      const formData = new FormData(form);
      const formJson = Object.fromEntries(formData.entries());

      axios.post(`http://localhost:3001/exercices/`, formJson)
        .then(() => {
          emit('close');
        });
    };

    const closeModal = () => {
      emit('close');
    };

    return {
      handleSubmit,
      closeModal,
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
  top: 0;
  width: 100vw;
  height: 100vh;
  padding: 1.5rem;
  color: #2D2D2D;
  background-color: #F0F0F0;
  box-shadow: var(--secondary-color) 0 0 10px 0;
  z-index: 9999;
}
</style>
