<template>
  <div>
    <article class="message is-dark">
      <div class="message-body">
        <div class="field">
          <FlexiInput v-for="element in page.elements" :key="element.id" :element="element" />
        </div>
        <div class="field is-grouped">
          <div class="control">
            <button class="button is-danger" @click="previous">Tilbake</button>
          </div>
          <div class="control">
            <button class="button is-primary" @click="next">Neste</button>
          </div>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
import FlexiInput from '@/components/FlexiInput.vue';

export default {
  name: 'lostFoundInput',
  components: {
    FlexiInput
  },
  props: {
    text: String,
    next: { type: Function },
    previous: { type: Function },
    page: Object
  },
  data () {
    return {
      inputValue: ''
    };
  },
  created () {
    this.$emit('next');
  }
};
</script>

<style scoped>
</style>
