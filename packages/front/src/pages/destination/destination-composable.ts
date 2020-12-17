import {
  ComputedRef,
  onMounted,
  onServerPrefetch,
  Ref,
  watch,
} from '@vue/composition-api'

import { useLoading } from '@/shared/src/composables/use-promise-loading'
import {
  useVuexActionDispatcherWithReactivePayload,
  useVuexReactiveGetter,
} from '@/shared/src/composables/use-vuex'
import { Destination } from 'src/api/destinations/models'
import { Restriction } from 'src/api/restrictions/models'

export function getRestriction(
  originCodeRef: Ref<string>,
  destinationCodeRef: Ref<string>,
  returnDirection = false,
): {
  restrictionRef: ComputedRef<Restriction>
  loadingRef: Ref<boolean>
} {
  const restrictionRef = useVuexReactiveGetter<Restriction>(
    `destinationPage/get${returnDirection ? 'Return' : ''}Restriction`,
  )
  const { loading: loadingRef } = useLoading()
  const fetcher = useVuexActionDispatcherWithReactivePayload(
    `destinationPage/fetch${returnDirection ? 'Return' : ''}Restriction`,
    {
      originCode: originCodeRef,
      destinationCode: destinationCodeRef,
    },
    loadingRef,
  )

  onServerPrefetch(fetcher)
  onMounted(fetcher)
  watch([originCodeRef, destinationCodeRef], fetcher)

  return { restrictionRef, loadingRef }
}

export function getDestination(
  destinationCodeRef: Ref<string>,
): {
  destinationRef: ComputedRef<Destination>
  loadingRef: Ref<boolean>
} {
  const destinationRef = useVuexReactiveGetter<Destination>(
    'destinationPage/getDestination',
  )
  const { loading: loadingRef } = useLoading()
  const fetcher = useVuexActionDispatcherWithReactivePayload(
    'destinationPage/fetchDestination',
    destinationCodeRef,
    loadingRef,
  )
  onServerPrefetch(fetcher)
  onMounted(fetcher)

  return { destinationRef, loadingRef }
}
