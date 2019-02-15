<template>
  <div>
    <div class="container">
      <div class="block has-text-centered">
        <button class="button is-success is-size-2 is-uppercase">Trekk kølapp</button>
      </div>

      <div class="notification is-info">
        <button class="delete"></button>
        <p class="has-text-centered is-size-5">Eller, gjør noen steg selv slik at vi kan hjelpe deg raskere! <br>
          Begynn med å velge henvedelse under</p>
      </div>

      <div class="columns">
        <div class="column">
          <Box v-bind:title="'Pass'" />
        </div>
        <div class="column">
          <Box v-bind:title="'Anmelde tyveri eller skadeverk'" />
        </div>
        <div class="column">
          <Box v-bind:title="'Hente beslag'" />
        </div>
      </div>

      <div class="columns">
        <div class="column">
          <Box v-bind:title="'Bot'" />
        </div>
        <div class="column">
          <Box v-bind:title="'Våpen'" />
        </div>
        <div class="column">
          <Box v-bind:title="'Avhør'" />
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
  mounted: function () {
    let self = this

    // Do a GET request on the test API
    TestService.test().then(function (response) {
      self.testText = response.data.text
    })
  },
  components: {
    Box
  }
}
</script>

<style lang="scss">
@import "../assets/sass/start.scss";
</style>
