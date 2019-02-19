<template>
  <section class="section is-paddingless">
    <div class="section-border has-background-grey-lighter">
      <h1 class="title has-text-centered">Visste du at</h1>
      <p class="has-text-centered is-size-5">
        Noen anmeldelser kan utføres via politiets nettsider hjemmefra, slik at du slipper å
        møte opp på politivakta. <br>
        Anmeldelse kan utføres hjemme dersom:
      </p>
      <ul class="faq-categories is-size-6">
        <li
          v-for="choice in item"
          v-bind:key="choice.id">{{ choice.text }}
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
    }
  }
}
</script>
