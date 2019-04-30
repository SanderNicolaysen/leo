<template>
  <div>
    <h3 class="title is-size-3">Brukere</h3>

    <div class="box">
       <button class="button is-primary block" type="button" @click="AddUserModal()">
          <b-icon icon="pencil"></b-icon>
          <span>Opprett ny bruker</span>
      </button>

      <table class="table is-striped is-narrow is-hoverable is-fullwidth">
        <thead>
          <tr>
            <th>Navn</th>
            <th>Brukernavn</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{user.name}}</td>
            <td>{{user.username}}</td>
            <td v-if="isAdmin">
                <a>
                  <span class="icon" @click="EditUserModal(user)">
                    <b-tooltip label="Rediger">
                      <b-icon type="is-dark" icon="pencil" size="is-small"></b-icon>
                    </b-tooltip>
                  </span>
                </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import EditUserModal from '@/components/EditUserModal';
import AddUserModal from '@/components/AddUserModal';
import Auth from '@/services/Auth';
import _ from 'lodash';

export default {
  name: 'users',
  components: {

  },
  data () {
    return {
      users: [
        { id: 0, username: 'Bob', name: 'Bob Smith', password: 'password' },
        { id: 1, username: 'Bob', name: 'Smith', password: 'password' }
      ],
      isAdmin: true
    };
  },
  methods: {
    EditUserModal (user) {
      this.$modal.open({
        parent: this,
        component: EditUserModal,
        props: { user },
        events: {
          deleteUser: this.deleteUser,
          saveUser: this.saveUser
        }
      });
    },
    AddUserModal () {
      this.$modal.open({
        parent: this,
        component: AddUserModal,
        props: {},
        events: {
          addUser: this.addUser
        }
      });
    },
    deleteUser (user) {
      this.$dialog.confirm({
        title: 'Sletter bruker',
        message: 'Er du sikker på at du vill slette kontoen? Dette kan ikke tilbakestilles.',
        confirmText: 'Slett bruker',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => {
          this.users = _.filter(this.users, o => { return o !== user; });
          this.$toast.open('Bruker slettet!');
        }
      });
    },
    saveUser (user) {
      console.log(this.users[_.findIndex(this.users, o => { return o === user; })]);
      console.log(user);
    },
    async addUser (user) {
      await Auth.register(user);
      this.$toast.open('La til ny bruker');
    }
  }
};
</script>
