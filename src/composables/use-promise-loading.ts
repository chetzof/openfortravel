import { Ref, ref } from '@vue/composition-api'
import mapValues from 'lodash/mapValues'

type Callback = { (...args: unknown[]): Promise<unknown> }
export type CallbackCollection = Record<string, Callback>

export type Loading = {
  loading: Ref<boolean>
}

function useLoading(defaultValue = false): Loading {
  const loading = ref(defaultValue)
  return { loading }
}

export function useClosureLoading(
  closures: CallbackCollection,
): { closures: CallbackCollection } & Loading {
  const { loading } = useLoading()

  closures = (mapValues(
    closures,
    (callback: Callback): Callback => {
      return async function (...args: unknown[]) {
        loading.value = true
        const result = await callback(...args)
        loading.value = false
        return result
      }
    },
  ) as unknown) as CallbackCollection

  return {
    closures,
    loading,
  }
}

export function usePromiseLoading(
  promise: Promise<unknown>,
  loadingRef?: Ref<boolean>,
): { loading: Ref<boolean> } {
  const loading = loadingRef ?? ref(true)
  promise.finally(() => (loading.value = false))
  return { loading }
}
