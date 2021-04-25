<template>
  <q-page padding />
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import useGuardAuth from 'src/composables/useGuardAuth';

export default defineComponent({
  name: 'PageAdminDashboard',

  setup() {
    useGuardAuth();
  },
});
</script>
