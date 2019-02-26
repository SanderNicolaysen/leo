<template>
  <div class="form">
    <div class="columns is-multiline" v-for="page in form.pages" :key="page.id">
      <div class="column" v-for="element in page.elements" :key="element._id" :class="[ element.sizeClass ]">
        <p class="has-text-weight-bold">{{ element.label }}:</p>
        <p>{{ element.value }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['form']
};
</script>
