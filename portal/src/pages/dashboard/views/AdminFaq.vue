<template>
  <div>
    <div class="">
      <nav class="block">
        <div class="tabs is-centered">
          <ul>
            <li v-for="option in options" :key="option.id" v-on:click.prevent="tabChange(option, $event)" :class="{ 'is-active': option.active }"><a>{{
                option.option }}</a></li>
          </ul>
        </div>
      </nav>

      <div class="box">
        <div class="columns is-pulled-right">
          <a class="column" @click="changeLocale('no')">
            <img src="@/assets/icons/norway.svg" alt="country-Norway" width="50" height="60">
          </a>
          <a class="column" @click="changeLocale('en')">
            <img src="@/assets/icons/uk.svg" alt="country-UK" width="50" height="60">
          </a>
        </div>
        <h1 class="title has-text-centered">{{ $t('leggTilNyFaq') }}</h1>
        <form class="block" v-on:post.prevent="addFaq()" method="POST">
          <section>
            <b-field :label="$t('spørsmål')" labelFor="question">
              <b-input id="question" v-model="form.question"></b-input>
            </b-field>

            <b-field :label="$t('svar')" labelFor="answer">
              <b-input id="answer" v-model="form.answer"></b-input>
            </b-field>

            <div class="field is-grouped">
              <div class="control">
                <button type="submit" class="button is-primary" @click.prevent="addFaq()">{{$t('leggTil')}}</button>
              </div>

              <template v-if="currentChoice === 'alle'">
                <b-field>
                  <b-select placeholder="Velg en kategori" v-model="selectionChoice">
                    <option v-for="item in selections" :value="item.subject" :key="item.id">
                      {{ item.option }}
                    </option>
                  </b-select>
                </b-field>
              </template>
            </div>

          </section>
        </form>

        <table class="table is-hoverable is-fullwidth is-striped">
          <thead>
            <tr>
              <th scope="col">Nr</th>
              <template v-if="currentChoice === all">
                <th scope="col">Kategori</th>
              </template>
              <th scope="col">{{$t('spørsmål')}}</th>
              <th scope="col">{{$t('svar')}}</th>
              <th></th>
            </tr>
          </thead>
          <draggable v-model="faqs" :element="'tbody'" :list="faqs" :options="{animation:200, draggable: '.hasDragClass'}"
            @change="updateFaqs">
            <tr :class="{ hasDragClass: hasDrag}" v-for="(faq, index) in faqs" :key="faq._id">
              <template v-if="isEditing !== faq._id">
                <td>{{ index + 1 }}</td>
                <td v-if="currentChoice === all">{{ currentOption(faq) }}</td>
                <td>{{ getSubstring(faq.question) }}</td>
                <td>{{ getSubstring(faq.answer) }}</td>
                <td>
                  <div class="buttons has-addons flex-nowrap">
                    <span class="button is-primary" @click='edit(faq)'>{{$t('rediger')}}</span>
                    <span class="button is-danger" @click='deleteFaq(faq, index)'>{{$t('slett')}}</span>
                  </div>
                </td>
              </template>

              <template v-else>
                <td>{{ index + 1 }}</td>
                <td v-if="currentChoice === all">{{ currentOption(faq) }}</td>
                <td>
                  <div class="control">
                    <textarea class="textarea" v-model='faq.question'></textarea>
                  </div>
                </td>
                <td>
                  <div class="control">
                    <textarea class="textarea" v-model='faq.answer'></textarea>
                  </div>
                </td>
                <td>
                  <div class="buttons has-addons flex-nowrap">
                    <span class="button is-success" @click='updateFaq(faq)'>{{$t('oppdater')}}</span>
                    <span class="button is-danger" @click='exitFaq(faq)'>{{$t('tilbake')}}</span>
                  </div>
                </td>
              </template>
            </tr>
          </draggable>
        </table>

      </div>
    </div> <!-- /.box -->
  </div>
</template>

<script>
import _ from 'lodash';

import Faq from '@/services/Faqs.js';
import draggable from 'vuedraggable';
import getSubstring from '@/lang/utils.js';

export default {
  name: 'adminFaq',
  components: {
    draggable
  },
  data () {
    return {
      options: [
        { id: 0, option: 'Alle', subject: 'alle', active: true },
        { id: 1, option: 'Pass', subject: 'pass', active: false },
        { id: 2, option: 'Anmelde', subject: 'tyveri-og-skadeverk', active: false },
        { id: 3, option: 'Hente/Levere', subject: 'henteLevere', active: false },
        { id: 4, option: 'Garantiskjema', subject: 'garantiskjema', active: false },
        { id: 5, option: 'Avtale', subject: 'Avtale', active: false }
      ],
      faqs: [],
      currentChoice: null,
      selectionChoice: null,
      form: {
        subject: '',
        question: '',
        answer: ''
      },
      isEditing: null,
      activeTab: 0,
      hasDrag: false,
      initialFaq: {
        question: null,
        answer: null
      }
    };
  },
  created: async function () {
    const faq = await Faq.getAllFaqs();
    this.faqs = faq;
    this.currentChoice = this.all;
  },
  computed: {
    all: function () {
      return _.find(this.options, {
        'subject': 'alle'
      }).subject;
    },
    // return options without the first element.
    selections: function () {
      return _.drop(this.options);
    }
  },
  methods: {
    currentOption: function (faq) {
      return _.find(this.options, { subject: faq.subject }).option;
    },
    tabChange: async function (option, event) {
      if (option.subject !== this.all) {
        this.faqs = await Faq.getFaqs(option.subject);
      } else {
        this.faqs = await Faq.getAllFaqs();
      }

      this.currentChoice = option.subject;

      _.find(this.options, { active: true }).active = false;
      _.find(this.options, { subject: this.currentChoice }).active = true;

      if (this.currentChoice === this.all) {
        this.hasDrag = false;
      } else {
        this.hasDrag = true;
      }
    },
    deleteFaq: async function (faq, index) {
      this.$dialog.confirm({
        title: 'Sletter FAQ',
        message: 'Er du sikker på at du vill <b>slette</b> dette spørsmålet? Dette kan ikke hentes tilbake.',
        confirmText: 'Slett FAQ',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: async () => {
          this.$toast.open('Slettet FAQ');
          await Faq.deleteFaq(faq);
          this.faqs.splice(index, 1);
        }
      });
    },
    addNoQandA: function (faq) { // Add norwegian parts to the faq's question and answer
      const noQ = this.initialFaq.question.split('|')[0];
      const noA = this.initialFaq.answer.split('|')[0];

      if (noQ !== '') { faq.question = noQ + '|' + faq.question; } else if (faq.question !== '') { faq.question = '' + '|' + faq.question; }

      if (noA !== '') { faq.answer = noA + '|' + faq.answer; } else if (faq.answer !== '') { faq.answer = '' + '|' + faq.answer; }
    },
    addEnQandA: function (faq) { // Add english parts to the faq's question and answer
      var enQ = null;
      var enA = null;

      const initialQ = this.initialFaq.question.split('|')[1];
      const initialA = this.initialFaq.answer.split('|')[1];

      if (initialQ != null) { enQ = initialQ; }

      if (initialA != null) { enA = initialA; }

      if (enQ !== null) { faq.question = faq.question + '|' + enQ; } else if (faq.question !== '') { faq.question = faq.question + '|' + ''; }

      if (enA !== null) { faq.answer = faq.answer + '|' + enA; } else if (faq.answer !== '') { faq.answer = faq.answer + '|' + ''; }
    },
    updateFaq: async function (faq) {
      if (this.$i18n.locale === 'no') { this.addEnQandA(faq); } else { this.addNoQandA(faq); }

      await Faq.updateFaq(faq);
      this.isEditing = null;
      if (this.currentChoice !== this.all) {
        this.hasDrag = true;
      }
      this.updateSuccessSnackbar();
    },
    updateFaqs: async function (faq, index) {
      // TODO: finn bedre løsning
      if (this.currentChoice === this.all) {
        return;
      }

      await Faq.updateFaqs(this.faqs);
    },
    exitFaq: async function (faq) {
      faq.question = this.initialFaq.question;
      faq.answer = this.initialFaq.answer;

      this.isEditing = null;
      if (this.currentChoice !== this.all) {
        this.hasDrag = true;
      }
    },
    addFaq: async function () {
      if (!this.selectionChoice && this.currentChoice === this.all) {
        this.chooseCategoryToast();
        return;
      }

      if (this.currentChoice === this.all) {
        this.form.subject = this.selectionChoice;
      } else {
        this.form.subject = this.currentChoice;
      }

      if (this.$i18n.locale === 'en') {
        this.form.question = this.form.question + '|' + this.form.question;
        this.form.answer = this.form.answer + '|' + this.form.answer;
      }

      const response = await Faq.postFaq(this.form);
      this.faqs.push(response.faq);

      // Remove text from input field
      this.form.answer = '';
      this.form.question = '';
    },
    edit: function (faq) {
      // If the admin presses edit while already editing another faq, set the previous edited faq to to it's initial question and answer
      if (this.isEditing != null) {
        var prevEditingFaq = this.faqs.find(function (faq) {
          return faq._id === this.isEditing;
        }, this);

        prevEditingFaq.question = this.initialFaq.question;
        prevEditingFaq.answer = this.initialFaq.answer;
      }

      this.initialFaq.question = faq.question;
      this.initialFaq.answer = faq.answer;

      faq.question = this.getSubstring(faq.question);
      faq.answer = this.getSubstring(faq.answer);

      this.isEditing = faq._id;
      this.hasDrag = false;
    },
    updateSuccessSnackbar () {
      this.$snackbar.open(`Lagret data suksessfullt`);
    },
    chooseCategoryToast () {
      this.$toast.open({
        duration: 5000,
        message: `Har du husket å velge kategori?`,
        position: 'is-bottom',
        type: 'is-danger'
      });
    },
    changeLocale (locale) {
      if (this.$i18n.locale !== locale) {
        this.$i18n.locale = locale;

        // If the admin edits a faq, translate it
        if (this.isEditing != null) {
          var faqEditing =
            this.faqs.find(function (faq) {
              return faq._id === this.isEditing;
            }, this);

          faqEditing.question = this.getSubstring(this.initialFaq.question);
          faqEditing.answer = this.getSubstring(this.initialFaq.answer);
        }
      }
    },
    getSubstring: function (string) {
      if (string != null) { return getSubstring(string, this); }
    }
  }
};
</script>

<style scoped>
</style>
