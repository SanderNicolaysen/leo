import Vue from 'vue';
import Dashboard from './Dashboard.vue';
import router from './router';
import '@/assets/sass/dashboard.scss';
import '@/assets/sass/app.scss';

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(Dashboard)
}).$mount('#app');
