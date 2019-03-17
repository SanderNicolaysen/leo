<template>
  <div>
    <div ref="div" contenteditable="true"
      class="content-editable-div"
      :class="{ 'has-focus': edit, 'hover': hover }"
      @keyup="keypress"
      @blur="keypress(); edit = false"
      @focus="edit = true"
      @mouseover="hover = true"
      @mouseleave="hover = false"
      />
  </div>
</template>

<script>
import { replace } from 'lodash';

export default {
  props: ['value'],
  data: function () {
    return {
      edit: false,
      hover: false
    };
  },
  watch: {
    value: function (newValue, oldValue) {
      if (this.edit === false) {
        this.$refs.div.innerHTML = newValue;
      }
    }
  },
  mounted: function () {
    if (this.value === undefined) this.$refs.div.innerHTML = '';
    else this.$refs.div.innerHTML = this.value;
  },
  methods: {
    keypress: function () {
      this.$emit('input', replace(this.$refs.div.innerText, /\n/g, '<br>'));
    }
  }
};
</script>

<style>
.content-editable-div {
  min-height: 1em;
  cursor: text;
}

.content-editable-div .hover, .content-editable-div .has-focus {
  box-shadow: inset 0 0 10px #000000;
}
</style>
