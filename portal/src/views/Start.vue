<template>
  <div>
    <div class="container">
      <div class="block has-text-centered">
        <button v-on:click="$router.push({ name: 'grabticket' })" class="button is-success is-size-2 is-uppercase">{{ $t('trekkKølapp') }}</button>
      </div>

      <div class="notification is-info">
        <button class="delete"></button>
        <p class="has-text-centered is-size-5">{{ $t('gjørNoenSteg') }} <br>
          {{ $t('velgTypeHenvendelse') }}</p>
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

export default {
  name: 'start',
  data: function () {
    return {
      testText: ''
    }
  },
  created: async function () {
    // Delete any incomplete inquiry if it exists
    this.$inquiry.clear()
  },
  components: {
    Box
  }
}
</script>

<style lang="scss">
@import "../assets/sass/start.scss";
</style>
