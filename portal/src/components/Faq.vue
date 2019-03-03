<template>
  <section class="section is-paddingless">
    <div class="section-border">
      <h1 class="title has-text-centered underline">{{ title }}</h1>
      <p class="has-text-centered is-size-5"><span v-html="text"></span></p>
      <ul class="faq-categories is-size-6">
        <li
          v-for="choice in items"
          v-bind:key="choice.id"><span class="plus-sign">+</span>{{ choice.question }}
        </li>
      </ul>
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
.plus-sign {
  font-size: 1.4rem;
  font-weight: bold;
  padding-right: 8px;
}

.section {
  padding: 0px;
}

.section-border {
  box-shadow: 4px 4px 5px rgba(0, 0, 0, 0.2);
  padding: 15px;
  background-color: lavender;
}

.faq-categories {
  list-style-type: none;
  margin-left: 20px;
}

.faq-categories li {
  margin-bottom: 2px;
  padding: 5px;
}

.underline {
  text-decoration: underline;
  text-decoration-color: #3490BD;
}

</style>
