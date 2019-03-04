<template>
  <section class="section is-paddingless">
    <div class="section-border">
      <h1 class="title has-text-centered underline">{{ $t('ofteStilteSpørsmål') }}</h1>
      <b-collapse class="card" aria-id="faq" v-for="choice in items" :key="choice.id" :open="false">
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
