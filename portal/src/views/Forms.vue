<template>
  <div class="hero is-fullheight">
    <div class="hero-head section">
      <div class="container">
        <h1 class="title">
          {{ page.title }}
        </h1>
        <h2 class="subtitle">
          {{ page.text }}
        </h2>
      </div>
    </div>

    <div class="hero-body section">
      <div class="container">
        <div class="columns is-multiline">
          <FlexiInput v-for="element in page.elements" :key="element" :element="element" />
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
          <a>Eller, avslutt og trekk kølapp</a>
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
        // TODO: Go to completed page/ticket page, or something similar
      }
    },
    previous: function () {
      if (this.page.prevPage != null) {
        this.pageId = this.page.prevPage
      } else {
        // Go back
        this.$router.go(-1)
      }
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
