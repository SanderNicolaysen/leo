<template>
  <div>
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">Rediger bruker</p>
        <button class="delete" aria-label="delete" @click="$parent.close()"></button>
      </header>
      <section class="modal-card-body">
        <b-field label="Navn">
          <b-input type="text" value="user.name" v-model="user.name">
          </b-input>
        </b-field>

        <b-field label="Brukernavn">
          <b-input type="text" value="user.username" v-model="user.username">
          </b-input>
        </b-field>

        <b-field label="Nytt password">
          <b-input type="password" password-reveal placeholder="Nytt password" v-model="user.newPassword"></b-input>
        </b-field>

      </section>
      <footer class="modal-card-foot">
        <button class="button is-primary" @click="$emit('updateUser', user, $parent)">Lagre</button>
        <button class="button is-danger" @click="$emit('deleteUser', user, $parent)">Slett bruker</button>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditUserModal',
  props: ['user'],
  created: function () {
    this.$props.user.newPassword = '';
  }
};
</script>
