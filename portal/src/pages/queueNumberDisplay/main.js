import Vue from 'vue';
import queueNumberDisplay from './views/queueNumberDisplay';
import 'bulma';

Vue.config.productionTip = false;

new Vue({
  render: h => h(queueNumberDisplay)
}).$mount('#app');
