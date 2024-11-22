<template>
  <section class="display-login-page">
  <h1>Connexion</h1>
  <form @submit.prevent="handleSubmit" class="display-form-login">
    <div class="form-login">
    <label>
      Email :
      <input type="email" name="email" v-model="email" placeholder="john.doe@gmail.com"/>
    </label>
   </div>
    <div class="form-login">
    <label>
      Password :
      <input type="password" name="password" v-model="password" placeholder="******"/>
    </label>
  </div>
  <div class="form-login">
  <button class="btn-login" type="submit">Connexion</button>
</div>
  </form>
  <section class="section-redirection-sign-in">
  <p>Tu n'as pas encore de compte ?</p>
  <p @click="goToSignIn" class="redirection-sign-in">Inscris toi !</p>
</section>
</section>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  name: 'login',
  setup () {
    const email = ref('');
    const password = ref('');
    const router = useRouter();
    const store = useStore();

    const handleSubmit = async () => {
      await store.dispatch('login', { email: email.value, password: password.value})
    };

    const goToSignIn = () => router.push('/signin');

    return {
      email,
      password,
      handleSubmit,
      goToSignIn,
    };
  },
};
</script>

<style>
.display-login-page {
 display: flex;
 flex-direction: column;
 justify-content: center;
 align-items: center;
}

.display-form-login {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50vw;
}

.form-login {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60%;
  margin: 0.25rem;
}

.btn-login {
  border-radius: 5px;
  cursor: pointer;
}

.section-redirection-sign-in {
  display: flex;
  gap: 0.5rem;
}

.redirection-sign-in {
  color: var(--details-color);
  cursor: pointer;
}
</style>