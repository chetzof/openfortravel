<template>
  <q-field borderless dense :loading="loading">
    <template #control>
      <q-option-group
        v-model="internalValue"
        :options="statuses"
        type="radio"
        color="secondary"
        inline
        dense
        v-on="listeners"
      />
    </template>
  </q-field>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from '@vue/composition-api'

import { getStatusListPairs } from '@/shared/src/api/restrictions/helper'
import { useAsyncListeners } from '@/shared/src/composables/use-async-listeners'

export default defineComponent({
  components: {},
  props: {
    value: {
      type: String,
      required: false,
      default: undefined,
    },
  },
  setup(props) {
    const fallbackValueStorage = ref<string | undefined>()
    const internalValue = computed<string | undefined>({
      get() {
        if (props.value === undefined) {
          return fallbackValueStorage.value
        }

        return props.value
      },
      set(value) {
        fallbackValueStorage.value = value
      },
    })
    const { loading, listeners } = useAsyncListeners()
    return { statuses: getStatusListPairs(), listeners, loading, internalValue }
  },
})
</script>
