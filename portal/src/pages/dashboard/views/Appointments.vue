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
            <b-datepicker
              :placeholder="$t('brukersFødsel')"
              icon="calendar-today"
              :first-day-of-week=1
              v-model="date">
          </b-datepicker>
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
        <AppointmentBox v-if="typeof pair.appointment !== 'undefined'" v-bind:appointment="pair.appointment" @delete="deleteAppointment"/>
      </div>
      <div class="column is-one-fifth title has-text-centered">
        <div class="level" style="height: 100%">
          <div class="level-item">
            <span class="title is-1">&harr;</span>
          </div>
        </div>
      </div>
      <div class="column is-two-fifths">
        <AppointmentInquiryBox v-if="typeof pair.inquiry !== 'undefined'" v-bind:inquiry="pair.inquiry" @delete="deleteAppointment"/>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import _ from 'lodash';
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
      date: new Date(),
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
    this.date = null;
  },
  watch: {
    date: function (current, old) {
      if (this.date !== null) {
        this.form.userBirth = this.date.toLocaleDateString('no-NO');
      }
    }
  },
  methods: {
    addAppointment: async function () {
      const response = await Appointments.postAppointment(this.form);
      this.appointments.push(response);

      // Remove text from input field
      this.form = { hostName: '', userName: '', userBirth: '' };

      this.updatePairs();
      this.date = null;
    },
    updatePairs: async function () {
      // Get all appointments
      this.appointments = await Appointments.getAppointments();
      // Get all inquiries of appointment-type
      this.inquiries = (await Inquiries.getInquiries()).filter(i => { return i.type === 'Avtale' && i.status !== 'Ferdig'; });
      // Reset pairs
      this.pairs = [];
      // Add all appointments to pairs, including matching inquiries where applicable.
      _.forEach(this.appointments, a => {
        const inquiry = _.find(this.inquiries, i => {
          if (i.status === 'Ferdig') return false;
          return (a.userBirth === i.dob && a.userBirth && i.dob) || (a.caseNumber === i.caseNumber && a.caseNumber && i.caseNumber);
        });
        this.pairs.push({
          'id': a._id,
          'appointment': a,
          'inquiry': inquiry
        });
        if (inquiry) {
          this.inquiries.splice(this.inquiries.indexOf(inquiry), 1);
        }
      });
      // Add all remaining (unmatched) inquiries to pairs
      let self = this;
      this.inquiries.forEach(inquiry => {
        self.pairs.push({
          'id': inquiry._id,
          'appointment': undefined,
          'inquiry': inquiry
        });
      });
    },
    deleteAppointment: async function (data) {
      this.$dialog.confirm({
        title: 'Slett',
        message: 'Er du sikker på at du vill <b>slette</b> henvendelsen/avtalen? Dette kan ikke angres.',
        confirmText: 'Slett',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: async () => {
          if (data.hasOwnProperty('hostName')) {
            await Appointments.delete(data._id);
            _.remove(this.appointments, n => { return n._id === data._id; });
            this.updatePairs();
          } else {
            data.status = 'Ferdig';
            await Inquiries.update(data._id, data);
            this.updatePairs();
          }
        }
      });
    }
  }
};

</script>
