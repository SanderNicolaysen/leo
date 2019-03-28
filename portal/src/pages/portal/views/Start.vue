<template>
  <div class="hero is-fullheight-with-navbar">
    <navbar />
    <div class="hero-body">
      <div class="container">
        <h4 class="title has-text-centered is-4">
          {{ $t('please-choose-category') }}
        </h4>
        <div class="columns">
          <div class="column">
            <router-link :to="{name: 'anmelde', params: { page: '1' } }">
              <Box :title="$t('anmelde')" :text="$t('anmeldeTekst')" icon="<img src='/icons/pickpocketing.svg'/>" />
            </router-link>
          </div>
          <div class="column">
            <router-link :to="{name: 'userAppointments', params: { page: '1' } }">
              <Box :title="$t('timeavtale')" :text="$t('timeavtaleTekst')" icon="<img src='/icons/round-access_time.svg'/>" />
            </router-link>
          </div>

          <div class="column">
            <router-link :to="{name: 'henteLevere', params: { page: '1' } }">
              <Box :title="$t('hentelevere')" :text="$t('hentelevereTekst')" icon="<img src='/icons/round-business_center.svg'/>" />
            </router-link>
          </div>
        </div>

        <div class="columns">
          <div class="column">
            <router-link :to="{name: 'garantiskjema', params: { page: '1' } }">
              <Box :title="$t('garantiskjema')" :text="$t('garantiskjemaTekst')" icon="<img src='/icons/baseline-list_alt.svg'/>" />
            </router-link>
          </div>
          <div class="column">
            <router-link :to="{name: 'pass', params: { page: '1' } }">
              <Box :title="$t('pass')" :text="$t('passTekst')" icon="<img src='/icons/sharp-person.svg'/>" />
            </router-link>
          </div>
          <div class="column">
            <router-link :to="{name: 'grabticket' }">
              <Box :title="$t('annet')" :text="$t('annetTekst')" icon="<img src='/icons/round-help_outline.svg'/>" />
            </router-link>
          </div>
        </div>
        </div>
      </div>
      <div class="hero-footer has-text-centered">
        <h4 class="title is-4">
          {{ $t('eller') }}
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
