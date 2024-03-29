<template>
  <div class="hero is-fullheight-with-navbar" v-if="page">
    <navbar></navbar>
    <div class="hero-head">
      <div class="container">
        <h1 class="title">
          {{ getSubstring(page.title) }}
        </h1>
        <h2 class="subtitle">
          {{ getSubstring(page.subtitle) }}
        </h2>
        <progress class="progress is-link" :value='progress' max="100"></progress>
      </div>
    </div>

    <div class="hero-body" v-if="form.layout === 'normal'">
      <div class="container">
        <article class="message is-primary" v-if="page.info">
          <div class="message-header">
            <p>{{ $t('info') }}</p>
          </div>
          <div class="message-body" v-html="getSubstring(page.info)"></div>
        </article>

        <div class="columns is-multiline">
          <FlexiInput v-for="element in page.elements" :key="element.id" :element="element" />
        </div>
      </div>
    </div>

    <div class="hero-body" v-else-if="form.layout === 'split'">
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
          <button class="button is-large is-uppercase" @click="previous($event)">Tilbake</button>
          <button class="button is-large is-uppercase is-primary" @click="next($event);">{{ progress + progressSlope >= 100 ? 'Fullfør' : 'Neste' }}</button>
        </div>
        <div>
          <router-link :to="{ name: 'grabticket' }" v-if="progress + progressSlope < 100">Eller, avslutt og trekk kølapp</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import FlexiInput from '@/components/FlexiInput.vue';
import getSubstring from '@/lang/utils.js';

export default {
  name: 'forms',
  components: {
    FlexiInput
  },
  data: function () {
    return {
      forms: null,
      form: null,
      pageId: null,
      progress: 0,
      progressSlope: null
    };
  },
  computed: {
    page: function () {
      return _.find(this.form.pages, { id: this.pageId });
    }
  },
  watch: {
    forms: {
      handler: function (value) {
        // Update the form property of an ongoing inquiry
        this.$inquiry.update({ forms: value });
      },
      deep: true
    },
    '$route' (to, from) {
      this.form = _.find(this.forms, f => { return f.normalizedName === to.params.name; });
      this.pageId = Number.parseInt(to.params.page);
    }
  },
  methods: {
    next: function (event) {
      this.progress += this.progressSlope;
      setTimeout(() => event.target.blur(), 500);

      if (this.page.nextPage !== null) {
        const nextpage = this.page.nextPage;
        this.$router.push({ name: 'forms', params: { name: this.form.normalizedName, page: nextpage } });
        return;
      }

      const index = this.forms.findIndex(f => f.normalizedName === this.form.normalizedName);
      if (index === this.forms.length - 1) {
        this.$router.push({ name: 'grabticket' });
        return;
      }

      this.form = this.forms[index + 1];
      this.$router.push({ name: 'forms', params: { name: this.form.normalizedName, page: 0 } });
    },
    previous: function (event) {
      this.progress -= this.progressSlope;
      setTimeout(() => event.target.blur(), 500);
      this.$router.go(-1);
    },
    exists: function (prop) {
      return !_.isUndefined(prop) && prop !== '';
    },
    getSubstring: function (string) {
      if (string != null) { return getSubstring(string, this); }
    }
  },
  created: async function () {
    this.forms = this.$inquiry.get().forms;

    this.form = this.forms.find(f => f.normalizedName === this.$route.params.name);
    this.pageId = Number.parseInt(this.$route.params.page) || 0;
    this.progressSlope = 100 / _.sumBy(this.forms, f => f.pages.length);

    // Calculate the progress
    const pages = _.flatMap(this.forms, f => f.pages);
    let i = 0;
    while (this.page !== pages[i++]) {
      this.progress += this.progressSlope;
    }
  }
};
</script>
