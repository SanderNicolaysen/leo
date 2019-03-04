import Vue from 'vue';
import Router from 'vue-router';
import Start from './views/Start.vue';
import Grabticket from './views/Grabticket.vue';
import Booth from './views/Booth.vue';
import Forms from './views/Forms.vue';
import Subcategory from './views/Subcategory.vue';
import AdminFaq from './views/AdminFaq.vue';
import Login from './views/Login.vue';
import lostFound from './views/lostFound.vue';
import lostFoundForm from './views/lostFoundForm.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'start',
      component: Start
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/grabticket',
      name: 'grabticket',
      component: Grabticket
    },
    {
      path: '/booth',
      name: 'booth',
      component: Booth
    },
    {
      path: '/skjema/:name',
      name: 'forms',
      component: Forms
    },
    {
      path: '/subcategory',
      name: 'subcategory',
      component: Subcategory
    },
    {
      path: '/admin/faq',
      name: 'adminFaq',
      component: AdminFaq
    },
    {
      path: '/lost-found',
      name: 'lostFound',
      component: lostFound
    },
    {
      path: '/lost-found/form/:name',
      name: 'lostFoundForm',
      component: lostFoundForm
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
