import { Route } from 'vue-router'

import { fetchCurrentCountryCode } from '@/shared/src/api/ip-api'
import { useCookies, useStore } from '@/shared/src/composables/use-plugins'
import { transformOriginSlugToCode } from '@/shared/src/modules/country-list/country-list-helpers'

export async function decideOnCountry(
  route: Route,
  skipRemote: boolean,
): Promise<string> {
  const countryCodeSources: (() => string | Promise<string>)[] = [
    () => transformOriginSlugToCode(route.params.originSlug),
    () => useCookies().get('country'),
  ]

  if (!skipRemote) {
    countryCodeSources.push(fetchCurrentCountryCode)
  }

  for (const countryCodeSource of countryCodeSources) {
    const result = await countryCodeSource()
    if (result) {
      return result
    }
  }

  return 'us'
}

export function getCurrentCountry(): string {
  return useStore().state['detectedCountry']
}

export function setCurrentCountry(
  countryCode: string,
  saveToCookie: boolean,
): void {
  if (getCurrentCountry() === countryCode) {
    return
  }

  useStore().commit('setDetectedCountry', countryCode)
  if (saveToCookie) {
    useCookies().set('country', countryCode, {
      path: '/',
    })
  }
}
