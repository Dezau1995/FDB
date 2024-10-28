<template class="display-signin-page">
  <section>
  <h1>Inscrit Toi</h1>
  <form class="display-form-signin" @submit.prevent="handleSubmit">
    <div class="form-signin">
      <label>
        Prénom :
        <input type="text" name="firstname" v-model="firstname" placeholder="Prénom">
      </label>
    </div>
    <div class="form-signin">
      <label>
        Nom :
        <input type="text" name="lastname" v-model="lastname" placeholder="Nom">
      </label>
    </div>
  <div class="form-signin">
    <label>
      Email :
      <input type="text" name="Email" v-model="email" placeholder="john@doe.com">
    </label>
  </div>
  <div class="form-signin">
    <label>
      Mot de passe :
      <input type="password" name="password" v-model="password" placeholder="******">
    </label>
  </div>
  <div class="form-signin">
    <button class="btn-signin" type="submit">Inscription</button>
  </div>
</form>
  <section class="section-redirection-login">
  <p>Déjà inscrit ?</p>
  <p @click="goToLogin" class="redirection-login">Connecte toi !</p>
</section>
</section>
</template>

<script>
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'signin',
  setup () {
    const firstname = ref('');
    const lastname = ref('');
    const email = ref('');
    const password = ref('');
    const router = useRouter();


    const handleSubmit = async () => {
      const response = await axios.post('http://localhost:3001/users/', {
        firstname: firstname.value,
        lastname: lastname.value,
        email: email.value,
        password: password.value,
        role: ["client"],
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      localStorage.setItem('authToken', response.headers['authorization']);
      return response.data;
    };
  
    const goToLogin = () => router.push("/login");



    return {
      firstname,
      lastname,
      email,
      password,
      handleSubmit,
      goToLogin,
    }
  }
}
</script>

<style>
.display-signin-page {
 display: flex;
 justify-content: center;
}

.display-form-signin {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50vw;
}

.form-signin {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60%;
  margin: 0.25rem;
}

.btn-signin {
  border-radius: 5px;
  cursor: pointer;
}

.section-redirection-login {
  display: flex;
  gap: 0.5rem;
}

.redirection-login {
  color: var(--details-color);
  cursor: pointer;
}
</style>