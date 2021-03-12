import { ActionTree } from 'vuex'

import {
  Actions,
  ActionTypes,
  CurrentCountryPair,
} from '@/front/src/pages/destination/store/action-types'
import { MutationTypes } from '@/front/src/pages/destination/store/mutations'
import { StateClass } from '@/front/src/pages/destination/store/state'
import { StateInterface } from '@/front/src/store'
import {
  findRestrictionByOriginAndDestination,
  findRestrictionsByDestination,
} from '@/shared/src/api/restrictions/repository'

export const actions: ActionTree<StateClass, StateInterface> & Actions = {
  async fetchReturnRestriction(
    { commit, state },
    { originCode, destinationCode },
  ) {
    if (
      state.returnRestriction &&
      state.returnRestriction.origin === originCode &&
      state.returnRestriction.destination === destinationCode
    ) {
      return
    }
    commit(
      MutationTypes.setReturnRestriction,
      await findRestrictionByOriginAndDestination(originCode, destinationCode),
    )
  },

  async fetchRelatedRestrictions({ commit, state }, destinationCode: string) {
    if (state.relatedRestrictions.destinationCode === destinationCode) {
      return
    }
    commit(MutationTypes.setRelatedRestrictions, {
      destinationCode,
      restrictions: await findRestrictionsByDestination(destinationCode),
    })
  },

  async fetch({ commit, dispatch }, countryPair: CurrentCountryPair) {
    commit(MutationTypes.setCurrentCountryPair, countryPair)
    await dispatch('fetchSharedRestrictions', countryPair.originCode, {
      root: true,
    })
    await dispatch(
      ActionTypes.fetchRelatedRestrictions,
      countryPair.destinationCode,
    )
    await dispatch(ActionTypes.fetchReturnRestriction, {
      originCode: countryPair.destinationCode,
      destinationCode: countryPair.originCode,
    })
  },
}
