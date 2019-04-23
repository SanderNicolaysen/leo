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
import getSubstring from '@/lang/utils.js';

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
        this.$refs.div.innerHTML = this.getSubstring(newValue);
      }
    },
    '$i18n.locale': function () { // If lang changes, get translated value
      if (this.value !== '') {
        this.$refs.div.innerHTML = this.getSubstring(this.value);
      }
    }
  },
  mounted: function () {
    if (this.value === undefined) this.$refs.div.innerHTML = '';
    else this.$refs.div.innerHTML = this.getSubstring(this.value);
  },
  methods: {
    keypress: function () {
      this.$emit('input', replace(this.$refs.div.innerText, /\n/g, '<br>'));
    },
    getSubstring: function (string) {
      if (string != null) { return getSubstring(string, this); }
    }
  }
};
</script>

<style lang="scss">
@import '@/assets/sass/_variables.scss';

.content-editable-div {
  position: relative;
  min-height: 1em;
  cursor: text;
}

.content-editable-div.hover {
  box-shadow: inset 0 0 100px #cccccc;
}

.content-editable-div.has-focus {
  box-shadow: inset 0 0 1000px 1000px #ccddee;
  color: $black;
}
</style>
