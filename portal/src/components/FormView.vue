<template>
  <div class="form">
    <div class="columns is-multiline" v-for="page in form.pages" :key="page.id">
      <div class="column" v-for="element in page.elements" :key="element._id" :class="[ element.sizeClass ]">
        <p class="has-text-weight-bold">{{ getSubstring(element.label) }}:</p>
        <p>{{ getSubstring(element.value) }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import getSubstring from '@/lang/utils.js';

export default {
  name: 'FormView',
  props: ['form'],
  methods: {
    getSubstring: function (string) {
      if (string != null) { return getSubstring(string, this); }
    }
  }
};
</script>
