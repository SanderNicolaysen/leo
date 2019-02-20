<template>
  <div class="hero is-fullheight-with-navbar">
    <div class="hero-head section">
      <div class="container">
        <h1 class="title">
          {{ $t(page.title) }}
        </h1>
        <h2 class="subtitle">
          {{ page.subtitle }}
        </h2>
      </div>
    </div>

    <div class="hero-body section">
      <div class="container">
        <div class="notification is-info" v-if="exists(page.info)">
          {{ page.info }}
        </div>

        <div class="columns is-multiline">
          <FlexiInput v-for="element in page.elements" :key="element.id" :element="element" />
        </div>
      </div>
    </div>

    <div class="hero-foot section">
      <div class="container has-text-centered">
        <div class="buttons is-inline-block">
          <button class="button is-large is-uppercase" @click="previous">Tilbake</button>
          <button class="button is-large is-uppercase is-link is-outlined" @click="next">Neste</button>
        </div>
        <div>
          <router-link :to="{ name: 'grabticket' }">Eller, avslutt og trekk kølapp</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import FlexiInput from '@/components/FlexiInput.vue'

import forms from '@/data/forms.js'

export default {
  name: 'forms',
  data: function () {
    return {
      form: null,
      pageId: 0
    }
  },
  computed: {
    page: function () {
      return _.find(this.form.pages, { id: this.pageId })
    }
  },
  methods: {
    next: function () {
      if (this.page.nextPage != null) {
        this.pageId = this.page.nextPage
      } else {
        this.$router.push({ name: 'grabticket' })
      }
    },
    previous: function () {
      if (this.page.prevPage != null) {
        this.pageId = this.page.prevPage
      } else {
        // Go back
        this.$router.go(-1)
      }
    },
    exists: function (prop) {
      return !_.isUndefined(prop) && prop !== ''
    }
  },
  created: function () {
    this.form = _.find(forms, { name: this.$route.params.name })
    this.pageId = this.form.pages[0].id
  },
  components: {
    FlexiInput
  }
}
</script>

<style lang="sass" scoped>
.hero-foot
  padding-bottom: 50px;

.hero-head
  padding-top: 50px;
</style>
