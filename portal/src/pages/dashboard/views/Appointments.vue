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
            <input type="text" class="input" :placeholder="$t('brukersEtternavn')" v-model="form.userName">
          </div>
        </div>
        <div class="field">
          <div class="control">
            <b-datepicker
              :placeholder="$t('brukersFødsel')"
              icon="calendar-today"
              :first-day-of-week=1
              v-model="dob">
            </b-datepicker>
          </div>
        </div>
        <div class="field">
          <div class="control">
            <input type="tel" class="input" :placeholder="$t('saksnummer')" v-model="form.caseNumber">
          </div>
        </div>
        <div class="field">
          <div class="control">
            <b-datepicker
              :placeholder="$t('avtaledato')"
              icon="calendar-today"
              :first-day-of-week=1
              v-model="date">
            </b-datepicker>
          </div>
        </div>
        <div class="block">
          <button type="submit" class="button is-primary is-fullwidth" @click.prevent="addAppointment">{{ $t('leggTil') }}</button>
        </div>
      </form>
    </div>
  </div>
  <br>
  <div class="box">
    <table class="table is-fullwidth">
      <tr>
        <th>Brukers Etternavn</th>
        <th>Verts navn</th>
        <th>Avtaledato</th>
        <th>Saksnummer</th>
        <th>Har møtt opp</th>
      </tr>
      <tr v-for="pair in pairs" :key="pair.id">
        <td> {{pair.appointment.userName}} </td>
        <td> {{pair.appointment.hostName}} </td>
        <td> {{pair.appointment.date}} </td>
        <td> {{pair.appointment.caseNumber}} </td>
        <td> <b-icon icon="account-check" v-if="!(pair.inquiry === undefined)"></b-icon> </td>
      </tr>
    </table>
  </div>
</div>
</template>

<script>
import _ from 'lodash';
import Appointments from '@/services/Appointments.js';
import Inquiries from '@/services/Inquiries';

export default {
  name: 'appointments',
  data: function () {
    return {
      appointments: [],
      inquiries: [],
      pairs: [],
      dob: new Date(),
      date: new Date(),
      form: {
        hostName: '',
        userName: '',
        userBirth: '',
        caseNumber: '',
        date: ''
      }
    };
  },
  created: async function () {
    this.updatePairs();
    this.date = null;
    this.dob = null;
  },
  watch: {
    dob: function (current, old) {
      if (this.dob !== null) {
        // e.g. 1. april 2019
        let options = { year: 'numeric', month: 'long', day: 'numeric' };
        this.form.userBirth = this.dob.toLocaleDateString('no-NO', options);
      }
    },
    date: function (current, old) {
      if (this.date !== null) {
        // e.g. 1. april 2019
        let options = { year: 'numeric', month: 'long', day: 'numeric' };
        this.form.date = this.date.toLocaleDateString('no-NO', options);
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
      this.dob = null;
    },
    updatePairs: async function () {
      // Get all appointments
      this.appointments = await Appointments.getAppointments();
      // Get all inquiries of appointment-type
      this.inquiries = (await Inquiries.getInquiries()).filter(i => { return (i.type === 'Avtale' || i.type === 'Avtale/Avhør') && i.status !== 'Ferdig'; });
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
      /* let self = this;
      this.inquiries.forEach(inquiry => {
        self.pairs.push({
          'id': inquiry._id,
          'appointment': undefined,
          'inquiry': inquiry
        });
      }); */
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
