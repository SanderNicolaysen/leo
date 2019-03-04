import Vue from 'vue';
import App from './App.vue';
import router from './router';
import i18n from './lang/i18n';
import InquiryPlugin from './InquiryPlugin';
import './assets/sass/app.scss';
import Navbar from './components/NavBar';
import Buefy from 'buefy';
import 'buefy/dist/buefy.css';

Vue.config.productionTip = false;

Vue.use(Buefy);
Vue.use(InquiryPlugin);
Vue.component('navbar', Navbar);

new Vue({
  i18n,
  router,
  render: h => h(App)
}).$mount('#app');
