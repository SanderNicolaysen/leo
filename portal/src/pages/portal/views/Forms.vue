<template>
  <div class="hero is-fullheight-with-navbar">
    <navbar></navbar>
    <div class="hero-head">
      <div class="container">
        <h1 class="title">
          {{ page.title }}
        </h1>
        <h2 class="subtitle">
          {{ page.subtitle }}
        </h2>
        <progress class="progress is-link" :value='progress' max="100"></progress>
      </div>
    </div>

    <div class="hero-body" v-if="form && form.layout === 'normal'">
      <div class="container">
        <article class="message is-primary" v-if="page.info">
          <div class="message-header">
            <p>Informasjon</p>
          </div>
          <div class="message-body" v-html="page.info"></div>
        </article>

        <div class="columns is-multiline">
          <FlexiInput v-for="element in page.elements" :key="element.id" :element="element" />
        </div>
      </div>
    </div>

    <div class="hero-body" v-else-if="form && form.layout === 'split'">
      <div class="container">
        <div class="columns">
          <div class="column">
            <article class="message is-dark">
              <div class="message-body">
                <div class="field columns is-multiline">
                  <FlexiInput v-for="element in page.elements" :key="element.id" :element="element" />
                </div>
              </div>
            </article>
          </div>
          <div class="column">
            <article class="message is-primary">
              <div class="message-header">
                <p>Informasjon</p>
              </div>
              <div class="message-body" v-html="page.info"></div>
            </article>
          </div>
        </div>
      </div>
    </div>

    <div class="hero-foot">
      <div class="container has-text-centered">
        <div class="buttons is-inline-block">
          <button class="button is-large is-uppercase" @click="previous">Tilbake</button>
          <button class="button is-large is-uppercase is-link is-outlined" @click="next">{{ page.nextPage !== null ? 'Neste' : 'Fullfør' }}</button>
        </div>
        <div>
          <router-link :to="{ name: 'grabticket' }" v-if="page.nextPage !== null">Eller, avslutt og trekk kølapp</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import FlexiInput from '@/components/FlexiInput.vue';

import Forms from '@/services/Forms.js';

export default {
  name: 'forms',
  components: {
    FlexiInput
  },
  data: function () {
    return {
      form: null,
      pageId: null,
      progress: null,
      progressSlope: null
    };
  },
  computed: {
    page: function () {
      if (this.pageId !== null) {
        return _.find(this.form.pages, { id: this.pageId });
      }
      return {};
    }
  },
  watch: {
    form: {
      handler: function (value) {
        // Update the form property of an ongoing inquiry
        this.$inquiry.update({ form: value });
      },
      deep: true
    }
  },
  methods: {
    next: function () {
      if (this.page.nextPage != null) {
        this.pageId = this.page.nextPage;
        this.progress += this.progressSlope;
      } else {
        this.$router.push({ name: 'grabticket' });
      }
    },
    previous: function () {
      if (this.page.prevPage != null) {
        this.pageId = this.page.prevPage;
        this.progress -= this.progressSlope;
      } else {
        // Go back
        this.$router.go(-1);
      }
    },
    exists: function (prop) {
      return !_.isUndefined(prop) && prop !== '';
    }
  },
  created: async function () {
    this.form = await Forms.find(this.$route.params.name);
    this.pageId = 0;

    this.progress = 0;
    this.progressSlope = 100 / this.form.pages.length;
  }
};
</script>

<style lang="sass" scoped>

</style>
