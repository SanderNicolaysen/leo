<template>
<div>
<navbar />

<div class="container">

  <h1 class="title has-text-centered is-uppercase">{{ $t('hittegods') }}</h1>
  <p class="subtitle has-text-centered">{{ $t('hittegodsTekst') }}</p>

  <div class="columns">

    <div class="column">
      <router-link to="/lost-found/description/0">
        <div class="box">
          <div class="content is-large">
            <p class="has-text-centered"> {{ $t('hentBeslagHittegods') }}</p>
          </div>
        </div>
      </router-link>
    </div>

    <div class="column">
      <router-link to="/lost-found/description/1">
        <div class="box hover">
          <div class="content is-large">
            <p class="has-text-centered">{{ $t('leverBeslagHittegods') }}</p>
          </div>
        </div>
      </router-link>
    </div>

  </div> <!-- columns -->

  <Faq class="block" :items="faqs" title="Frequently Asked Questions" text= "Commodo laborum ipsum cupidatat adipisicing qui sit."/>

  <div class="block has-text-centered">
      <router-link to="/grabticket"><button class="button is-success is-size-5 is-uppercase">{{ $t('trekkKølapp') }}</button></router-link>
  </div>

  </div> <!-- Container -->
</div> <!-- div -->
</template>

<script>
import Faq from '@/components/Faq.vue';

export default {
  name: 'lostFound',
  components: {
    Faq
  },
  data () {
    return {
      faqs: [
        { id: 1, question: "Hvor leverer jeg hittegods" }
      ]
    };
  }
};
</script>
<style lang="scss" scoped >
/* Center element exactly in middle of the screen */
.columns {
  margin-top: 5rem;
}

.box {
  background: linear-gradient(to bottom, #f6e6b4 0%,#ed9017 100%);
}
</style>
