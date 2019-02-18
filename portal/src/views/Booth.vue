<template>
  <div class="section">
    <div class="container">
    <h1 class="title">Køoversikt</h1>
    <h1 class="subtitle">Nåværende henvendelse:</h1>
    <div class="box">
      <div class="columns">
        <div class="column is-two-thirds">
          <table class="table">
            <tr v-for="(value, key) in inquiries[0]" :key="key">
              <td>{{key}}</td>
              <td>{{value}}</td>
            </tr>
          </table>
        </div>
        <div class="column columns is-multiline">
          <div class="column is-full">
            <button v-on:click="toggleButton()" class="button is-block is-size-3 is-fullwidth">{{buttonLabel}}</button>
          </div>
          <div class="column is-full">
            <button class="column button is-block is-size-3 is-warning is-fullwidth is-full">Slett</button>
          </div>
        </div>
      </div>
    </div>
    <h1 class="subtitle">Kommende henvendelser:</h1>
    <div class="columns">
      <div class="column columns is-multiline">
        <div class="column is-full" v-for="inquiry in inquiries" :key="inquiry.inquiry_id" @mousedown="showDetails = inquiry.inquiry_id">
          <InquiryBox v-bind:inquiry="inquiry" v-bind:active="showDetails"/>
        </div>
      </div>
      <div class="column">
        <table class="table box" v-for="inquiry in inquiries" :key="inquiry.inquiry_id" v-show="showDetails === inquiry.inquiry_id">
          <tr v-for="(value, key) in inquiry" :key="value">
            <td>{{ key }}</td>
            <td>{{ value }}</td>
          </tr>
        </table>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src, Example:
import InquiryBox from '@/components/InquiryBox.vue'

import Inquiries from '@/services/Inquiries.js'

export default {
  name: 'booth',
  components: {
    InquiryBox
  },
  data: function () {
    return {
      inquiries: [],
      buttonLabel: 'Kall inn',
      showDetails: null
    }
  },
  mounted: function () {
    let self = this
    Inquiries.getInquiries().then(function (response) {
      self.inquiries = response.data.inquiries
    })
  },
  methods: {
    toggleButton: function () {
      if (this.buttonLabel === 'Kall inn') {
        this.buttonLabel = 'Neste'
      } else {
        this.buttonLabel = 'Kall inn'
        this.$delete(this.inquiries, 0)
      }
    }
  }
}
</script>
