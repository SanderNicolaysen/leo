<template>
  <div>
    <navbar />
    <div class="container">
      <div class="block has-text-centered">
        <button v-on:click="$router.push({ name: 'grabticket' })" class="button is-success is-size-2 is-uppercase">{{ $t('trekkKølapp') }}</button>
      </div>

      <div class="notification is-info">
        <p class="has-text-centered is-size-5">{{ $t('gjørNoenSteg') }} <br>
          {{ $t('velgTypeHenvendelse') }}</p>
      </div>

      <div class="columns">
        <div class="column">
          <Box :title="$t('pass')" :text="$t('passTekst')" icon="<img src='/icons/sharp-person.svg'/>" />
        </div>
        <div class="column">
          <router-link to="/subcategory">
            <Box :title="$t('anmeldeTyveri')" :text="$t('anmeldeTyveriTekst')" icon="<img src='/icons/pickpocketing.svg'/>" />
          </router-link>
        </div>
        <div class="column">
          <router-link to="/lost-found"><Box :title="$t('hittegods')" :text="$t('hittegodsTekst')" icon="<img src='/icons/round-business_center.svg'/>" /></router-link>
        </div>
      </div>

      <div class="columns">
        <div class="column">
          <Box :title="$t('meldeplikt')" :text="$t('meldepliktTekst')" icon="<img src='/icons/round-access_time.svg'/>" />
        </div>
        <div class="column">
          <Box :title="$t('ferdigskrevneSaker')" :text="$t('ferdigskrevneSakerTekst')" icon="<img src='/icons/baseline-list_alt.svg'/>" />
        </div>
        <div class="column">
          <Box :title="$t('annet')" :text="$t('annetTekst')" icon="<img src='/icons/round-help_outline.svg'/>" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src, Example:
import Box from '@/components/Box.vue';

export default {
  name: 'start',
  data: function () {
    return {
      testText: ''
    };
  },
  created: async function () {
    // Delete any incomplete inquiry if it exists
    this.$inquiry.clear();
  },
  components: {
    Box
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/sass/start.scss";
</style>
