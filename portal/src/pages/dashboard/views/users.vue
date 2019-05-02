<template>
  <div>
    <h3 class="title is-size-3">Brukere</h3>

    <div class="box">
       <button class="button is-primary block" type="button" @click="AddUserModal()" v-if="isAdmin">
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
          <tr v-for="user in users" :key="user._id">
            <td><b-icon v-if="user.isAdmin" icon="star" type="is-warning" size="is-small"></b-icon>{{user.name}}</td>
            <td>{{user.username}}</td>
            <template v-if="isAdmin && user._id !== loggedInUser._id">
              <td>
                <a>
                  <span class="icon" @click="EditUserModal(user)">
                    <b-tooltip label="Rediger">
                      <b-icon type="is-dark" icon="pencil" size="is-small"></b-icon>
                    </b-tooltip>
                  </span>
                </a>
            </td>
            </template>
            <template v-else>
              <td></td>
            </template>
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
      users: [],
      loggedInUser: null,
      isAdmin: false
    };
  },
  created: async function () {
    this.loggedInUser = await Auth.user();
    this.users = await Auth.getUsers();
    if (this.loggedInUser.isAdmin) {
      this.isAdmin = true;
    }
  },
  methods: {
    EditUserModal (user) {
      this.$modal.open({
        parent: this,
        component: EditUserModal,
        props: { user },
        events: {
          deleteUser: this.deleteUser,
          updateUser: this.updateUser
        },
        canCancel: ['escape', 'outside']
      });
    },
    AddUserModal () {
      this.$modal.open({
        parent: this,
        component: AddUserModal,
        props: {},
        events: {
          addUser: this.addUser
        },
        canCancel: ['escape', 'outside']
      });
    },
    deleteUser (user, self) {
      this.$dialog.confirm({
        title: 'Sletter bruker',
        message: 'Er du sikker på at du vill slette kontoen? Dette kan ikke tilbakestilles.',
        confirmText: 'Slett bruker',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: async () => {
          const res = await Auth.delete(user._id);
          if (res instanceof Error) {
            this.danger(`Du kan ikke slette admin`);
            return;
          }
          this.users = _.filter(this.users, o => { return o._id !== user._id; });
          this.$toast.open('Bruker slettet!');
          self.close();
        }
      });
    },
    async updateUser (user, self) {
      const res = await Auth.update(user._id, user);
      if (res instanceof Error) {
        this.danger(`Det skjedde en feil. Husk at alle brukernavn må være unike`);
        return;
      }

      this.users[_.findIndex(this.users, o => { return o._id === user._id; })] = user;
      self.close();
    },
    async addUser (user, self) {
      const res = await Auth.register(user);
      if (res instanceof Error) {
        this.danger(`Det skjedde en feil. Husk at alle brukernavn må være unike og alle felt må være fylt ut`);
        return;
      }
      this.users.push(res);
      this.$toast.open('La til ny bruker');
      self.close();
    },
    danger (messageText) {
      this.$toast.open({
        duration: 5000,
        message: messageText,
        position: 'is-bottom',
        type: 'is-danger'
      });
    }
  }
};
</script>
