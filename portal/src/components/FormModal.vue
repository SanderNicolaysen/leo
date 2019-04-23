<template>
  <div class="card">
    <div class="card-content">
      <template v-for="form in forms">
        <p class="title is-size-4" :key="form._id">{{ form.name }}</p>
        <div class="columns is-multiline" v-for="page in form.pages" :key="form._id + page.id">
          <div class="column" v-for="element in page.elements" :key="element._id" :class="[ element.sizeClass ]">
            <p class="has-text-weight-bold">{{ getSubstring(element.label) }}:</p>
            <p>{{ getSubstring(element.value) }}</p>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import getSubstring from '@/lang/utils.js';

export default {
  name: 'FormModal',
  props: ['forms'],
  methods: {
    getSubstring: function (string) {
      if (string != null) { return getSubstring(string, this); }
    }
  }
};
</script>
