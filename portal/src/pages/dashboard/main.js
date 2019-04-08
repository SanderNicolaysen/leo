import Vue from 'vue';
import i18n from '@/lang/i18n';
import Dashboard from './Dashboard.vue';
import router from './router';
import VeeValidate, { Validator } from 'vee-validate';
import no from 'vee-validate/dist/locale/nb_NO';
import './../../../node_modules/@mdi/font/scss/materialdesignicons.scss';
import Buefy from 'buefy';
import '@/assets/sass/dashboard.scss';
import '@/assets/sass/app.scss';

Vue.config.productionTip = false;

Vue.use(Buefy);
Vue.use(VeeValidate);

Validator.localize('no', no);

new Vue({
  i18n,
  router,
  render: h => h(Dashboard)
}).$mount('#app');
