import Vue from 'vue'
import VueI18n from 'vue-i18n'
import no from './no'
import en from './en'

Vue.use(VueI18n)

const messages = {
  'no': no,
  'en': en
}

const i18n = new VueI18n({
  locale: 'no', // set locale
  fallbackLocale: 'en', // set fallback locale
  messages // set locale messages
})

export default i18n
