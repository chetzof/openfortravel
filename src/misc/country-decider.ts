import { Cookies } from 'quasar'
import { Route } from 'vue-router'

import { fetchCurrentCountryCode } from 'src/api/ip-api'
import { cookies, storeInstance } from 'src/boot/store'

export async function decideOnCountry(
  route: Route,
  cookies: Cookies,
): Promise<string> {
  const countryCodeSources: (() => string | Promise<string>)[] = [
    () => route.params.originCode,
    () => cookies.get('country'),
    fetchCurrentCountryCode,
  ]

  for (const countryCodeSource of countryCodeSources) {
    const result = await countryCodeSource()
    if (result) {
      return result
    }
  }

  return 'us'
}

export function getCurrentCountry(): string {
  return storeInstance.state.detectedCountry
}

export function persistCountry(countryCode: string): void {
  if (getCurrentCountry() === countryCode) {
    return
  }

  storeInstance.commit('setDetectedCountry', countryCode)
  cookies.set('country', countryCode, {
    path: '/',
  })
}