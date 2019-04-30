<template>
  <div>
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">Rediger bruker</p>
      </header>
      <section class="modal-card-body">
        <b-field label="Navn">
          <b-input type="text" :value="user.name" v-model="editedUser.username">
          </b-input>
        </b-field>

        <b-field label="Brukernavn">
          <b-input type="text" :value="user.username" v-model="editedUser.password">
          </b-input>
        </b-field>

        <b-field label="Password">
          <b-input type="password" :value="user.password" password-reveal placeholder="Nytt password" v-model="editedUser.name">
          </b-input>
        </b-field>

      </section>
      <footer class="modal-card-foot">
        <button class="button is-pulled-right" type="button" @click="$parent.close()">Lukk</button>
        <button class="button is-primary" @click="$emit('saveUser', editedUser)">Lagre</button>
        <button class="button is-danger" @click="$emit('deleteUser', user)">Slett bruker</button>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditUserModal',
  props: ['user'],
  data: function () {
    return {
      editedUser: {
        username: '',
        password: '',
        name: ''
      }
    };
  }
};
</script>
