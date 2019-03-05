<template>
<div class="section">
  <h1 class="title">Køoversikt</h1>
  <h1 class="subtitle">Nåværende henvendelse:</h1>
  <div class="">
    <div class="columns">
      <div class="column is-two-thirds box">
        <table class="table">
          <tr v-for="(value, key) in filteredInquiries[0]" :key="key">
            <td>{{key}}</td>

            <td v-if="key === 'skjema'">
              <Form :form="value"/>
            </td>
            <td v-else>
              {{value}}
            </td>
          </tr>
        </table>
      </div>
      <div class="column">
        <div class="buttons">
          <button v-on:click="toggleButton()" class="button is-primary is-rounded">{{buttonLabel}}</button>
          <button class="button is-danger is-rounded">Slett</button>
        </div>
      </div>
    </div>
  </div>
  <h1 class="subtitle">Kommende henvendelser:</h1>
  <div class="columns">
    <div class="column">
      <div class="columns is-multiline">
        <div class="column is-full" v-for="inquiry in filteredInquiries" :key="inquiry.inquiry_id" @mousedown="showDetails = inquiry.inquiry_id">
          <InquiryBox v-bind:inquiry="inquiry" v-bind:active="showDetails" />
        </div>
      </div>
    </div>
    <div class="column">
      <table class="table box" v-for="inquiry in filteredInquiries" :key="inquiry.inquiry_id" v-show="showDetails === inquiry.inquiry_id">
        <tr v-for="(value, key) in inquiry" :key="value">
          <td>{{ key }}</td>
          <td v-if="key === 'skjema'">
            <Form :form="value"/>
          </td>
          <td v-else>
            {{value}}
          </td>
        </tr>
      </table>
    </div>
  </div>
</div>
</template>

<script>
import _ from 'lodash';
import InquiryBox from '@/components/InquiryBox.vue';
import Form from '@/components/Form.vue';

import Inquiries from '@/services/Inquiries.js';

// Only these fields from an inquiry will be displayed
const filter = {
  '_id': 'id',
  'type': 'henvendelse',
  'first_name': 'fornavn',
  'last_name': 'etternavn',
  'form': 'skjema'
};

export default {
  name: 'booth',
  components: {
    InquiryBox,
    Form
  },
  data: function () {
    return {
      inquiries: [],
      buttonLabel: 'Kall inn',
      showDetails: null
    };
  },
  created: async function () {
    this.inquiries = await Inquiries.getInquiries();
  },
  methods: {
    toggleButton: function () {
      if (this.buttonLabel === 'Kall inn') {
        this.buttonLabel = 'Neste';
      } else {
        this.buttonLabel = 'Kall inn';
        this.$delete(this.inquiries, 0);
      }
    }
  },
  computed: {
    filteredInquiries: function () {
      return _.mapValues(this.inquiries, (inquiry) => {
        inquiry = _.pick(inquiry, _.keys(filter));
        return _.mapKeys(inquiry, (value, key) => {
          return filter[key];
        });
      });
    }
  }
};
</script>
