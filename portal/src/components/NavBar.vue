<template>
 <!-- NAVBAR -->
    <nav class="navbar block" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
          <router-link class="navbar-item is-large" to="/">
            <img src="@/assets/icons/politilogo.svg">
          </router-link>
        </div>
      <div id="navMenu" class="navbar-menu">
        <div class="navbar-end">
          <a class="navbar-item" @click="changeLocale('no')">
            <img src="@/assets/icons/norway.svg" alt="country-Norway" width="50" height="60">
          </a>
          <a class="navbar-item" @click="changeLocale('en')">
            <img src="@/assets/icons/uk.svg" alt="country-UK" width="50" height="60">
          </a>
        </div>
      </div>
    </nav>
</template>

<script>
import i18n from '../lang/i18n';

export default {
  name: 'navbar',
  methods: {
    changeLocale (locale) {
      i18n.locale = locale;
    }
  }
};
</script>

<style>
.navbar-brand img {
  height: 3em;
}
</style>
