<template>
  <div>
    <div class="container">
      <nav class="block">
        <div class="tabs is-centered">
          <ul>
            <li v-for="item in options" :key="item.id" v-on:click.prevent="tabChange(item)"><a>{{ item.option }}</a></li>
          </ul>
        </div>
      </nav>

      <div class="box">
        <h1 class="title has-text-centered">Legg til ny FAQ</h1>
          <form v-on:submit.prevent="addFaq" method="POST">
            <div class="field">
              <div class="control">
                <input class="input" type="text" placeholder="Question" v-model="form.question">
              </div>
            </div>
            <div class="field">
              <div class="control">
                <input class="input" type="text" placeholder="Answer" v-model="form.answer">
              </div>
            </div>
            <div class="field">
              <div class="control">
                <input class="input" type="text" placeholder="Statement" v-model="form.statement">
              </div>
            </div>
            <div class="block">
              <button type="submit" class="button is-primary" @click.prevent="addFaq">Add</button>
            </div>
          </form>
          <hr>

        <table class="table is-hoverable is-fullwidth is-striped">
          <thead>
              <th>Nr</th>
              <th>Question</th>
              <th>Answer</th>
              <th>Statement</th>
          </thead>
          <tbody>
            <tr v-for="(item, index) in faqs" :key="item.id">
              <template v-if="isEditing !== item.id">
                <td>{{ index + 1 }}</td>
                <td>{{ item.question }}</td>
                <td>{{ item.answer }}</td>
                <td>{{ item.statement }}</td>
                <td>
                  <div class="buttons has-addons">
                    <span class="button is-primary" @click='isEditing = item.id'>Rediger</span>
                    <span class="button is-danger" @click='deleteFaq(item)'>Slett</span>
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
                    <span class="button is-primary" @click='updateFaq(item)'>Oppdater</span>
                    <span class="button is-danger" @click='exitFaq'>Tibake</span>
                  </div>
                </td>
              </template>
            </tr>
          </tbody>
        </table>

      </div>
      </div> <!-- /.box -->

</div>
</template>

<script>
// import Faq from '@/components/Faq'

import Faq from '@/services/Faqs.js'

export default {
  name: 'adminFaq',
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
      currenChoice: 'pass',
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
    // Set pass as default
    this.tabChange({queryString: this.currenChoice}) 
  },
  methods: {
    tabChange: async function (subject) {
      const faq = await Faq.getFaqs(subject.queryString)
      this.faqs = faq
      this.currenChoice = subject.queryString
    },
    deleteFaq: async function (item) {
      await Faq.deleteFaq(item)
      this.faqs.pop()
    },
    updateFaq: async function (item) {
      await Faq.updateFaq(item)
      this.isEditing = null
    },
    exitFaq: function () {
      this.isEditing = null
    },
    addFaq: async function () {
      this.form.subject = this.currenChoice
      const response = await Faq.postFaq(this.form)
      this.faqs.push(response.faq)

      // Remove text from input field
      this.form.answer = '';
      this.form.question = '';
      this.form.statement = '';
    }

  }
}
</script>

<style scoped>

</style>
