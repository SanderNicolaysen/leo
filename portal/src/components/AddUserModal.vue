<template>
  <div>
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">Legg til ny bruker</p>
      </header>
      <section class="modal-card-body">
        <b-field label="Navn">
          <b-input type="text" placeholder="Fornavn Etternavn" value="" required v-model="user.name">
          </b-input>
        </b-field>

        <b-field label="Brukernavn">
          <b-input type="text" placeholder="Nytt brukernavn" value="" required v-model="user.username">
          </b-input>
        </b-field>

        <b-field label="Password">
          <b-input type="password" placeholder="Nytt password" value="" v-model="user.password" password-reveal required>
          </b-input>
        </b-field>

      </section>
      <footer class="modal-card-foot">
        <button class="button" type="button" @click="$parent.close()">Lukk</button>
        <button class="button is-primary" @click="$emit('addUser', user)">Opprett ny bruker</button>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddUserModal',
  props: [],
  data: function () {
    return {
      user: {
        username: '',
        password: '',
        name: ''
      }
    };
  }
};
</script>
