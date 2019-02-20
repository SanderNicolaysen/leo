import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

const messages = {
  'no': {
    trekkKølapp: 'Trekk kølapp',
    doSomeStepsTop: 'Eller, gjør noen enkle steg slik at vi kan hjelpe deg raskere!',
    doSomeStepsBottom: 'Start med å velge en type henvendelse under',
    pass: 'Pass',
    anmeldeTyveri: 'Anmelde tyveri eller skadeverk',
    henteBeslag: 'Hente beslag',
    bot: 'Bot',
    våpen: 'Våpen',
    avhør: 'Avhør',
    taKølapp: 'Vennligst ta kølappen'
  },
  'en': {
    trekkKølapp: 'Press for ticket',
    doSomeStepsTop: 'Or, do some simple steps so that we can help you faster!',
    doSomeStepsBottom: 'Start by choosing one of the following inquiry-types',
    pass: 'Passport',
    anmeldeTyveri: 'Report theft or damage',
    henteBeslag: 'Retrieve seizure',
    bot: 'Fine',
    våpen: 'Weapon',
    avhør: 'Questioning',
    taKølapp: 'Please take your ticket'
  }
}

const i18n = new VueI18n({
  locale: 'no', // set locale
  fallbackLocale: 'en', // set fallback locale
  messages // set locale messages
})

export default i18n
