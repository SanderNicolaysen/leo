<template>
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="column is-4 is-offset-4">
          <h3 class="title has-text-grey">Logg inn</h3>
          <p class="subtitle has-text-grey">Vennligst logg inn for å fortsette</p>
          <form v-on:submit.prevent="submit">
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
              <button class="button is-block is-info is-large is-fullwidth" type="submit">Logg inn</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios';

export default {
  data: function () {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    submit: async function () {
      try {
        const res = await axios.post('/login', { username: this.username, password: this.password });
        if (res.status === 200) {
          this.$router.push({ name: 'dashboard' });
        }
      } catch (error) {
        alert('Feil passord eller brukernavn.');
      }
    }
  }
};
</script>
