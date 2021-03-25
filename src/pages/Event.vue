<template>
  <q-page />
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'PageEventDetail',

  computed: {
    programUrl(): string {
      return this.$route.params.programUrl;
    },
  },
});
</script>
