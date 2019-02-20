<template>
  <div>
    <div class="container">
      <div class="block has-text-centered">
        <button v-on:click="$router.push({ name: 'grabticket' })" class="button is-success is-size-2 is-uppercase">{{ $t('trekkKølapp') }}</button>
      </div>

      <div class="notification is-info">
        <button class="delete"></button>
        <p class="has-text-centered is-size-5">Eller, gjør noen steg selv slik at vi kan hjelpe deg raskere! <br>
          Begynn med å velge henvedelse under</p>
      </div>

      <div class="columns">
        <div class="column">
          <Box title='Pass' />
        </div>
        <div class="column">
          <router-link to="/subcategory"><Box title='Anmelde tyveri eller skadeverk'/></router-link>
        </div>
        <div class="column">
          <Box title='Hente beslag' />
        </div>
      </div>

      <div class="columns">
        <div class="column">
          <Box title='Bot' />
        </div>
        <div class="column">
          <Box title='Våpen' />
        </div>
        <div class="column">
          <Box title='Avhør' />
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
