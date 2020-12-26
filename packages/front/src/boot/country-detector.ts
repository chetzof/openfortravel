import { boot } from 'quasar/wrappers'

import {
  decideOnCountry,
  setCurrentCountry,
} from '@/front/src/misc/country-decider'

export default boot(async ({ router }) => {
  if (process.env.SERVER) {
    setCurrentCountry(await decideOnCountry(router.currentRoute, true), false)
  } else {
    router.afterEach(async (to) => {
      setCurrentCountry(await decideOnCountry(to, false), true)
    })
  }
})
