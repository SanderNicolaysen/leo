<template>
  <div>
    <navbar />
    <div class="container">
      <nav class="block">
        <div class="tabs is-centered">
          <ul>
            <li v-for="option in options" :key="option.id" v-on:click.prevent="tabChange(option, $event)"><a>{{
                option.option }}</a></li>
          </ul>
        </div>
      </nav>

      <div class="box">
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
          <draggable v-model="faqs" :element="'tbody'" :list="faqs" :options="{animation:200, draggable: '.hasDrag'}"
            @change="updateFaqs">
            <tr class="drag hasDrag" v-for="(faq, index) in faqs" :key="faq._id">
              <template v-if="isEditing !== faq._id">
                <td>{{ index + 1 }}</td>
                <template v-if="currentChoice === all">{{ faq.subject }}</template>
                <td>{{ faq.question }}</td>
                <td>{{ faq.answer }}</td>
                <td>
                  <div class="buttons has-addons">
                    <span class="button is-primary" @click='edit(faq)'>{{$t('rediger')}}</span>
                    <span class="button is-danger" @click='deleteFaq(faq, index)'>{{$t('slett')}}</span>
                  </div>
                </td>
              </template>

              <template v-else>
                <td>{{ index + 1 }}</td>
                <template v-if="currentChoice === all">{{ faq.subject }}</template>
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
                  <div class="buttons has-addons">
                    <span class="button is-success" @click='updateFaq(faq)'>{{$t('oppdater')}}</span>
                    <span class="button is-danger" @click='exitFaq'>{{$t('tilbake')}}</span>
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

export default {
  name: 'adminFaq',
  components: {
    draggable
  },
  data () {
    return {
      options: [
        { id: 0, option: 'Alle', subject: 'alle' },
        { id: 1, option: 'Pass', subject: 'pass' },
        { id: 2, option: 'Anmeld tyveri eller skadeverk', subject: 'tyveri-og-skadeverk' },
        { id: 3, option: 'Hente beslag', subject: 'beslag' },
        { id: 4, option: 'Bot', subject: 'bot' },
        { id: 5, option: 'Våpen', subject: 'våpen' },
        { id: 6, option: 'Avhør', subject: 'avhør' }
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
      activeTab: 0
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
    tabChange: async function (option, event) {
      if (option.subject !== this.all) {
        this.faqs = await Faq.getFaqs(option.subject);
      } else {
        this.faqs = await Faq.getAllFaqs();
      }

      this.currentChoice = option.subject;

      // Remove the is-active class on all choices and set the class on the currentChoice
      const ul = event.target.parentElement.parentElement;
      const li = event.target.parentElement;
      for (let i = 0; i < ul.children.length; i++) {
        ul.children[i].classList.remove('is-active');
      }
      li.classList.add('is-active');
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
    updateFaq: async function (faq) {
      await Faq.updateFaq(faq);
      this.isEditing = null;

      const tr = document.querySelectorAll('.drag');
      if (this.isEditing === null) {
        tr.forEach(element => {
          element.classList.add('hasDrag');
        });
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
    exitFaq: async function () {
      this.isEditing = null;

      const tr = document.querySelectorAll('.drag');
      if (this.isEditing === null) {
        tr.forEach(element => {
          element.classList.add('hasDrag');
        });
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

      const response = await Faq.postFaq(this.form);
      this.faqs.push(response.faq);

      // Remove text from input field
      this.form.answer = '';
      this.form.question = '';
    },
    edit: function (faq) {
      this.isEditing = faq._id;

      const tr = document.querySelectorAll('.drag');
      if (this.isEditing !== null) {
        tr.forEach(element => {
          element.classList.remove('hasDrag');
        });
      }
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
    }
  }
};
</script>

<style scoped>

</style>
