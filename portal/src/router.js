import Vue from 'vue'
import Router from 'vue-router'
import Start from './views/Start.vue'
import Grabticket from './views/Grabticket.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'start',
      component: Start
    }, {
      path: '/grabticket',
      name: 'grabticket',
      component: Grabticket
    }/*,
    {
      path: '/example-path',
      name: 'example',
      component: Example
    }
    */
  ]
})
