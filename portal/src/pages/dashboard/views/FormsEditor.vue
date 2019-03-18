<template>
  <div>
    <div class="field is-horizontal">
      <div class="field-label">
        <label class="label">Velg skjema:</label>
      </div>
      <div class="field-body">
        <div class="control">
          <div class="select">
            <select v-model="selectedForm" v-on:change="selectForm($event)">
              <option disabled value=""></option>
              <option v-for="{ name, normalizedName } in formsList" :key="normalizedName" :value="normalizedName">{{ name }}</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <div class="is-clearfix"></div>
    <div class="buttons is-pulled-left" v-if="form !== null">
      <button class="button is-success" @click="save($event)" :disabled="initial === JSON.stringify(form)">Lagre</button>
      <button class="button" @click="form = JSON.parse(initial)" :disabled="initial === JSON.stringify(form)">Angre endringer</button>
    </div>

    <div class="field is-horizontal is-pulled-right" v-if="form !== null">
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
    <div class="form-editor" v-if="form !== null">
      <template v-if="form.layout === 'normal'">
        <page-editor-normal v-for="page in form.pages" :key="page.id" :page="page" v-on:destroy="deletePage(page.id)" />
      </template>
      <template v-if="form.layout === 'split'">
        <page-editor-split v-for="page in form.pages" :key="page.id" :page="page" v-on:destroy="deletePage(page.id)" />
      </template>

      <div class="level new-page-button">
        <div class="level-item">
          <div class="field has-addons">
            <div class="control">
              <span class="button">Ny side</span>
            </div>
            <div class="control">
              <button class="button" @click="addPage()">
                <span class="icon">
                  <img src="/icons/baseline-add.svg" alt="+" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
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
      form: null,
      selectedForm: '',
      initial: '',
      formsList: []
    };
  },
  created: async function () {
    this.formsList = await Form.list();
  },
  watch: {
  },
  methods: {
    selectForm: function (event) {
      if (this.initial !== '' && this.initial !== JSON.stringify(this.form)) {
        event.preventDefault();
        this.$dialog.confirm({
          message: 'Vil du bytte skjema uten å lagre?',
          confirmText: 'Fortsett uten å lagre',
          cancelText: 'Avbryt',
          onCancel: () => { },
          onConfirm: () => { this.load(event.target.value); }
        });
      } else {
        this.load(event.target.value);
      }
    },

    load: async function () {
      this.form = await Form.find(event.target.value);
      this.initial = JSON.stringify(this.form);
      if (this.form === undefined) {
        this.$toast.open({
          duration: 3000,
          message: 'Kan ikke laste inne skjemaet. Prøv igjen.',
          position: 'is-bottom',
          type: 'is-danger'
        });
      }
    },

    save: async function (event) {
      event.target.classList.toggle('is-loading');
      const res = await Form.put(this.form);
      if (res === false) {
        this.$toast.open({
          duration: 3000,
          message: 'Kan ikke lagre. Prøv igjen.',
          position: 'is-bottom',
          type: 'is-danger'
        });
      } else {
        this.initial = JSON.stringify(this.form);
      }

      setTimeout(() => {
        event.target.classList.toggle('is-loading');
      }, 500);
    },

    addPage: function () {
      const lastPage = _.last(this.form.pages);
      const newPage = {
        id: this.form.pages.length,
        title: 'Tittel',
        subtitle: 'Undertittel',
        info: '',
        elements: [],
        prevPage: lastPage === undefined ? null : lastPage.id,
        nextPage: null
      };
      lastPage.nextPage = newPage.id;
      this.form.pages.push(newPage);
    },

    deletePage: function (pageId) {
      const index = this.form.pages.findIndex(p => { return p.id === pageId; });
      const page = this.form.pages[index];
      if (page.prevPage !== null) {
        const prevPage = _.find(this.form.pages, p => { return p.id === page.prevPage; });
        prevPage.nextPage = page.nextPage;
      }
      if (page.nextPage !== null) {
        const nextPage = _.find(this.form.pages, p => { return p.id === page.nextPage; });
        nextPage.prevPage = page.prevPage;
      }
      this.form.pages.splice(index, 1);
    }
  }
};
</script>

<style lang="scss">
@import '@/assets/sass/_variables.scss';
.form-editor {
  padding-bottom: 100px;
}

.form-editor .new-page-button {
  padding: 25px 0;
}
</style>
