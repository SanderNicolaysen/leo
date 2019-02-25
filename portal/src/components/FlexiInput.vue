<template>
  <div class="column" :class="[ element.sizeClass ]">
    <!-- Label -->
    <label class="label" v-if="element.type !== 'checkbox'">{{ element.label }}</label>

    <!-- Input type: text -->
    <div class="control" v-if="element.type === 'text'">
      <input class="input" type="text" v-model="element.value">
    </div>

    <!-- Input type: textarea -->
    <div class="control" v-else-if="element.type === 'textarea'">
      <textarea class="textarea" placeholder="" v-model="element.value"></textarea>
    </div>

    <!-- Input type: radio -->
    <div class="control" v-else-if="element.type === 'radio'">
      <label class="radio" v-for="choice in element.choices" :key="choice">
        <input type="radio" :value="choice" v-model="element.value">
        {{ choice }}
      </label>
    </div>

    <!-- Input type: select -->
    <div class="control" v-else-if="element.type === 'select'">
      <div class="select">
        <select v-model="element.value">
          <option v-for="choice in element.choices" :key="choice">{{ choice }}</option>
        </select>
      </div>
    </div>

    <!-- Input type: checkbox -->
    <div class="control" v-else-if="element.type === 'checkbox'">
      <label class="checkbox">
        <input type="checkbox" v-model="element.value">
        {{ element.label }}
      </label>
    </div>

    <p class="help is-primary" v-if="exists(element.info)">{{ element.info }}</p>
  </div>
</template>

<script>
import _ from 'lodash';

export default {
  name: 'FlexiInput',
  props: ['element'],
  methods: {
    exists: function (prop) {
      return !_.isUndefined(prop) && prop !== '';
    }
  }
};
</script>
