<template>
  <div>
    <h3 class="title is-size-3">Prioritet på kategorier</h3>
<article class="message is-warning">
      <div class="message-header">
        <p>Innstillinger for prioritetskø</p>
      </div>
      <div class="message-body">
        <p>Disse innstillingene er til for at systemet skal fungere optimalt og bør ikke endres uten nøye vurdering.</p>
        <p>OBS: Henvendelser som er markert "akutt" vil komme foran alle andre i køen.</p>
      </div>
    </article>
    <div class="columns is-multiline has-background-white" style="margin-bottom: 1em" v-for="category in categories" :key="category.type">
      <div class="column is-3">
        <p class="title is-size-6">{{ category.type }}:</p>
      </div>

      <div class="column">
        <b-radio v-model="category.priority" native-value="normal"> Normal </b-radio>
        <b-radio v-model="category.priority" native-value="high"> Rask </b-radio>
        <b-radio v-model="category.priority" native-value="urgent"> Akutt </b-radio>
      </div>
    </div>

  </div>
</template>

<script>
import _ from 'lodash';
import Priorities from '@/services/Priorities';

export default {
  data: function () {
    return {
      categories: [],
      initial: []
    };
  },
  created: async function () {
    this.categories = await Priorities.getAll();
    this.initial = _.cloneDeep(this.categories);
  },
  watch: {
    categories: {
      deep: true,
      handler: function (value) {
        const diff = _.differenceWith(this.categories, this.initial, _.isEqual);
        diff.forEach(c => {
          Priorities.update(c.type, c.priority);
        });
      }
    }
  },
  methods: {
  }
};
</script>
