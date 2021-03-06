import { set } from 'lodash'
import { IVueI18n } from 'vue-i18n'
import VueRouter from 'vue-router'

import { serverCache } from '@/front/src/misc/server-cache'
import { createGenericRouter } from '@/front/src/router/routes'
import { createVueI18n } from '@/shared/src/misc/i18n'

export const routesThatNeedLocalization = ['origin', 'destination', 'index-targeted']
let clonedI18n: IVueI18n
function getLocalizedRouter(locale: string): VueRouter {
  if (!clonedI18n) {
    clonedI18n = createVueI18n(serverCache.i18nMessages)
  }

  clonedI18n.locale = locale
  return createGenericRouter(clonedI18n)
}

export function pregenerateLocalizableRouter(): Record<string, Record<string, string>> {
  const routes: Record<string, Record<string, string>> = {}

  for (const locale of serverCache.availableLocales) {
    const router = getLocalizedRouter(locale)
    for (const routeName of routesThatNeedLocalization) {
      set(
        routes,
        [routeName, locale],
        router.resolve({
          name: 'origin',
          params: {
            locale: locale,
            originSlug: '*originSlug*',
            destinationSlug: '*destinationSlug*',
          },
        }).href,
      )
    }
  }
  return routes
}

export function replacePlaceholders(
  route: string,
  placeholders: Record<string, string>,
): string {
  for (const [placeholder, replacement] of Object.entries(placeholders)) {
    route = route.replace(`*${placeholder}*`, replacement)
  }

  return route
}

export function resolveRoute(
  routeName: string,
  locale: string,
  placeholders: Record<string, string>,
): string {
  return replacePlaceholders(serverCache.localizedRoutes[routeName][locale], placeholders)
}
