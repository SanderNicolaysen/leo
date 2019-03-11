<template>
<div>
  <div class="column is-fullwidth">
    <div class="box">
      <h3 class="title">Registrer ny avtale</h3>
      <form method="POST" class="block">
        <div class="field">
          <div class="control">
            <input type="text" class="input" :placeholder="$t('vertsNavn')" v-model="form.hostName">
          </div>
        </div>
        <div class="field">
          <div class="control">
            <input type="text" class="input" :placeholder="$t('brukersNavn')" v-model="form.userName">
          </div>
        </div>
        <div class="field">
          <div class="control">
            <input type="tel" class="input" :placeholder="$t('brukersPersonnummer')" v-model="form.userNIN">
          </div>
        </div>
        <div class="block">
          <button type="submit" class="button is-primary is-fullwidth" @click.prevent="addAppointment">{{ $t('leggTil') }}</button>
        </div>
      </form>
    </div>
  </div>
  <div class="">
    <div class="columns is-fullwidth" v-for="pair in pairs" :key="pair.appointment._id">
      <AppointmentBox class="column is-two-fifths" v-bind:appointment="pair.appointment" />
      <div class="column is-one-fifth title has-text-centered"> &harr; </div>
      <InquiryBox class="column" v-if="typeof pair.inquiry !== 'undefined'" v-bind:inquiry="pair.inquiry" v-bind:active="true"/>
    </div>
  </div>
</div>
</template>

<script>
import AppointmentBox from '@/components/AppointmentBox.vue';
import InquiryBox from '@/components/InquiryBox.vue';
import Appointments from '@/services/Appointments.js';
import Inquiries from '@/services/Inquiries';

export default {
  name: 'appointments',
  components: {
    AppointmentBox,
    InquiryBox
  },
  data: function () {
    return {
      appointments: [],
      inquiries: [],
      pairs: [],
      form: {
        hostName: '',
        userName: '',
        userNIN: ''
      }
    };
  },
  created: async function () {
    let self = this;
    this.appointments = await Appointments.getAppointments();
    this.inquiries = await Inquiries.getInquiries();
    for (let appointment in this.appointments) {
      let inquiry = this.inquiries.find(function (x) {
        if (x.form === undefined) { return false; }
        return x.form.pages[0].elements[1].value === self.appointments[appointment].userNIN;
      });
      this.pairs.push({
        'appointment': this.appointments[appointment],
        'inquiry': inquiry
      });
    }
  },
  methods: {
    addAppointment: async function () {
      const response = await Appointments.postAppointment(this.form);
      this.appointments.push(response);

      // Remove text from input field
      this.form = { hostName: '', userName: '', userNIN: '' };
    },
    findLinks: function () {
      console.log('finding links');
    }
  }
};

</script>
