<template>
  <q-layout view="lHh Lpr lff">
    <q-header
      elevated
      class="bg-white"
    >
      <base-navbar />
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <base-footer />
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BaseNavbar from 'components/BaseNavbar.vue';
import BaseFooter from 'components/BaseFooter.vue';

export default defineComponent({
  name: 'MainLayout',
  components: {
    BaseNavbar,
    BaseFooter,
  },
});
</script>
