<template>
  <div class="text-center text-caption q-ma-xl text-primary-subtle">
    <portal-target name="footer" />
    <the-footer-menu class="q-mb-lg" />
    <div class="q-mb-lg">
      {{
        $t('components.footer.disclaimer', {
          date: lastUpdated,
        })
      }}
    </div>
    <div
      class="q-mb-lg"
      v-html="
        $t('components.footer.lastUpdated', {
          date: lastUpdated,
        })
      "
    />
  </div>
</template>

<style module lang="scss">
.languages {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  a {
    color: $secondary;
  }
}
</style>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import langs from 'iso-language-list/dist/generated/top10-speakers-then-az-value-label.json'
import { PortalTarget } from 'portal-vue'
import { date } from 'quasar'

import TheFooterMenu from '@/front/src/layouts/components/the-footer/the-footer-menu.vue'

export default defineComponent({
  components: {
    TheFooterMenu,
    PortalTarget,
  },
  props: {},
  setup() {
    return {
      langs: Object.freeze(langs),
      lastUpdated: date.formatDate(Date.now(), 'DD MMMM YYYY'),
    }
  },
})
</script>
