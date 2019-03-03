<template>
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="column is-4 is-offset-4">
          <h3 class="title has-text-grey">Login</h3>
          <p class="subtitle has-text-grey">Please login to proceed.</p>
          <form method="POST" action="http://localhost:8081/login">
            <div class="box">
              <div class="field">
                <div class="control">
                  <input name="username" class="input is-large" type="text" placeholder="Brukernavn" autofocus="" v-model="username">
                </div>
              </div>

              <div class="field">
                <div class="control">
                  <input name="password" class="input is-large" type="password" placeholder="Passord" v-model="password">
                </div>
              </div>
              <div class="field">
                <label class="checkbox">
                  <input type="checkbox">
                  Husk meg
                </label>
              </div>
              <button class="button is-block is-info is-large is-fullwidth" @click="submit">Logg inn</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data: function () {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    submit: function () {
      console.log(this.username, this.password);
    }
  }
};
</script>
