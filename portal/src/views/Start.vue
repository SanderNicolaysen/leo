<template>
  <div>
    <div class="container">
      <div class="block has-text-centered">
        <button v-on:click="$router.push({ name: 'grabticket' })" class="button is-success is-size-2 is-uppercase">{{ $t('trekkKølapp') }}</button>
      </div>

      <div class="notification is-info">
        <button class="delete"></button>
        <p class="has-text-centered is-size-5">{{ $t('doSomeStepsTop') }} <br>
          {{ $t('doSomeStepsBottom') }}</p>
      </div>

      <div class="columns">
        <div class="column">
          <Box :title="$t('pass')" />
        </div>
        <div class="column">
          <router-link to="/subcategory"><Box :title="$t('anmeldeTyveri')"/></router-link>
        </div>
        <div class="column">
          <Box :title="$t('henteBeslag')" />
        </div>
      </div>

      <div class="columns">
        <div class="column">
          <Box :title="$t('bot')" />
        </div>
        <div class="column">
          <Box :title="$t('våpen')" />
        </div>
        <div class="column">
          <Box :title="$t('avhør')" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src, Example:
import Box from '@/components/Box.vue'
import TestService from '@/services/TestService.js'

export default {
  name: 'start',
  data: function () {
    return {
      testText: ''
    }
  },
  created: async function () {
    // Do a GET request on the test API
    this.testText = await TestService.test()
  },
  components: {
    Box
  }
}
</script>

<style lang="scss">
@import "../assets/sass/start.scss";
</style>
