<template>
  <div>
    <h3 class="title is-size-3">Prioritet på kategorier</h3>

    <div class="columns is-multiline has-background-white" style="margin-bottom: 1em" v-for="category in categories" :key="category.type">
      <div class="column is-3">
        <p class="title is-size-6">{{ category.type }}:</p>
      </div>

      <div class="column">
        <span> Lav </span>
        <b-radio v-model="category.priority" native-value="1"> </b-radio>
        <b-radio v-model="category.priority" native-value="2"> </b-radio>
        <b-radio v-model="category.priority" native-value="3"> </b-radio>
        <b-radio v-model="category.priority" native-value="4"> </b-radio>
        <b-radio v-model="category.priority" native-value="5"> </b-radio>
        <span> Høy </span>
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
