import { Cookies } from 'quasar'

import Vue from 'vue'
import { IVueI18n } from 'vue-i18n'
import VueRouter from 'vue-router'
import { Store } from 'vuex'

let storeInstance: Store<never>

export function setStore(instance: typeof storeInstance): void {
  storeInstance = instance
}

export function useStore(): typeof storeInstance {
  return storeInstance
}

const eventBusInstance = new Vue()
export function useEventBus(): Vue {
  return eventBusInstance
}

let routerInstance: VueRouter

export function setRouter(instance: VueRouter): void {
  routerInstance = instance
}

export function useRouter(): VueRouter {
  return routerInstance
}

let i18nInstance: IVueI18n

export function setI18n(instance: typeof i18nInstance): void {
  i18nInstance = instance
}

export function useI18n(): typeof i18nInstance {
  return i18nInstance
}

let cookiesInstance: Cookies

export function setCookies(instance: typeof cookiesInstance): void {
  cookiesInstance = instance
}

export function useCookies(): typeof cookiesInstance {
  return cookiesInstance
}
