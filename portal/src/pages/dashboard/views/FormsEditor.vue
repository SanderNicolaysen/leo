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
      <div class="columns" v-if="form !== null">
        <a class="column" @click="changeLocale('no')">
          <img src="@/assets/icons/norway.svg" alt="country-Norway" width="50" height="60">
        </a>
        <a class="column" @click="changeLocale('en')">
          <img src="@/assets/icons/uk.svg" alt="country-UK" width="50" height="60">
        </a>
      </div>
    </div>

    <div class="is-clearfix"></div>
    <div class="buttons is-pulled-left" v-if="form !== null">
      <button class="button is-success" @click="save($event)" :disabled="isDisabled">Lagre</button>
      <button class="button" @click="form = JSON.parse(initial)" :disabled="isDisabled">Angre endringer</button>
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
import getSubstring from '@/lang/utils.js';

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
  computed: {
    isDisabled: function () {
      const initialObj = JSON.parse(this.initial);

      this.form.pages.forEach(function (page, i) {
        if (!page.title.includes('|')) {
          if (this.$i18n.locale === 'no') { this.addEn(this.$i18n, initialObj.pages[i], page, 'title'); } else { this.addNo(this.$i18n, initialObj.pages[i], page, 'title'); }
        } else if (!page.subtitle.includes('|')) {
          if (this.$i18n.locale === 'no') { this.addEn(this.$i18n, initialObj.pages[i], page, 'subtitle'); } else { this.addNo(this.$i18n, initialObj.pages[i], page, 'subtitle'); }
        } else if (!page.info.includes('|')) {
          if (this.$i18n.locale === 'no') { this.addEn(this.$i18n, initialObj.pages[i], page, 'info'); } else { this.addNo(this.$i18n, initialObj.pages[i], page, 'info'); }
        }
      }, this);

      return this.initial === JSON.stringify(this.form);
    }
  },
  methods: {
    getSubstring: function (string) {
      if (string != null) { return getSubstring(string, this); }
    },
    addEn: function (i18n, initialPage, page, field) { // Add english part to the page's field data
      i18n.locale = 'en';

      if (initialPage != null) {
        if (field === 'title') { page.title = page.title + '|' + this.getSubstring(initialPage.title); } else if (field === 'subtitle') { page.subtitle = page.subtitle + '|' + this.getSubstring(initialPage.subtitle); } else if (field === 'info') { page.info = page.info + '|' + this.getSubstring(initialPage.info); }
      } else {
        if (field === 'title') { page.title = page.title + '|' + 'Title'; } else if (field === 'subtitle') { page.subtitle = page.subtitle + '|' + 'Subtitle'; } else if (field === 'info') { page.info = page.info + '|' + ''; }
      }

      i18n.locale = 'no';
    },
    addNo: function (i18n, initialPage, page, field) { // Add norwegian part to the page's field data
      i18n.locale = 'no';

      if (initialPage != null) {
        if (field === 'title') { page.title = this.getSubstring(initialPage.title) + '|' + page.title; } else if (field === 'subtitle') { page.subtitle = this.getSubstring(initialPage.subtitle) + '|' + page.subtitle; } else if (field === 'info') { page.info = this.getSubstring(initialPage.info) + '|' + page.info; }
      } else {
        if (field === 'title') { page.title = 'Tittel' + '|' + page.title; } else if (field === 'subtitle') { page.subtitle = 'Undertittel' + '|' + page.subtitle; } else if (field === 'info') { page.info = '' + '|' + page.info; }
      }

      i18n.locale = 'en';
    },
    selectForm: function (event) {
      if (this.initial !== '' && this.initial !== JSON.stringify(this.form)) {
        event.preventDefault();
        this.$dialog.confirm({
          message: 'Vil du bytte skjema uten å lagre?',
          confirmText: 'Fortsett uten å lagre',
          cancelText: 'Avbryt',
          onCancel: () => {
            const initialObj = JSON.parse(this.initial);
            this.selectedForm = initialObj.normalizedName;
          },
          onConfirm: () => { this.load(event.target.value); }
        });
      } else {
        this.load(event.target.value);
      }
    },

    load: async function (value) {
      this.form = await Form.find(value);
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
        title: 'Tittel|Title',
        subtitle: 'Undertittel|Subtitle',
        info: '|',
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
    },
    changeLocale (locale) {
      if (this.$i18n.locale !== locale) {
        if (!this.isDisabled) {
          this.$dialog.confirm({
            message: 'Vil du bytte språk uten å lagre?',
            confirmText: 'Fortsett uten å lagre',
            cancelText: 'Avbryt',
            onCancel: () => { },
            onConfirm: () => {
              this.form = JSON.parse(this.initial);
              this.$i18n.locale = locale;
            }
          });
        } else { this.$i18n.locale = locale; }
      }
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

.columns a:hover {
  background-color: #fafafa;
}
</style>
