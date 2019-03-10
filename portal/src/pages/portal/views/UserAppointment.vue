<template>
  <div>
    <navbar />
    <div class="container">
      <h1 class="title has-text-centered is-uppercase">{{ $t('avtale') }}</h1>

      <div class="columns">
        <div class="column" v-on:click="continueAs('meldeplikt')">
          <Box title='Meldeplikt' />
        </div>
        <div class="column" v-on:click="continueAs('avhør')">
          <Box title='Avhør' />
        </div>
      </div>

      <div class="block has-text-centered">
        <router-link to="/grabticket"><button class="button is-success is-size-4 is-uppercase">{{ $t('trekkKølapp') }}</button></router-link>
      </div>

      <Faq :item="faqs"/>
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
    this.$inquiry.start('Avtale');

    const faq = await Faqs.getFaqs('avtale');
    this.faqs = faq;
  },
  methods: {
    continueAs: function (avtaleType) {
      this.$inquiry.update({ type: avtaleType });
      this.$router.push({ path: '/skjema/timeavtale' });
    }
  }
};
</script>

<style>

</style>
