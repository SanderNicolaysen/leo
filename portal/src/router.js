import Vue from 'vue'
import Router from 'vue-router'
import Start from './views/Start.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'start',
      component: Start
    }/*,
    {
      path: '/example-path',
      name: 'example',
      component: Example
    }
    */
  ]
})
