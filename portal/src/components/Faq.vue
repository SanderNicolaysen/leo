<template>
  <div v-if="items.length > 0">
    <h1 class="subtitle">{{ $t('ofteStilteSpørsmål') }}</h1>
    <b-collapse class="card" aria-id="faq" v-for="choice in items" :key="choice.id" :open="false">
      <div slot="trigger" slot-scope="props" class="card-header" role="button" aria-controls="faq">
        <p class="card-header-title">
          {{ getSubstring(choice.question) }}
        </p>
        <a class="card-header-icon">
          <img src="@/assets/icons/menu-up.svg" alt="Opp" v-if="props.open">
          <img src="@/assets/icons/menu-down.svg" alt="Ned" v-else>
        </a>
      </div>
      <div class="card-content">
        <div class="content">
          {{ getSubstring(choice.answer) }}
        </div>
      </div>
    </b-collapse>
  </div>
</template>

<script>
import getSubstring from '@/lang/utils.js';

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
  },
  methods: {
    getSubstring: function (string) {
      if (string != null) { return getSubstring(string, this); }
    }
  }
};
</script>
