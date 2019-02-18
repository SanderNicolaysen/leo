<template>
  <div>
    <div class="container">
      <h1 class="title has-text-centered is-uppercase">Anmeld tyveri eller skadeverk</h1>

      <div class="columns">
        <div class="column">
          <Box :title="'Mobiltelefon'" />
        </div>
        <div class="column">
          <Box v-bind:title="'Sykkel'" />
        </div>
        <div class="column">
          <Box v-bind:title="'ID-tyveri'" />
        </div>
        <div class="column">
          <Box v-bind:title="'Skade på eiendom'" />
        </div>
      </div>

      <div class="columns">
        <div class="column">
          <Box v-bind:title="'Mobiltelefon'" />
        </div>
        <div class="column">
          <Box v-bind:title="'Sykkel'" />
        </div>
        <div class="column">
          <Box v-bind:title="'ID-tyveri'" />
        </div>
        <div class="column">
          <Box v-bind:title="'Skade på eiendom'" />
        </div>
      </div>

      <div class="block has-text-centered">
        <button class="button is-success is-size-4 is-uppercase">Trekk kølapp</button>
      </div>

      <Faq :item="choices"/>
    </div>
  </div>
</template>

<script>
import Box from '@/components/Box.vue'
import Faq from '@/components/Faq.vue'

export default {
  components: {
    Box,
    Faq
  },
  data () {
    return {
      choices: [
        { id: 1, question: 'Det ikke ble brukt vold eller trussel' },
        { id: 2, question: 'Det ikke ble brukt vold eller trussel' },
        { id: 3, question: 'Det ikke ble brukt vold eller trussel' }
      ]
    }
  }
}
</script>

<style>
.section {
  padding: 0px;
}

.section-border {
  box-shadow: 4px 4px 5px rgba(0, 0, 0, 0.2);
  padding: 15px;
}

.faq-categories {
  list-style-type: none;
  margin-left: 20px;
}

.faq-categories li {
  margin-bottom: 2px;
  padding: 5px;
}

</style>
