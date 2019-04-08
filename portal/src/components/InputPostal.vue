<template>
  <b-field
    :type="{ 'is-danger': hasError }"
    :message="message">
    <span class="input-postal is-flex">
      <b-input
        type="number"
        v-model="postalNo"
        >
      </b-input>
      <span class="has-text-weight-semibold">{{ postalLoc }}</span>
    </span>
  </b-field>
</template>

<script>
import axios from 'axios';

export default {
  props: ['value'],
  data: function () {
    return {
      postalNo: '',
      postalLoc: '',
      postMap: [],
      hasError: false
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

        // If the field is empty, do not show validation-error-message
        if (newVal.length === 0) this.hasError = false;
        else this.hasError = true;
      } else {
        const poststed = this.postMap.get(newVal);
        if (typeof poststed === 'undefined') {
          this.postalLoc = '';
          this.hasError = true;
        } else {
          this.postalLoc = poststed;
          this.hasError = false;
        }
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
  },
  computed: {
    message: function () {
      // Get the validation-error-message in the chosen language
      const message = this.$t('postalError');

      return { [message]: this.hasError };
    }
  }
};
</script>

<style>
.input-postal {
  align-items: center;
  flex-wrap: wrap;
}

.input-postal .input {
  width: 85px;
}

.input-postal span {
  padding-left: .6em;
}
</style>
