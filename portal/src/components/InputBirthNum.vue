<template>
  <b-field
    :type="{ 'is-danger': errors.has('birthNum') }"
    :message="{ [$t('birthNumError')]: errors.has('birthNum') }">
      <b-input
        type="number"
        v-model="birthNum"
        name="birthNum"
        v-validate="'length:11'"
        >
      </b-input>
  </b-field>
</template>

<script>
export default {
  props: ['value'],
  data: function () {
    return {
      birthNum: this.value
    };
  },
  watch: {
    birthNum: function (newVal, oldval) {
      // Emit an input-event for v-model to work.
      this.$emit('input', this.birthNum);
    }
  }
};
</script>
