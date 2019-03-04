<template>
  <section class="section is-paddingless">
    <div class="section-border">
<<<<<<< HEAD
      <h1 class="title has-text-centered underline">{{ title }}</h1>
      <p class="has-text-centered is-size-5"><span v-html="text"></span></p>
      <ul class="faq-categories is-size-6">
        <li
          v-for="choice in items"
          v-bind:key="choice.id"><span class="plus-sign">+</span>{{ choice.question }}
        </li>
      </ul>
=======
      <h1 class="title has-text-centered underline">Ofte stilte spørsmål</h1>
      <b-collapse class="card" aria-id="faq" v-for="choice in item" :key="choice.id" :open="false">
        <div slot="trigger" slot-scope="props" class="card-header" role="button" aria-controls="faq">
          <p class="card-header-title">
            {{ choice.question }}
          </p>
          <a class="card-header-icon">
            <img src="@/assets/icons/menu-up.svg" alt="Opp" v-if="props.open">
            <img src="@/assets/icons/menu-down.svg" alt="Ned" v-else>
          </a>
        </div>
        <div class="card-content">
          <div class="content">
            {{ choice.answer }}
          </div>
        </div>
      </b-collapse>
>>>>>>> Added some dummy-answers in the 'faqs.js'-file, under 'Tyveri..'. Added the Buefy-library, in order to be able to press a question under 'Ofte stilte spørsmål' and be able to see an answer expand right under it. Improved Faq.vue also.
    </div>
  </section>
</template>

<script>
export default {
  name: 'Faq',
  props: [
    'items',
    'text',
    'title'
  ],
  data () {
    return {
    };
  }
};
</script>

<style>
.section {
  padding: 0px;
}

.section-border {
  box-shadow: 4px 4px 5px rgba(0, 0, 0, 0.2);
  padding: 15px;
  background-color: lavender;
}

.underline {
  text-decoration: underline;
  text-decoration-color: #3490BD;
}

</style>
