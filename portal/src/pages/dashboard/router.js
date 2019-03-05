import Vue from 'vue';
import Router from 'vue-router';
import Login from './views/Login.vue';
import Layout from './views/Layout.vue';
import Oversikt from './views/Oversikt.vue';
import Booth from './views/Booth.vue';
import AdminFaq from './views/AdminFaq.vue';

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
      component: Layout,
      redirect: { name: 'dashboard' },
      children: [
        { path: '/', name: 'dashboard', component: Oversikt },
        { path: '/booth', name: 'booth', component: Booth },
        { path: '/admin/faq', name: 'adminFaq', component: AdminFaq }
        /*
        { path: '/example-path', name: 'example', component: Example }
        */
      ]
    }
  ]
});
