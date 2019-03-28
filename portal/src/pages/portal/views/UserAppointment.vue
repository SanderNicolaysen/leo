<template>
  <div>
    <div class="hero is-fullheight-with-navbar">
      <navbar/>
      <div class="hero-body">
        <div class="container">
          <h1 class="title has-text-centered is-uppercase">{{ $t('avtale') }}</h1>
          <div class="columns is-centered is-multiline">
            <div class="column is-one-third" v-if="appointment.type === undefined">
              <div class="columns">
                <div class="column" v-on:click="appointment.type = 'annet'">
                  <Box title="Annet"/>
                </div>
                <div class="column" v-on:click="appointment.type = 'avhør'">
                  <Box title="Avhør"/>
                </div>
              </div>
            </div>
            <div class="column is-one-third" v-if="!(appointment.type === undefined)">
              <label class="label">{{ $t('etternavn')}}</label>
              <input v-model="appointment.surname" class="input" type="text">
              <label class="label">{{ $t('fødselsdato')}}</label>
              <b-datepicker
                :placeholder="$t('fødselsdato')"
                icon="calendar-today"
                :first-day-of-week="1"
                v-model="date"
              ></b-datepicker>
              <label v-if="appointment.type === 'avhør'" class="label">{{ $t('saksnummer')}}</label>
              <input
                v-if="appointment.type === 'avhør'"
                v-model="appointment.caseNumber"
                class="input"
                type="text"
              >
              <div class="columns is-centered">
                <div class="column is-one third has-text-right">
                  <br>
                  <button
                    v-on:click="appointment.type = undefined"
                    class="button is-large"
                  >{{ $t('tilbake') }}</button>
                </div>
                <div class="column is-one third has-text-left">
                  <br>
                  <button
                    v-on:click="submit()"
                    class="button is-large is-primary"
                  >{{ $t('fullfør') }}</button>
                </div>
              </div>
            </div>
          </div>
          <div class="block has-text-centered">
            <router-link to="/grabticket">
              <button class="button is-success is-size-4 is-uppercase">{{ $t('trekkKølapp') }}</button>
            </router-link>
          </div>
          <Faq :item="faqs"/>
        </div>
      </div>
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
      title: '',
      date: new Date(),
      appointment: {
        type: undefined,
        surname: '',
        birth: '',
        caseNumber: ''
      }
    };
  },
  created: async function () {
    // Start a new inquiry
    if (!this.$inquiry.exists()) {
      this.$inquiry.start('Avtale');
    }

    const faq = await Faqs.getFaqs('avtale');
    this.faqs = faq;
    this.date = null;
  },
  methods: {
    submit: function () {
      this.date = null;
      this.$inquiry.update({ appointment: this.appointment });
      this.$router.push({ path: 'grabticket' });
    }
  },
  watch: {
    date: function () {
      if (this.date !== null) {
        this.appointment.birth = this.date.toDateString();
      }
    }
  }
};
</script>

<style>
</style>
