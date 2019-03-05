import Vue from 'vue';
import i18n from '@/lang/i18n';
import Dashboard from './Dashboard.vue';
import router from './router';
import Buefy from 'buefy';
import '@/assets/sass/dashboard.scss';
import '@/assets/sass/app.scss';

Vue.config.productionTip = false;

Vue.use(Buefy);

new Vue({
  i18n,
  router,
  render: h => h(Dashboard)
}).$mount('#app');
