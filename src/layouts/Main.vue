<template>
  <q-layout view="lHh Lpr lff">
    <q-header elevated>
      <base-navbar />
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <base-footer />
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
