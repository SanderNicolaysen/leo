import Vue from 'vue';
import queueNumberDisplay from './views/queueNumberDisplay';

Vue.config.productionTip = false;

new Vue({
  render: h => h(queueNumberDisplay)
}).$mount('#app');
