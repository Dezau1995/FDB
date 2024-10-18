<template class="display-login-page">
  <h1>Connexion</h1>
  <form @submit.prevent="handleSubmit" class="display-form-login">
    <div class="form-login">
    <label>
      Email :
      <input type="text" name="email" v-model="email" placeholder="john.doe@gmail.com"/>
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
</template>

<script>
import axios from 'axios';
import { ref } from 'vue';

export default {
  name: 'login',
  setup () {
    const email = ref('');
    const password = ref('');

    const handleSubmit = async () => {
      const response = await axios.post('http://localhost:3001/users/login', {
      email: email.value,
      password: password.value,
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

 
        localStorage.setItem('authToken', response.headers['authorization']);
    return response.data; // Renvoie les informations utilisateur
}
    return {
      email,
      password,
      handleSubmit,
    };
  },
};
</script>

<style>
.display-login-page {
 display: flex;
 justify-content: center;
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

.btn-login{
  border-radius: 5px;
}

</style>