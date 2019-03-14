<template>
  <div>
    <navbar />
    <div class="container">
      <h1 class="title has-text-centered is-uppercase">{{ $t('hittegods') }}</h1>
      <p class="subtitle has-text-centered">{{ $t('hittegodsTekst') }}</p>

      <div class="columns">
        <div class="column">
          <router-link to="/skjema/hent-hittegods">
            <Box :title="$t('hentBeslagHittegods')" :text="$t('hentBeslagHittegodsTekst')" icon="<img src='/icons/round-business_center.svg'/>" />
          </router-link>
        </div>

        <div class="column">
          <router-link to="/skjema/lever-hittegods">
            <Box :title="$t('leverHittegods')" :text="$t('leverHittegodsTekst')" icon="<img src='/icons/round-business_center.svg'/>" />
          </router-link>
        </div>
      </div> <!-- columns -->

      <Faq class="block" :items="faqs" title="Frequently Asked Questions" text="Commodo laborum ipsum cupidatat adipisicing qui sit." />

      <div class="block has-text-centered">
        <router-link to="/grabticket"><button class="button is-success is-size-5 is-uppercase">{{ $t('trekkKølapp') }}</button></router-link>
      </div>
    </div> <!-- Container -->
  </div> <!-- div -->
</template>

<script>
import Faq from '@/components/Faq.vue';
import Box from '@/components/Box.vue';

export default {
  name: 'lostFound',
  components: {
    Faq,
    Box
  },
  data () {
    return {
      faqs: [
        { id: 1, question: 'Hvor leverer jeg hittegods' }
      ]
    };
  },
  created () {
    if (!this.$inquiry.exists()) { this.$inquiry.start('hittegods-og-beslag'); }
  }
};
</script>
<style lang="scss" scoped >
/* Center element exactly in middle of the screen */
.columns {
  margin-top: 5rem;
}
</style>
