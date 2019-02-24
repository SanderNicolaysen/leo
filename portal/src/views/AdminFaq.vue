<template>
  <div>
    <navbar />
    <div class="container">
      <nav class="block">
        <div class="tabs is-centered">
          <ul>
            <li v-for="item in options" :key="item.id" v-on:click.prevent="tabChange(item, $event)"><a>{{ item.option }}</a></li>
          </ul>
        </div>
      </nav>

      <div class="box">
        <h1 class="title has-text-centered">{{ $t('leggTilNyFaq') }}</h1>
          <form class="block" v-on:submit.prevent="addFaq" method="POST">
            <div class="field">
              <div class="control">
                <input class="input" type="text" :placeholder="$t('spørsmål')" v-model="form.question">
              </div>
            </div>
            <div class="field">
              <div class="control">
                <input class="input" type="text" :placeholder="$t('svar')" v-model="form.answer">
              </div>
            </div>
            <div class="field">
              <div class="control">
                <input class="input" type="text" placeholder="Statement" v-model="form.statement">
              </div>
            </div>
            <div class="block">
              <button type="submit" class="button is-primary" @click.prevent="addFaq">{{$t('leggTil')}}</button>
            </div>
          </form>

        <table class="table is-hoverable is-fullwidth is-striped">
          <thead>
            <tr>
              <th scope="col">Nr</th>
              <th scope="col">{{$t('spørsmål')}}</th>
              <th scope="col">{{$t('svar')}}</th>
              <th scope="col">Statement</th>
            </tr>
          </thead>
          <draggable v-model="faqs" :element="'tbody'" :list="faqs" :options="{animation:200}" @change="updateFaqs">
            <tr v-for="(item, index) in faqs" :key="item.id">
              <template v-if="isEditing !== item.id">
                <td>{{ index + 1 }}</td>
                <td>{{ item.question }}</td>
                <td>{{ item.answer }}</td>
                <td>{{ item.statement }}</td>
                <td>
                  <div class="buttons has-addons">
                    <span class="button is-primary" @click='isEditing = item.id'>{{$t('rediger')}}</span>
                    <span class="button is-danger" @click='deleteFaq(item)'>{{$t('slett')}}</span>
                  </div>
                </td>
              </template>

              <template v-else>
                <td>{{ index + 1 }}</td>
                <td>
                  <div class="control">
                    <input class="input" type="text" v-model='item.question'>
                  </div>
                </td>
                <td>
                  <div class="control">
                    <input class="input" type="text" v-model='item.answer'>
                  </div>
                </td>
                <td>
                  <div class="control">
                    <input class="input" type="text" v-model='item.statement'>
                  </div>
                </td>
                <td>
                  <div class="buttons has-addons">
                    <span class="button is-primary" @click='updateFaq(item)'>{{$t('oppdater')}}</span>
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
// import Faq from '@/components/Faq'

import Faq from '@/services/Faqs.js'
import draggable from 'vuedraggable'

export default {
  name: 'adminFaq',
  components: {
    draggable
  },
  data () {
    return {
      options: [
        { id: 0, option: 'Pass', queryString: 'pass' },
        { id: 1, option: 'Anmeld tyveri eller skadeverk', queryString: 'tyveri-og-skadeverk' },
        { id: 2, option: 'Hente beslag', queryString: 'beslag' },
        { id: 3, option: 'Bot', queryString: 'bot' },
        { id: 4, option: 'Våpen', queryString: 'våpen' },
        { id: 5, option: 'Avhør', queryString: 'avhør' }
      ],
      faqs: [],
      currentChoice: null,
      form: {
        subject: '',
        question: '',
        answer: '',
        statement: ''
      },
      isEditing: null
    }
  },
  created () {
  },
  methods: {
    tabChange: async function (subject, event) {
      const faq = await Faq.getFaqs(subject.queryString)
      this.faqs = faq
      this.currentChoice = subject.queryString

      // Remove the is-active class on all choices and set the class on the currentChoice
      const ul = event.target.parentElement.parentElement;
      const li = event.target.parentElement;
      for (let i = 0; i < ul.children.length; i++) {
        ul.children[i].classList.remove('is-active')
      }
      li.classList.add('is-active')
    },
    deleteFaq: async function (item) {
      await Faq.deleteFaq(item)
      this.faqs.splice(item.id, 1)
      this.faqs.map((faq, index) => {
        faq.id = index
      })
    },
    updateFaq: async function (item) {
      await Faq.updateFaq(item)
      this.isEditing = null
    },
    updateFaqs: async function () {
      this.faqs.map((faq, index) => {
        faq.id = index
      })

      await Faq.updateFaqs(this.faqs)
    },
    exitFaq: function () {
      this.isEditing = null
    },
    addFaq: async function () {
      this.form.subject = this.currentChoice
      const response = await Faq.postFaq(this.form)
      this.faqs.push(response.faq)

      // Remove text from input field
      this.form.answer = ''
      this.form.question = ''
      this.form.statement = ''
    }
  }
}
</script>

<style scoped>

</style>
