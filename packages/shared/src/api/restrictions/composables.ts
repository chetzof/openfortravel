import {
  generateRestrictionListByDestination,
  sortByOrigin,
  wrapCollectionWithRichObject,
} from '@/shared/src/api/restrictions/helper'
import { Restriction } from '@/shared/src/api/restrictions/models'
import {
  persistRestriction,
  persistRestrictionCollection,
} from '@/shared/src/api/restrictions/persisters'
import { useAsyncState } from '@/shared/src/composables/use-async'
import { ref, Ref } from '@vue/composition-api'

type PersistOneFunc = <K extends keyof Restriction>(
  field: K,
  value: Restriction[K],
  oldRestriction: Restriction,
) => Promise<void>

type PersistAllFunc = <K extends keyof Restriction>(
  field: K,
  value: Restriction[K],
) => Promise<void>

export function useRestrictionListFilteredByDestination(
  destinationCode: string,
): {
  list: Ref<Restriction[]>
  loading: Ref<boolean>
} {
  const promise = generateRestrictionListByDestination(destinationCode)
  const list = ref<Restriction[]>([])
  const { loading } = useAsyncState(promise, [])

  void promise.then((restriction) => {
    list.value = sortByOrigin(wrapCollectionWithRichObject(restriction))
  })

  return {
    loading,
    list,
  }
}

export function useRestrictionPersister(): PersistOneFunc {
  return async (field, value, oldRestriction) => {
    oldRestriction[field] = value
    await persistRestriction(oldRestriction)
  }
}

export function useRestrictionCollectionPersister(
  restrictionListRef: Ref<Restriction[]>,
): PersistAllFunc {
  return async (field, value) => {
    restrictionListRef.value.map((restriction) => (restriction[field] = value))
    await persistRestrictionCollection(restrictionListRef.value)
  }
}
