<template>
  <div v-if="user">
    <!-- START NAV -->
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="/dashboard/#/">
          Oslo politidistrikt - Politivakta, Grønland
        </a>

        <a role="button" class="navbar-burger burger"  @click.prevent="navbarToggle = !navbarToggle" :class="{ 'is-active': navbarToggle }">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" class="navbar-menu" :class="{ 'is-active': navbarToggle }">
        <div class="navbar-end">
          <div class="navbar-item">Logget inn som {{ user.username }}</div>
          <div class="navbar-item">
            <div class="buttons">
              <button class="button is-light" @click="logout">
                Logg ut
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <!-- END NAV -->
    <div class="container">
      <div class="columns">
        <div class="column is-3 ">
          <aside class="menu is-hidden-mobile">
            <p class="menu-label">
              Oversikt
            </p>
            <ul class="menu-list">
              <li><router-link :to="{ name: 'dashboard' }">Dashboard</router-link></li>
              <li><router-link :to="{ name: 'booth' }">Skranke/køvisning</router-link></li>
            </ul>
            <p class="menu-label">
              Administrasjon
            </p>
            <ul class="menu-list">
              <li><router-link :to="{ name: 'adminFaq' }">Rediger FAQ</router-link></li>
              <li><router-link :to="{ name: 'appointments' }">Timeavtaler</router-link></li>
              <li><router-link :to="{ name: 'formseditor' }">Skjemaer</router-link></li>
              <li><router-link :to="{ name: 'queuepriorities' }">Køprioritering</router-link></li>
            </ul>
          </aside>
        </div>
        <div class="column is-9">

          <!-- Child views will be rendered here! -->
          <router-view />

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Auth from '@/services/Auth.js';

export default {
  name: 'DashboardLayout',
  data: function () {
    return {
      navbarToggle: false,
      user: null
    };
  },
  methods: {
    logout: async function () {
      await Auth.logout();
      this.$router.push({ name: 'login' });
    }
  },
  created: async function () {
    const user = await Auth.user();
    if (!user) {
      this.$router.push({ name: 'login' });
    }
    this.user = user;
  }
};
</script>
