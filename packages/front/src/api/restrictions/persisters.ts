import { generateIDFromEntity } from '@/front/src/api/restrictions/common'
import { PlainRestriction } from '@/front/src/api/restrictions/models'

export async function persistRestriction(
  restriction: PlainRestriction,
): Promise<void> {
  const { restrictionCollection } = await import('@/front/src/misc/firebase')
  await restrictionCollection
    .doc(generateIDFromEntity(restriction))
    .set(restriction, { merge: true })
}

export async function persistRestrictionCollection(
  restrictionsCollection: PlainRestriction[],
): Promise<void> {
  const { restrictionCollection, firestore } = await import('@/front/src/misc/firebase')
  const batch = firestore.batch()
  for (const restriction of restrictionsCollection) {
    batch.set(
      restrictionCollection.doc(generateIDFromEntity(restriction)),
      restriction,
      {
        merge: true,
      },
    )
  }

  await batch.commit()
}
