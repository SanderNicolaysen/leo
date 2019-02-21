<template>
  <div class="wrapper">
    <!-- NAVBAR -->
    <!-- TODO: Create component for navbar and nest it globally instead? -->
    <nav class="navbar block" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item">
          <router-link to="/"><img src="./assets/icons/politilogo.jpg" width="38" height="35"></router-link>
        </a>
        <span role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navMenu">
          <span></span>
          <span></span>
          <span></span>
        </span>
      </div>

      <!-- Shows the nodejs servers test API response -->
      <div id="navMenu" class="navbar-menu">
        <div class="navbar-start">
          <router-link to="/"><a class="navbar-item is-uppercase is-size-3 has-text-gret-dark">POLITIVAKTA</a></router-link>
        </div>

        <div class="navbar-end">
          <a class="navbar-item" @click="changeLocale('no')">
            <img src="./assets/icons/norway.svg" alt="country-Norway" width="50" height="60">
          </a>
          <a class="navbar-item" @click="changeLocale('en')">
            <img src="./assets/icons/uk.svg" alt="country-UK" width="50" height="60">
          </a>
        </div>
      </div>
    </nav>

    <router-view />
  </div>
</template>

<style lang="scss">

</style>

<script>
import i18n from './lang/i18n'

export default {
  name: 'app',
  methods: {
    changeLocale (locale) {
      i18n.locale = locale
    }
  }
}
</script>
