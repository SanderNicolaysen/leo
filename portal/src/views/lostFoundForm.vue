<template>
<div>
  <navbar />
  <div class="container">
    <h1 class="title has-text-centered is-uppercase">{{ page.title }}</h1>
    <p class="subtitle has-text-centered">{{ page.subtitle }}</p>

    <nav class="breadcrumb" aria-label="breadcrumbs">
      <ul>
        <li><router-link to="/lost-found">{{ page.title }}</router-link></li>
        <li class="is-active"><router-link to="/lost-found">Beskrivelse av hittegods/beslag</router-link></li>
      </ul>
    </nav>
    <progress class="progress is-link" :value='progress' max="100"></progress>
    <hr>

    <div class="columns">
      <div class="column">
        <LostFoundInput :next='next' :previous="previous" :page="page" />         
      </div>
      <div class="column">
        <article class="message is-primary">
          <div class="message-header">
            <p>Informasjon</p>
          </div>
          <div class="message-body">
            {{ page.info }} Lorem ipsum dolor sit amet, consectetur adipiscing elit. tempus quis placerat ut, porta nec nulla. Vestibulum rhoncus ac ex sit amet fringilla. Nullam gravida purus diam, et dictum <a>felis venenatis</a> efficitur. Aenean ac <em>eleifend lacus</em>, in mollis lectus. Donec sodales, arcu et sollicitudin porttitor, tortor urna tempor ligula, id porttitor mi magna a neque. Donec dui urna, vehicula et sem eget, facilisis sodales sem.
          </div>
        </article>
      </div>
    </div>

    <div class="block has-text-centered">
        <router-link to="/grabticket"><button class="button is-success is-size-5 is-uppercase">{{ $t('trekkKølapp') }}</button></router-link>
    </div>
  </div>
</div>
</template>

<script>
import _ from 'lodash';
import LostFoundInput from '@/components/lostFoundInput.vue'
import Forms from '@/services/Forms.js';

export default {
  name: 'lostFoundForm',
  components: {
    LostFoundInput
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
}
</script>

<style scoped>
</style>