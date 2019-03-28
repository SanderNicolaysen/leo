<template>
  <div class="hero is-fullheight-with-navbar">
    <navbar />
    <div class="hero-body">
      <div class="container">
        <h4 class="title has-text-centered is-4">
          Vennligst velg en kategori slik at vi kan hjelpe deg raskere:
        </h4>
        <div class="columns">
          <div class="column">
            <router-link to="/pass/First">
              <Box :title="$t('pass')" :text="$t('passTekst')" icon="<img src='/icons/sharp-person.svg'/>" />
            </router-link>
          </div>
          <div class="column">
            <router-link to="/anmelde/1">
              <Box :title="$t('anmeldeTyveri')" :text="$t('anmeldeTyveriTekst')" icon="<img src='/icons/pickpocketing.svg'/>" />
            </router-link>
          </div>

          <div class="column">
            <router-link to="/henteLevere/First">
              <Box :title="$t('henteLevere')" :text="$t('henteLevereTekst')" icon="<img src='/icons/round-business_center.svg'/>" />
            </router-link>
          </div>
        </div>

        <div class="columns">
          <div class="column">
            <router-link to="/userAppointment">
              <Box :title="$t('meldeplikt')" :text="$t('meldepliktTekst')" icon="<img src='/icons/round-access_time.svg'/>" />
            </router-link>
          </div>
          <div class="column">
            <Box :title="$t('annet')" :text="$t('annetTekst')" icon="<img src='/icons/round-help_outline.svg'/>" />
          </div>
          <div class="column">
            <router-link to="/garantiskjema/First">
              <Box :title="$t('garantiskjema')" :text="$t('garantiskjemaTekst')" icon="<img src='/icons/round-help_outline.svg'/>" />
            </router-link>
          </div>
        </div>
        </div>
      </div>
      <div class="hero-footer has-text-centered">
        <h4 class="title is-4">
          Eller:
        </h4>
        <button v-on:click="$router.push({ name: 'grabticket' })" class="button is-link is-size-3">{{ $t('trekkKølapp') }}</button>
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
