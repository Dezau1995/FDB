<template class="display-login-page">
  <h1>Connexion</h1>
  <form class="display-form-login">
    <div class="form-login">
    <label>
      Email :
      <input type="text" name="email" placeholder="john.doe@gmail.com"/>
    </label>
  </div>
    <div class="form-login">
    <label>
      Password :
      <input type="text" name="password" placeholder="******"/>
    </label>
  </div>
  <div class="form-login">
  <button class="btn-login" type="submit">Connexion</button>
</div>
  </form>
</template>

<script>
export default {
  name: 'login',

}
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