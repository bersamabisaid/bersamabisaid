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

    <!-- <q-footer elevated> -->
    <base-footer />
    <!-- </q-footer> -->
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import BaseNavbar from 'components/BaseNavbar.vue';
import BaseFooter from 'components/BaseFooter.vue';

export default defineComponent({
  name: 'MainLayout',
  setup() {
    //
  },
  components: {
    BaseNavbar,
    BaseFooter,
  },
});
</script>
