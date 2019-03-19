<template>
<div class="">
  <div class="">
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
            <input type="tel" class="input" :placeholder="$t('brukersFødsel')" v-model="form.userBirth">
          </div>
        </div>
        <div class="field">
          <div class="control">
            <input type="tel" class="input" :placeholder="$t('saksnummer')" v-model="form.caseNumber">
          </div>
        </div>
        <div class="block">
          <button type="submit" class="button is-primary is-fullwidth" @click.prevent="addAppointment">{{ $t('leggTil') }}</button>
        </div>
      </form>
    </div>
  </div>
  <br>
  <div class="">
    <div class="columns" v-for="pair in pairs" :key="pair.id">
      <div class="column is-two-fifths">
        <AppointmentBox v-if="typeof pair.appointment !== 'undefined'" v-bind:appointment="pair.appointment" />
      </div>
      <div class="column is-one-fifth title has-text-centered">
        <div class="level" style="height: 100%">
          <div class="level-item">
            <span class="title is-1">&harr;</span>
          </div>
        </div>
      </div>
      <div class="column is-two-fifths">
        <AppointmentInquiryBox v-if="typeof pair.inquiry !== 'undefined'" v-bind:inquiry="pair.inquiry"/>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import AppointmentBox from '@/components/AppointmentBox.vue';
import AppointmentInquiryBox from '@/components/AppointmentInquiryBox.vue';
import Appointments from '@/services/Appointments.js';
import Inquiries from '@/services/Inquiries';

export default {
  name: 'appointments',
  components: {
    AppointmentBox,
    AppointmentInquiryBox
  },
  data: function () {
    return {
      appointments: [],
      inquiries: [],
      pairs: [],
      form: {
        hostName: '',
        userName: '',
        userBirth: '',
        caseNumber: ''
      }
    };
  },
  created: async function () {
    this.updatePairs();
  },
  methods: {
    addAppointment: async function () {
      const response = await Appointments.postAppointment(this.form);
      this.appointments.push(response);

      // Remove text from input field
      this.form = { hostName: '', userName: '', userBirth: '' };

      this.updatePairs();
    },
    updatePairs: async function () {
      // Get all appointments
      this.appointments = await Appointments.getAppointments();
      // Get all inquiries of appointment-type
      this.inquiries = (await Inquiries.getInquiries()).filter(i => { return i.type === 'Avtale'; });
      // Reset pairs
      this.pairs = [];
      // Add all appointments to pairs, including matching inquiries where applicable.
      for (let a in this.appointments) {
        let inquiry;
        for (let i in this.inquiries) {
          // Skip if appointment is undefined
          if (this.inquiries[i].appointment === undefined) { break; }
          if (this.appointments[a].userBirth === this.inquiries[i].appointment.birth || this.appointments[a].caseNumber === this.inquiries[i].appointment.caseNumber) {
            inquiry = this.inquiries[i];
            // Delete matched inquiry from inquiries
            delete this.inquiries[i];
            break;
          }
        }
        this.pairs.push({
          'id': this.appointments[a]._id,
          'appointment': this.appointments[a],
          'inquiry': inquiry
        });
      }
      // Add all remaining (unmatched) inquiries to pairs
      let self = this;
      this.inquiries.forEach(function (inquiry) {
        self.pairs.push({
          'id': inquiry._id,
          'appointment': undefined,
          'inquiry': inquiry
        });
      });
    }
  }
};

</script>
