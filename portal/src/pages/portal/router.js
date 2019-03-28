import Vue from 'vue';
import Router from 'vue-router';
import Start from './views/Start.vue';
import Grabticket from './views/Grabticket.vue';
import Forms from './views/Forms.vue';
import Subcategory from './views/Subcategory.vue';
import lostFound from './views/lostFound.vue';
import UserAppointment from './views/UserAppointment.vue';
import Pass from './views/Pass.vue';
import HenteLevere from './views/HenteLevere.vue';
import Garantiskjema from './views/Garantiskjema.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'start',
      component: Start
    },
    {
      path: '/grabticket',
      name: 'grabticket',
      component: Grabticket
    },
    {
      path: '/skjema/:name',
      name: 'forms',
      component: Forms
    },
    {
      path: '/anmelde/:page',
      name: 'anmelde',
      component: Subcategory
    },
    {
      path: '/lost-found',
      name: 'lostFound',
      component: lostFound
    },
    {
      path: '/userAppointment',
      name: 'userAppointments',
      component: UserAppointment
    },
    {
      path: '/pass/:page',
      name: 'pass',
      component: Pass
    },
    {
      path: '/henteLevere/:page',
      name: 'henteLevere',
      component: HenteLevere
    },
    {
      path: '/garantiskjema/:page',
      name: 'garantiskjema',
      component: Garantiskjema
    }
    /*,
    {
      path: '/example-path',
      name: 'example',
      component: Example
    }
    */
  ]
});
