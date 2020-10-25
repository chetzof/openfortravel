import { route } from 'quasar/wrappers'
import VueRouter from 'vue-router'
import { Store } from 'vuex'

import { StateInterface } from '../store'

import routes from './routes'

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

// eslint-disable-next-line import/no-unused-modules
export default route<Store<StateInterface>>(function ({ Vue }) {
  Vue.use(VueRouter)
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes: routes(),

    // Leave these as is and change from quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE,
  })

  return Router
})
