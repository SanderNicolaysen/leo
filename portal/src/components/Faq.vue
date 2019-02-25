<template>
  <section class="section is-paddingless">
    <div class="section-border">
      <h1 class="title has-text-centered underline">Visste du at</h1>
      <p class="has-text-centered is-size-5">
        Noen anmeldelser kan utføres via politiets nettsider hjemmefra, slik at du slipper å
        møte opp på politivakta. <br>
        Anmeldelse kan utføres hjemme dersom:
      </p>
      <ul class="faq-categories is-size-6">
        <li
          v-for="choice in item"
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
    'item'
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
