<template>
  <div>
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

      <Faq :item="faqs"/>
    </div>
  </div>
</template>

<script>
import Box from '@/components/Box.vue'
import Faq from '@/components/Faq.vue'

import Faqs from '@/services/Faqs.js'
import Inquiries from '@/services/Inquiries.js'

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
  created: async function () {
    const faq = await Faqs.getFaqs()
    this.faqs = faq[1].fact

    // Check if we have started an inquiry, and start one if not
    // let inquiry = JSON.parse(localStorage.getItem('inquiry'))
    // if (!inquiry) {
    //   inquiry = await Inquiries.startInquiry()
    //   inquiry = await Inquiries.update(inquiry._id, { type: 'Tyveri/Skadeverk' })
    //   localStorage.setItem('inquiry', JSON.stringify(inquiry))
    // } else {
    //   inquiry = await Inquiries.update(this.$route.query.id, { type: 'Tyveri/Skadeverk' })
    //   localStorage.setItem('inquiry', JSON.stringify(inquiry))
    // }

    let inquiry = await Inquiries.startInquiry()
    inquiry = await Inquiries.update(inquiry._id, { type: 'Tyveri/Skadeverk' })
    localStorage.setItem('inquiry', JSON.stringify(inquiry))
  }
}
</script>

<style>

</style>
