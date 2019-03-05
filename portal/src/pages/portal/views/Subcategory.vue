<template>
  <div>
    <navbar />
    <div class="container">
      <h1 class="title has-text-centered is-uppercase">{{ $t('anmeldeTyveri') }}</h1>

      <div class="columns">
        <div class="column">
          <router-link to="/skjema/forenklet-anmeldelse"><Box title='Mobiltelefon' /></router-link>
        </div>
        <div class="column">
          <router-link to="/skjema/forenklet-anmeldelse"><Box title='Sykkel' /></router-link>
        </div>
        <div class="column">
          <router-link to="/skjema/forenklet-anmeldelse"><Box title='ID-tyveri' /></router-link>

        </div>
        <div class="column">
          <router-link to="/skjema/forenklet-anmeldelse"><Box title='Skade på eiendom' /></router-link>
        </div>
      </div>

      <div class="columns">
        <div class="column">
          <router-link to="/skjema/forenklet-anmeldelse"><Box title='Mobiltelefon' /></router-link>
        </div>
        <div class="column">
          <router-link to="/skjema/forenklet-anmeldelse"><Box title='Sykkel' /></router-link>
        </div>
        <div class="column">
          <router-link to="/skjema/forenklet-anmeldelse"><Box title='ID-tyveri' /></router-link>
        </div>
        <div class="column">
          <router-link to="/skjema/forenklet-anmeldelse"><Box title='Skade på eiendom' /></router-link>
        </div>
      </div>

      <div class="block has-text-centered">
        <router-link to="/grabticket"><button class="button is-success is-size-4 is-uppercase">{{ $t('trekkKølapp') }}</button></router-link>
      </div>

      <Faq :items="faqs" title="Visste du at" text="Noen anmeldelser kan utføres via politiets nettsider hjemmefra, slik at du slipper å møte opp på politivakta. <br>
                               Anmeldelse kan utføres hjemme dersom"/>
    </div>
  </div>
</template>

<script>
import Box from '@/components/Box.vue';
import Faq from '@/components/Faq.vue';

import Faqs from '@/services/Faqs.js';

export default {
  components: {
    Box,
    Faq
  },
  data () {
    return {
      faqs: [],
      title: ''
    };
  },
  created: async function () {
    // Start a new inquiry
    if (!this.$inquiry.exists()) { this.$inquiry.start('Tyveri/skadeverk'); }

    const faq = await Faqs.getFaqs('tyveri-og-skadeverk');
    this.faqs = faq;
  }
};
</script>

<style>

</style>
