<template>
  <section>
  <h1>Todos list</h1>
  <form action="" @submit.prevent="addTask">
    <fieldset action="group">
    <input type="text" placeholder="Ajoute une tache" v-model="inputValue">
    <button :disabled="inputValue.length === 0">Ajouter</button>
  </fieldset>
  </form>
  <p v-show="tasks >= 0">Vous n'avez pas de taches a faire !</p>
  <ul>
    <li
    v-for="task in sortedTasks"
    :key="task.date"
    :class="{done: task.completed}"> {{ task.title }}
    <input type="checkbox" v-model="task.completed"/>
  </li>
  </ul>
  <label>
    <input type="checkbox" v-model="hideTasksCompleted">
    Masquer les taches completees
  </label>
  <p v-if="remainingTasks > 0">{{ remainingTasks }} tache{{ remainingTasks > 1 ? 's' : '' }} a faire !</p>
</section>
  </template>
<script>
import { computed, ref } from 'vue';

export default {
  name: "todo-page",
   setup () {
    const inputValue = ref('');
    const hideTasksCompleted = ref(false)

  const tasks = ref([
  {title: 'Tache de test',
  completed: true,
  date: 1
  }, {
    title: 'Tache a faire',
    completed: false,
    date: 2,
  }
]);

const addTask = () => {
  tasks.value.push({
    title: inputValue.value,
    completed: false,
    date: Date.now(),
  });
  inputValue.value = '';
}

const sortedTasks = computed(() => {
  // [...tasks.value]
 const sortedTasks = tasks.value.toSorted((a, b) => a.completed > b.completed ? 1 : -1);
 if(hideTasksCompleted.value === true) {
  return sortedTasks.filter(task => task.completed === false)
 }
 return sortedTasks;
});

const remainingTasks = computed(() => {
  return tasks.value.filter(task => task.completed === false).length
});

return {
  // Data
  inputValue,
  tasks,
  hideTasksCompleted,
  // Methods
addTask,
// Computed
sortedTasks,
remainingTasks,
};
},
};

</script>

<style scoped>
h1{
  color: red;
}
.done{
opacity: .5;
text-decoration-line: line-through;
}
@media (min-width: 1024px) {
}
</style>