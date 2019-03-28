<template>
<div class="section">
  <h1 class="title">Køoversikt</h1>
  <h1 class="subtitle">Valgt henvendelse:</h1>
  <div class="card" v-if="inquiry !== null">
    <div class="card-header">
      <p class="card-header-title">Kategori: {{ inquiryAttr('type') }}</p>
    </div>
    <div class="card-content">
      <table class="table is-fullwidth">
        <tr>
          <td>Kønummer</td>
          <td>#{{ inquiryAttr('inquiry_id') }}</td>
        </tr>
        <tr>
          <td>Opprettet</td>
          <td>{{ inquiry.created }}</td>
        </tr>
        <tr>
          <td>Status</td>
          <td><StatusIndicator :status="inquiry.status" /></td>
        </tr>
        <tr>
          <td>Personnummer</td>
          <td>{{ inquiryAttr('NIN') }}</td>
        </tr>
        <tr>
          <td>Prioritet</td>
          <td>{{ inquiryAttr('priority') }}</td>
        </tr>
        <tr>
          <td>Fødselsdato</td>
          <td>{{ inquiryAttr('dob') }}</td>
        </tr>
        <tr>
          <td>Fornavn</td>
          <td>{{ inquiryAttr('fname') }}</td>
        </tr>
        <tr>
          <td>Etternavn</td>
          <td>{{ inquiryAttr('lname') }}</td>
        </tr>
        <tr v-if="inquiryAttr('form')">
          <td>Skjema</td>
          <td><FormView :form="inquiry.form"/></td>
        </tr>
      </table>
    </div>
    <div class="card-footer">
      <div class="card-footer-item">
        <a v-on:click="del()" class="is-size-5">Slett</a>
      </div>
      <div class="card-footer-item">
        <a v-on:click="summon()" class="is-size-5">Kall inn</a>
      </div>
      <div class="card-footer-item">
        <a v-on:click="next()" class="is-size-5">Neste</a>
      </div>
    </div>
  </div>
  <div class="content" v-else>
    <article class="message is-warning">
      <div class="message-header">
        <p>Ingen henvendelse valgt</p>
      </div>
      <div class="message-body">
        <p>Trykk neste eller velg henvedelse under for å starte.</p>
        <button class="button is-large" @click="next">Neste</button>
      </div>
    </article>
  </div>
  <h1 class="subtitle">Aktive henvendelser:</h1>
  <div class="columns is-multiline">
    <div class="column is-6" v-for="inquiry in inquiries" :key="inquiry.inquiry_id">
      <InquiryBox :inquiry="inquiry"/>
    </div>
  </div>
</div>
</template>

<script>
import InquiryBox from '@/components/InquiryBox.vue';
import FormView from '@/components/FormView.vue';
import StatusIndicator from '@/components/StatusIndicator.vue';
import Inquiries from '@/services/Inquiries.js';
import _ from 'lodash';
import io from 'socket.io-client/dist/socket.io';

export default {
  name: 'booth',
  components: {
    InquiryBox,
    FormView,
    StatusIndicator
  },
  data: function () {
    return {
      inquiries: [],
      inquiry: null,
      queueNumberDisplaySocket: null,
      boothSocket: null,
      user: null
    };
  },
  created: async function () {
    this.load();

    if (process.env.NODE_ENV === 'development') {
      this.queueNumberDisplaySocket = io.connect('http://localhost:8081/queueNumberDisplay');
      this.boothSocket = io.connect('http://localhost:8081/booth');
    } else {
      this.queueNumberDisplaySocket = io.connect('/queueNumberDisplay');
      this.boothSocket = io.connect('/booth');
    }

    this.updateReceiver();
    this.deleteReceiver();
  },
  methods: {
    // Update all other clients after pressing the summon or next button
    updateReceiver: function () {
      this.boothSocket.on('update', function (response) {
        this.inquiries[_.findIndex(this.inquiries, (o) => { return o._id === response._id; })] = response;
        this.inquiries = _.filter(this.inquiries, (o) => { return o.status !== 'Ferdig'; });

        if (this.inquiry && this.inquiry._id === response._id) {
          this.inquiry = null;
        }
      }.bind(this));
    },
    deleteReceiver: function () {
      this.boothSocket.on('delete', function (response) {
        this.inquiries = _.filter(this.inquiries, (o) => { return o._id !== response._id; });
      }.bind(this));
    },
    next: async function () {
      if (this.inquiry) {
        this.inquiry.status = 'Ferdig';
        this.boothSocket.emit('update', this.inquiry);
        this.inquiries = _.filter(this.inquiries, (o) => { return o._id !== this.inquiry._id; });
      }

      let checkInquiries = _.find(this.inquiries, (o) => { return o.status !== 'Behandles' && o.status !== 'Ferdig'; });
      if (checkInquiries) {
        this.inquiry = checkInquiries;
      } else {
        this.inquiry = null;
      }
    },

    del: async function () {
      this.$dialog.confirm({
        title: 'Sletter henvendelse #' + this.inquiry.inquiry_id,
        message: 'Bekreft sletting',
        confirmText: 'Slett',
        cancelText: 'Avbryt',
        type: 'is-danger',
        onConfirm: async () => {
          this.boothSocket.emit('delete', this.inquiry);
          this.$toast.open('Slettet FAQ');
          this.inquiry = null;
        }
      });
    },

    summon: async function () {
      this.$snackbar.open('Kaller inn kønummer #' + this.inquiry.inquiry_id);

      // If you try to summon user while the user is typing inform the user with a modal
      if (this.inquiry.status === 'Skriver') {
        this.boothSocket.emit('inform user', this.inquiry.inquiry_id);
      }

      this.inquiry.status = 'Behandles';
      this.inquiries[_.findIndex(this.inquiries, (o) => { return o._id === this.inquiry._id; })] = this.inquiry;

      this.boothSocket.emit('update', this.inquiry);
      this.queueNumberDisplaySocket.emit('summon', this.inquiry.inquiry_id);
    },

    load: async function () {
      this.inquiries = await Inquiries.getInquiries();
      // Only show unfinished inquiries
      this.inquiries = _.filter(this.inquiries, (o) => { return o.status !== 'Ferdig'; });
    },

    inquiryAttr (attr) {
      return _.has(this.inquiry, attr) ? this.inquiry[attr] : '';
    }
  },
  mounted: function () {
    this.boothSocket.on('get', function (response) {
      this.inquiries = response;
      this.inquiries = _.filter(this.inquiries, (o) => { return o.status !== 'Ferdig'; });

      if (this.inquiry) {
        this.inquiry = this.inquiries[_.findIndex(this.inquiries, (o) => { return o._id === this.inquiry._id; })];
      }
    }.bind(this));
  }
};
</script>
