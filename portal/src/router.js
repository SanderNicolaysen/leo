import Vue from 'vue'
import Router from 'vue-router'
import Start from './views/Start.vue'
import Grabticket from './views/Grabticket.vue'
import Booth from './views/Booth.vue'
import Forms from './views/Forms.vue'

Vue.use(Router)

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
      path: '/booth',
      name: 'booth',
      component: Booth
    },
    {
      path: '/skjema/:name',
      name: 'forms',
      component: Forms
    }/*,
    {
      path: '/example-path',
      name: 'example',
      component: Example
    }
    */
  ]
})
