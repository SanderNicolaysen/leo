<template>
  <span class="input-postal is-flex">
    <input class="input" type="text" v-model="postalNo" />
    <span class="has-text-weight-semibold">{{ postalLoc }}</span>
  </span>
</template>

<script>
import axios from 'axios';

export default {
  props: ['value'],
  data: function () {
    return {
      postalNo: '',
      postalLoc: '',
      postMap: []
    };
  },
  watch: {
    value: function (newVal, oldVal) {
      // When value changes, grab the postal number and update it
      this.postalNo = newVal.split(' ')[0];
    },
    postalNo: function (newVal, oldval) {
      if (newVal.length !== 4) {
        // No point to search for anything but 4-digit postal codes
        this.postalLoc = '';
      } else {
        const poststed = this.postMap.get(newVal);
        if (typeof poststed === 'undefined') this.postalLoc = '';
        else this.postalLoc = poststed;
      }

      // Emit a input-event for v-model to work.
      this.$emit('input', this.postalNo + ' ' + this.postalLoc);
    }
  },
  mounted: async function () {
    const pn = await axios.get('/Postnummerregister-utf8.txt');
    this.postMap = new Map(pn.data.split('\n').map(line => {
      const [postnummer, poststed] = line.split('\t');
      return [postnummer, poststed];
    }));

    // Set the postal number from value
    this.postalNo = this.value.split(' ')[0];
  }
};
</script>

<style>
.input-postal {
  align-items: center;
  flex-wrap: wrap;
}

.input-postal .input {
  width: 80px;
  text-align: right;
}

.input-postal span {
  padding-left: .6em;
}
</style>
