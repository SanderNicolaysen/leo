import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/views/Login.vue';
import Dashboard from '@/views/Dashboard.vue';
import Booth from '@/views/Booth.vue';
import AdminFaq from '@/views/AdminFaq.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/booth',
      name: 'booth',
      component: Booth
    },
    {
      path: '/admin/faq',
      name: 'adminFaq',
      component: AdminFaq
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
