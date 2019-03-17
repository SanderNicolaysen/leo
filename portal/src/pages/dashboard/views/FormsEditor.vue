<template>
  <div>
    <div class="field">
      <div class="control">
        <div class="select">
          <select v-model="selectedForm">
            <option v-for="{ name, normalizedName } in formsList" :key="normalizedName" :value="normalizedName">{{ name }}</option>
          </select>
        </div>
      </div>
    </div>

    <div class="is-clearfix"></div>
    <div class="buttons is-pulled-left">
      <button class="button is-success" @click="save()" :disabled="initial === JSON.stringify(form)">Lagre</button>
      <button class="button" @click="form = JSON.parse(initial)" :disabled="initial === JSON.stringify(form)">Angre</button>
    </div>

    <div class="field is-horizontal is-pulled-right">
      <div class="field-label is-normal">
        <label class="label">Layout:</label>
      </div>
      <div class="field-body">
        <b-field>
          <b-radio-button v-model="form.layout" native-value="split" type="is-dark">
            <span>Split</span>
          </b-radio-button>
          <b-radio-button v-model="form.layout" native-value="normal" type="is-dark">
            <span>Normal</span>
          </b-radio-button>
        </b-field>
      </div>
    </div>
    <div class="is-clearfix"></div>
    <template v-if="form.layout === 'normal'">
      <page-editor-normal v-for="page in form.pages" :key="page.id" :page="page" />
    </template>
    <template v-if="form.layout === 'split'">
      <page-editor-split v-for="page in form.pages" :key="page.id" :page="page" />
    </template>
  </div>
</template>

<script>
import Form from '@/services/Forms';
import PageEditorNormal from '@/components/PageEditorNormal.vue';
import PageEditorSplit from '@/components/PageEditorSplit.vue';

export default {
  components: {
    PageEditorNormal,
    PageEditorSplit
  },
  data: function () {
    return {
      form: {},
      selectedForm: '',
      initial: '',
      div: '123test',
      formsList: []
    };
  },
  created: async function () {
    this.formsList = await Form.list();
  },
  watch: {
    selectedForm: async function (newVal, oldVal) {
      if (newVal !== '') {
        this.form = await Form.find(newVal);
        this.initial = JSON.stringify(this.form);
      }
    }
  },
  methods: {
    selectForm: async function (form) {
    },

    save: async function () {
      await Form.put(this.form);
      this.initial = JSON.stringify(this.form);
    }
  }
};
</script>

<style lang="scss">
@import '@/assets/sass/_variables.scss';

.form-editor {
  border: 1px solid $dark-blue;
  padding: 1em;
}

.input-creator {
  height: 100%;
  padding: 15px 0;
  border: 1px solid $grey;
}
</style>
