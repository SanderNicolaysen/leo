<template>
  <div>
    <div class="container">
      <h1 class="title has-text-centered is-uppercase">Anmeld tyveri eller skadeverk</h1>

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
        <router-link to="/grabticket"><button class="button is-success is-size-4 is-uppercase">Trekk kølapp</button></router-link>
      </div>

      <Faq :item="faqs"/>
    </div>
  </div>
</template>

<script>
import Box from '@/components/Box.vue'
import Faq from '@/components/Faq.vue'

import Faqs from '@/services/Faqs.js'

export default {
  components: {
    Box,
    Faq
  },
  data () {
    return {
      faqs: [],
      title: ''
    }
  },
  created () {
    let self = this
    Faqs.getFaqs().then(function (response) {
      self.faqs = response.data.faqs[1].fact
    })
  }
}
</script>

<style>

</style>
