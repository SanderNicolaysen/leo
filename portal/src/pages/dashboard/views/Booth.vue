<template>
<div class="section">
  <div class="is-pulled-right">
    <b-dropdown @change="updateBooth" v-if="boothNum != null || inquiry" v-model="boothNum" aria-role="list">
      <button class="button is-link" type="button" slot="trigger">
        <template v-if="boothNum === null">
          <span>Velg skranke</span>
        </template>
        <template v-if="boothNum === 1">
          <span>Skranke 1</span>
        </template>
        <template v-else-if="boothNum === 2">
          <span>Skranke 2</span>
        </template>
        <template v-else-if="boothNum === 3">
          <span>Skranke 3</span>
        </template>
        <b-icon icon="menu-down"></b-icon>
      </button>

      <b-dropdown-item :value="1" aria-role="listitem">
        <div class="media">
          <div class="media-content">
            <h3>Skranke 1</h3>
          </div>
        </div>
      </b-dropdown-item>

      <b-dropdown-item :value="2" aria-role="listitem">
        <div class="media">
          <div class="media-content">
            <h3>Skranke 2</h3>
          </div>
        </div>
      </b-dropdown-item>

      <b-dropdown-item :value="3" aria-role="listitem">
        <div class="media">
          <div class="media-content">
            <h3>Skranke 3</h3>
          </div>
        </div>
      </b-dropdown-item>
    </b-dropdown>
  </div>
  <h1 class="title">Køoversikt</h1>
  <h1 class="subtitle">Valgt henvendelse:</h1>
  <div class="card" v-if="inquiry !== null" ref="inquiryCard">
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
          <td>{{ inquiryAttr('created') }}</td>
        </tr>
        <tr>
          <td>Status</td>
          <td><StatusIndicator :status="inquiry.status" /></td>
        </tr>
        <tr v-show="inquiryAttr('NIN')">
          <td>Personnummer</td>
          <td>{{ inquiryAttr('NIN') }}</td>
        </tr>
        <tr v-show="inquiryAttr('priority')">
          <td>Prioritet</td>
          <td>{{ inquiryAttr('priority') }}</td>
        </tr>
        <tr v-show="inquiryAttr('dob')">
          <td>Fødselsdato</td>
          <td>{{ inquiryAttr('dob') }}</td>
        </tr>
        <tr v-show="inquiryAttr('fname')">
          <td>Fornavn</td>
          <td>{{ inquiryAttr('fname') }}</td>
        </tr>
        <tr v-show="inquiryAttr('lname')">
          <td>Etternavn</td>
          <td>{{ inquiryAttr('lname') }}</td>
        </tr>
        <tr v-show="inquiryAttr('caseNumber')">
          <td>Saksnummer</td>
          <td>{{ inquiryAttr('caseNumber') }}</td>
        </tr>
        <template v-if="inquiryAttr('forms') && inquiry.forms.length > 0">
          <tr v-for="form in inquiry.forms" :key="form._id">
            <td>{{ form.name }}</td>
            <td><FormView :form="form"/></td>
          </tr>
        </template>
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
      <div v-if="boothNum != null" class="message-body">
        <p>Trykk neste eller velg henvendelse under for å starte.</p>
        <button class="button is-large" @click="next">Neste</button>
      </div>
      <div v-if="!loading && boothNum === null" class="message-body">
        <p>Velg skranke under for å starte.</p>
        <b-dropdown @change="updateBooth" v-model="boothNum" aria-role="list">
          <button class="button is-link" type="button" slot="trigger">
              <template>
                <span>Velg skranke</span>
              </template>
            <b-icon icon="menu-down"></b-icon>
          </button>

          <b-dropdown-item :value="1" aria-role="listitem">
            <div class="media">
              <div class="media-content">
                <span>Skranke 1</span>
              </div>
            </div>
          </b-dropdown-item>

          <b-dropdown-item :value="2" aria-role="listitem">
            <div class="media">
              <div class="media-content">
                <span>Skranke 2</span>
              </div>
            </div>
          </b-dropdown-item>

          <b-dropdown-item :value="3" aria-role="listitem">
            <div class="media">
              <div class="media-content">
                <span>Skranke 3</span>
              </div>
            </div>
          </b-dropdown-item>
        </b-dropdown>
      </div>
    </article>
  </div>
  <h1 class="subtitle">Aktive henvendelser:</h1>
  <div class="columns is-multiline">
    <div class="column is-6" v-for="i in inquiries" :key="i.inquiry_id">
      <InquiryBox :inquiry="i" @selected="select(i)" />
    </div>
  </div>
</div>
</template>

<script>
import InquiryBox from '@/components/InquiryBox.vue';
import FormView from '@/components/FormView.vue';
import StatusIndicator from '@/components/StatusIndicator.vue';
import Inquiries from '@/services/Inquiries.js';
import Booths from '@/services/Booths.js';
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
      user: null,
      boothNum: null,
      loading: true
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
        this.inquiries = _.sortBy(this.inquiries, i => i.priority === 'urgent' ? 0 : 1);

        if (this.inquiry && this.inquiry._id === response._id) {
          this.inquiry = null;
        }
      }.bind(this));
    },
    deleteReceiver: function () {
      this.boothSocket.on('delete', function (response) {
        this.inquiries = _.filter(this.inquiries, (o) => { return o._id !== response._id; });
        if (this.inquiry._id === response._id) {
          this.inquiry = null;
          this.$toast.open('Henvendelsen er slettet');
        }
      }.bind(this));
    },
    next: async function () {
      if (this.inquiry && this.inquiry.status === 'Behandles') {
        this.inquiry.status = 'Ferdig';
        this.boothSocket.emit('update', this.inquiry);
        this.inquiries = _.filter(this.inquiries, (o) => { return o._id !== this.inquiry._id; });
      }

      this.inquiry = await Inquiries.nextInquiry();
    },
    select: async function (inquiry) {
      this.inquiry = inquiry;
      await this.$nextTick();

      // Scroll to the inquiry card at the top if it's not already in view
      if (this.$refs.inquiryCard.offsetTop < window.pageYOffset) {
        this.$refs.inquiryCard.scrollIntoView();
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
          this.boothSocket.emit('delete', { inquiry: this.inquiry, boothNum: this.boothNum }, (response) => {
            if (!response.success) {
              this.$toast.open({ message: `Kan ikke slette. Denne henvendelsen er under behandling i skranke ${response.inUseBy}`, type: 'is-danger' });
            } else {
              this.$toast.open('Slettet FAQ');
              this.inquiry = null;
            }
          });
        }
      });
    },

    confirmBoothUpdate: async function (resp) {
      this.$dialog.confirm({
        title: 'Skranke ' + resp.newBooth.num + ' er tatt',
        message: 'Bekreft valg av skranke',
        confirmText: 'Ta skranken',
        cancelText: 'Avbryt',
        type: 'is-danger',
        onConfirm: async () => {
          this.updateBooth(resp.newBooth.num, true);
          this.$toast.open('Byttet skranke');
          this.boothNum = resp.newBooth.num;
        }
      });
    },

    summon: async function () {
      if (this.boothNum === null) {
        this.$dialog.alert({
          title: 'Ingen skranke er valgt',
          message: 'Du må ha valgt en skranke for å kunne kalle inn.',
          type: 'is-danger',
          hasIcon: true,
          icon: 'alert-circle',
          iconPack: 'mdi'
        });
        return;
      }
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
      this.inquiries = _.sortBy(this.inquiries, i => i.priority === 'urgent' ? 0 : 1);
      // If the IP-address is already assigned to a booth, get the booth-number
      const booth = await Booths.getBooth();
      if (booth !== null) {
        this.boothNum = booth.num;
        if (booth.queueNumber) {
          this.inquiry = this.inquiries.find(i => i.inquiry_id === booth.queueNumber);
        }
      }

      this.loading = false;
    },

    inquiryAttr (attr) {
      return _.has(this.inquiry, attr) ? this.inquiry[attr] : '';
    },

    updateBooth: async function (boothNum, confirmedOverwrite) {
      // Change to the booth with the corresponding boothNum, if it's not taken
      const resp = await Booths.update(boothNum, confirmedOverwrite);

      // If the chosen booth is already taken, change boothNum back to the currently assigned booth, or back to null if it wasn't assigned. Then ask the user for confirmation of booth-choice
      if (resp.taken) {
        if (resp.oldBooth != null) {
          this.boothNum = resp.oldBooth.num;
        } else {
          this.boothNum = null;
        }

        this.confirmBoothUpdate(resp);
      } else {
        if (!confirmedOverwrite) {
          this.$toast.open('Byttet skranke');
        }
      }
    }
  },
  mounted: function () {
    this.boothSocket.on('get', function (response) {
      this.inquiries = response;
      this.inquiries = _.filter(this.inquiries, (o) => { return o.status !== 'Ferdig'; });
      this.inquiries = _.sortBy(this.inquiries, i => i.priority === 'urgent' ? 0 : 1);

      if (this.inquiry) {
        this.inquiry = this.inquiries[_.findIndex(this.inquiries, (o) => { return o._id === this.inquiry._id; })];
      }
    }.bind(this));
  },
  destroyed: function () {
    this.boothSocket.disconnect();
    this.queueNumberDisplaySocket.disconnect();
  }
};
</script>
