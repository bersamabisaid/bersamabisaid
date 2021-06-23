<template>
  <q-page
    padding
    class="min-h-screen"
  >
    <section class="h-screen pb-10 flex flex-col items-center">
      <iframe
        :src="gformLink"
        class="w-full max-w-prose h-full"
        referrerpolicy="no-referrer"
      >
        Loading...
      </iframe>
    </section>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'PageGoogleForm',
  props: {
    gformId: {
      type: String,
      required: true,
    },
  },
  computed: {
    gformLink(): string {
      return `https://docs.google.com/forms/d/e/${this.gformId}/viewform?embedded=true`;
    },
  },
});
</script>
