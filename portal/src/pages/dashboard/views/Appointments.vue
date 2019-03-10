<template>
<div class="section">
  <div class="container">
    <div class="columns">
      <div class="column">
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
      <div class="column">
        <div class="box">
          <table class="table">
            <tr>
              <th>{{ $t('vertsNavn') }}</th>
              <th>{{ $t('brukersNavn') }}</th>
              <th>{{ $t('brukersPersonnummer') }}</th>
            </tr>
            <tr v-for="a in appointments" v-bind:key="a._id">
              <td>{{a.hostName}}</td>
              <td>{{a.userName}}</td>
              <td>{{a.userNIN}}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import Appointments from '@/services/Appointments.js';

export default {
  name: 'appointments',
  data: function () {
    return {
      appointments: [],
      form: {
        hostName: '',
        userName: '',
        userNIN: ''
      }
    };
  },
  created: async function () {
    this.appointments = await Appointments.getAppointments();
    console.log(this.appointments);
  },
  methods: {
    addAppointment: async function () {
      const response = await Appointments.postAppointment(this.form);
      this.appointments.push(response);

      // Remove text from input field
      this.form = { hostName: '', userName: '', userNIN: '' };
    }
  }
};

</script>
