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
        <tr v-if="inquiryAttr('form')">
          <td>Skjema</td>
          <td>
            <FormView :form="inquiry.form"/>
          </td>
        </tr>
      </table>
    </div>
    <div class="card-footer">
      <div class="card-footer-item">
        <a class="is-size-5">Slett</a>
      </div>
      <div class="card-footer-item">
        <a v-on:click="toggleButton()" class="is-size-5">Kall inn</a>
      </div>
      <div class="card-footer-item">
        <a v-on:click="toggleButton()" class="is-size-5">Neste</a>
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
      inquiry: null
    };
  },
  created: async function () {
    this.inquiries = await Inquiries.getInquiries();
  },
  methods: {
    next: function () {
      this.inquiry = _.find(this.inquiries, (o) => { return o.status !== 'Behandles'; });
    },
    inquiryAttr (attr) {
      return _.has(this.inquiry, attr) ? this.inquiry[attr] : '';
    }
  }
};
</script>
