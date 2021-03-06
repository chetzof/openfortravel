import { LocaleMessageObject } from 'vue-i18n'
import { MutationTree } from 'vuex'

import { RootState, StateInterface } from '@/front/src/store/state'
import { MutationSignatures, MutationTypes } from '@/front/src/store/types/mutations'
import { MappedPlainDestinationCollection } from '@/shared/src/api/destinations/models'
import { MappedPlainRestrictionCollection } from '@/shared/src/api/restrictions/models'
import { useCookies } from '@/shared/src/composables/use-plugins'

export const mutations: MutationTree<RootState> & MutationSignatures = {
  [MutationTypes.setCountryToContinentMap](state, map: Record<string, string>) {
    state.countryToContinentMap = map
  },
  [MutationTypes.setCountrySelectorLoading](state, value: boolean) {
    state.countrySelectorLoading = value
  },
  [MutationTypes.setDetectedCountry](state: StateInterface, country: string) {
    state.detectedCountry = country
    useCookies().set('country', country, { path: '/' })
  },
  [MutationTypes.setLocales](state: StateInterface, locales: LocaleMessageObject) {
    state.locales = locales
  },
  [MutationTypes.setAvailableLocales](state: StateInterface, locales: string[]) {
    state.availableLocales = locales
  },
  [MutationTypes.setLabeledLocales](
    state: StateInterface,
    locales: StateInterface['labeledLocales'],
  ) {
    state.labeledLocales = locales
  },
  [MutationTypes.setServerLocale](state: StateInterface, serverLocale: string) {
    state.serverLocale = serverLocale
    useCookies().set('locale', serverLocale, { path: '/' })
  },
  [MutationTypes.setHostRules](
    state: StateInterface,
    hostRules: MappedPlainDestinationCollection,
  ) {
    state.hostRules = hostRules
  },
  [MutationTypes.setSharedRestrictions](
    state: RootState,
    {
      originCode,
      restrictions,
    }: {
      originCode: string
      restrictions: MappedPlainRestrictionCollection
    },
  ) {
    state.sharedRestrictions = {
      originCode,
      restrictions,
    }
  },
}
