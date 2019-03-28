<template>
  <div v-if="visible && (type === 'text' || type === 'date')" class="field has-text-left" style="max-width: 350px; margin: auto;  ">
    <label class="label">{{ label }}</label>
    <div class="control">
      <input v-if="type === 'text'" class="input" type="text" :placeholder="placeholder" @change="updateInquiry($event)">

      <datepicker v-else-if="type === 'date'"
        :placeholder="placeholder"
        :format="DatePickerFormat"
        :disabledDates="disabledDates"
        :initialView="'year'"
        @selected="updateInquiry($event)">
      </datepicker>
    </div>
  </div>
  <div v-else-if="visible && type === 'buttons'" class="has-text-centered">
    <div class="buttons are-large is-inline-block">
      <br>
      <slot></slot>
    </div>
  </div>
  <button v-else-if="visible && type === 'button'" @click="changePage" class="button">{{ label }}</button>
  <div v-else-if="visible && type === 'title'"
    class="section has-text-centered">
      <h1 class="title is-3">{{ label }}</h1>
  </div>
  <div v-else-if="visible && type === 'boxes'">
    <div class="columns is-multiline is-centered">
      <slot></slot>
    </div>
  </div>
  <div v-else-if="visible && type === 'box'" @click="changePage" class="column">
    <Box :title="label" :text="placeholder" :icon="src ? '<img src=' + src + '/>' : ''" />
  </div>
  <div v-else-if="visible && type === 'section'">
    <slot></slot>
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker';
import Box from './Box.vue';

export default {
  name: 'TreeInput',
  props: [
    'label',
    'placeholder',
    'type',
    'src',
    'link',
    'updateKey',
    'inquiryType',
    'between',
    'hideException',
    'showException'
  ],
  data () {
    return {
      DatePickerFormat: 'dd/MM/yyyy',
      disabledDates: {
        to: new Date(1900, 0, 1),
        from: new Date()
      }
    };
  },
  components: {
    Datepicker,
    Box
  },
  methods: {
    changePage () {
      if (this.link) this.$parent.$emit('changePage', this.link);

      // If an inquiryType-prop has been passed, update the type in current inquiry
      if (this.inquiryType != null) {
        this.updateInquiry();
      }
    },
    updateInquiry (event) {
      if (event != null) {
        // Update current inquiry-dob
        if (event instanceof Date) {
          this.$inquiry.update({ [this.updateKey]: event });
        } else if (event.type === 'change') { // Update current inquiry-fname or lname
          this.$inquiry.update({ [this.updateKey]: event.target.value });
        }
      } else { // Update current inquiry-type
        this.$inquiry.update({ type: this.inquiryType });
      }
    },
    // Check if the current time is valid for showing this TreeInput
    currentTimeIsValid () {
      var currentDate = new Date();
      var currentHour = currentDate.getHours();
      var currentDay = currentDate.getDay();

      // If hideException is null and currentHour is 'inside' between, return true
      if (this.hideException == null && currentHour >= this.between.from && currentHour < this.between.to) {
        return true;
      } else if (this.hideException != null) {
        // If current time is 'inside' the hideException, return false
        if (currentDay === this.hideException.day && currentHour >= this.hideException.from && currentHour < this.hideException.to) {
          return false;
        } else if (currentHour >= this.between.from && currentHour < this.between.to) { // If current time is 'inside' between, return true
          return true;
        }
      }

      if (this.showException != null) {
        // If current time is 'inside' the showException, return true
        if (currentDay === this.showException.day && currentHour >= this.showException.from && currentHour < this.showException.to) {
          return true;
        }
      }

      return false;
    }
  },
  created () {
    this.$on('changePage', function (link) {
      this.$parent.$emit('changePage', link);
    });
  },
  computed: {
    // Determine if this TreeInput should be visible
    visible: function () {
      if (this.between == null) {
        return true;
      } else if (this.between != null && this.currentTimeIsValid()) {
        return true;
      }

      return false;
    }
  }
};
</script>
