<template>
  <section class="display-exercices-card">
    <h1>{{ name }}</h1>
    <p>{{ difficulty }}</p>
    <p>{{ category }}</p>
  </section>
</template>

<script>
export default {
  props: {
    id: { type: Number, required: true},
    name : { type: String, required: true },
    difficulty: { type: String, required: true},
    category: { type: String, required: true},
  },
  setup () {
    return {
    }
  },
};
</script>

<style>
.display-exercices-card {
    border: 1px solid white;
    border-radius: 10px;
    padding: 1rem;
  }
</style>