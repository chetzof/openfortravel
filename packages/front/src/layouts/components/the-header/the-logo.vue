<template>
  <router-link :class="$style.link" :to="homeURL">
    <img
      svg-inline
      :class="[$style.logo]"
      style="height: 60px"
      src="../../../assets/logo.svg"
    />
  </router-link>
</template>

<style lang="scss" module>
.logo {
  cursor: pointer;
  &:focus {
    outline: none;
  }
  :global {
    #Layer_1-2 path:first-child {
      fill: var(--q-color-primary);
    }
  }
}
</style>
<script lang="ts">
import { defineComponent } from '@vue/composition-api'

import { getMenuItemURL } from '@/front/src/misc/menu'

export default defineComponent({
  setup() {
    return {
      homeURL: getMenuItemURL('index'),
    }
  },
})
</script>
