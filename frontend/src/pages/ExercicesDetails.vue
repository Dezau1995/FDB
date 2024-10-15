<template>
  <section class="display-exercice-page">
    <button class="btn-trash" @click="handleDelete">
      <img class="icon-trash" src="../assets/icon-trash.png" alt="trash">
    </button>
    <form @submit="handleSubmit" class="display-exercice-details-form">
      <h1 v-if="!edit">{{ exerciceDetailsData.name }}</h1>
      <label v-else>
        Nom de l'exercice :
        <input type="text" :value="exerciceDetailsData.name" name="name">
      </label>
      <p v-if="!edit">{{ exerciceDetailsData.description }}</p>
      <label v-else>
        Description:
        <input type="text" :value="exerciceDetailsData.descritpion" name="description">
      </label>
      <p v-if="!edit">{{ exerciceDetailsData.difficulty }}</p>
      <label v-else>
        Difficulté :
        <input type="text" :value="exerciceDetailsData.difficulty" name="difficulty">
      </label>
      <p v-if="!edit">{{ exerciceDetailsData.time }}</p>
      <label v-else>
        Temps :
        <input type="text" :value="exerciceDetailsData.time" name="time">
      </label>
      <p v-if="!edit">{{ exerciceDetailsData.repetitions }}</p>
      <label v-else>
        Nombre de répétitions :
        <input type="text" :value="exerciceDetailsData.repetitions" name="repetitions">
      </label>
    <button type="submit" v-if="edit">{{ btnValue }}</button>
  </form>
  <button type="button" @click="handleBtnValue" v-if="!edit">{{btnValue}}</button>
</section>
</template>

<script>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
name: 'exercice-details',
setup () {
  const error = ref(null);
  const exerciceDetailsData = ref({});
  const route = useRoute();
  const router = useRouter();
  const exerciceId = route.params.exerciceId;
  const edit = ref(false);
  const btnValue = ref("Éditer");

  const handleBtnValue = () => {
    edit.value = !edit.value;
    btnValue.value = edit.value ? "Envoyer" : "Éditer" ;
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/exercices/${exerciceId}`)
      if(response.status === 200) {
        exerciceDetailsData.value = response.data;
      } else {
        console.error('Erreur dans la réponse', response.status);
      }
    } catch (error) {
      error.value = 'Erreur lors de la récupération des données';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    try {
      await axios.put(`http://localhost:3001/exercices/${exerciceId}`, formJson);
      edit.value = false;
      btnValue.value = "Éditer";
      toast.success("Vos modifications ont bien été prises en compte !", {
      "theme": "dark",
      "type": "default",
      "autoClose": 1500,
      "transition": "slide",
      "dangerouslyHTMLString": true
      });
      await fetchData();
    } catch (error) {
      console.error("Erreur lors de la modification du produit:", error);
      toast.error("Erreur lors de la modification du produit");
    }
  };

  const handleDelete = async () => {
    await axios.delete(`http://localhost:3001/exercices/${exerciceId}`)
    router.push("/")
  }

  onMounted(() => {
    fetchData()
  });

  return {
    btnValue,
    edit,
    handleBtnValue,
    exerciceDetailsData,
    error,
    handleSubmit,
    handleDelete,
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
  /* top: 0; */
  right: 5%;
  background-color: transparent;
  border: none;
  color: none;
  width: 10%;
  cursor: pointer;
}

.icon-trash {
  width: 100%;
  color: white;
}

.display-exercice-details-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}


</style>