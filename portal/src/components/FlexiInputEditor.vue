<template>
  <div class="box">
    <div class="field">
      <label class="label">Beskrivelse</label>
      <div class="control">
        <input class="input" type="text" v-model="innerElement.label">
      </div>
    </div>

    <div class="field">
      <label class="label">Hjelpetekst</label>
      <div class="control">
        <input class="input" type="text" v-model="innerElement.info">
      </div>
    </div>

    <div class="field" v-if="element.type === 'radio' || element.type === 'select'">
      <label class="label">Valg</label>
      <div class="control">
        <input class="input" type="text" v-model="choices">
        <p class="help">Separer hvert valg med komma</p>
      </div>
    </div>

    <div class="buttons">
      <button class="button is-warning" @click="$emit('close')">Avbryt</button>
      <button :disabled="isDisabled" class="button is-primary" @click="$emit('save', outputElement); $emit('close');">Lagre</button>
    </div>

    <div class="preview">
      <h2 class="title is-size-5">Forhåndsvisning:</h2>
      <div>
        <flexi-input :element="innerElement"/>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import FlexiInput from '@/components/FlexiInput.vue';
import getSubstring from '@/lang/utils.js';

export default {
  props: ['element', 'index'],
  data: function () {
    return {
      innerElement: {},
      hover: false,
      choices: ''
    };
  },
  computed: {
    outputElement: function () {
      const ele = _.cloneDeep(this.innerElement);
      ele.sizeClass = this.element.sizeClass;
      ele.choices = _.map(ele.choices, e => { return e.trim(); });
      delete ele.value;
      return ele;
    },
    isDisabled: function () {
      const innerElement = this.innerElement;
      const element = this.element;

      if (innerElement.label !== this.getSubstring(element.label)) { return false; }

      if (innerElement.info !== this.getSubstring(element.info)) { return false; }

      if (innerElement.choices != null) {
        if (!innerElement.choices.every(function (choice, i) {
          return choice.trim() === this.getSubstring(element.choices[i]);
        }, this)) { return false; }
      }

      return true;
    }
  },
  watch: {
    choices: function () {
      this.innerElement.choices = this.choices.split(',');
    }
  },
  mounted: function () {
    this.innerElement = _.cloneDeep(this.element);

    this.innerElement.label = this.getSubstring(this.innerElement.label);

    if (this.innerElement.info != null) { this.innerElement.info = this.getSubstring(this.innerElement.info); }

    if (this.innerElement.choices != null) {
      this.innerElement.choices.forEach(function (choice, i) {
        this.innerElement.choices[i] = this.getSubstring(choice);
      }, this);
    }

    this.innerElement.sizeClass = 'is-full';

    if (this.element.type === 'radio' || this.element.type === 'select') {
      this.choices = this.innerElement.choices.join(', ');
    }
  },
  methods: {
    getSubstring: function (string) {
      if (string != null) { return getSubstring(string, this); }
    }
  },
  components: {
    FlexiInput
  }
};
</script>

<style>
.preview {
  margin-top: 1em;
  padding-top: 1em;
  border-top: 1px solid;
}
</style>
