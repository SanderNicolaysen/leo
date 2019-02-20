import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

const messages = {
  'no': {
    trekkKølapp: 'Trekk kølapp'
  },
  'en': {
    trekkKølapp: 'Press for ticket'
  }
}

const i18n = new VueI18n({
  locale: 'no', // set locale
  fallbackLocale: 'en', // set fallback locale
  messages // set locale messages
})

export default i18n
