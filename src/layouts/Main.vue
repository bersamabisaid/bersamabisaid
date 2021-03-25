<template>
  <q-layout view="lHh Lpr lff">
    <q-header
      reveal
      elevated
      class="bg-white"
    >
      <base-navbar />
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      content-class="bg-grey-1"
    />

    <q-page-container>
      <router-view
        @hide-navbar="hideNavbar"
        @show-navbar="showNavbar"
      />
    </q-page-container>

    <base-footer />
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';
import BaseNavbar from 'components/BaseNavbar.vue';
import BaseFooter from 'components/BaseFooter.vue';

export default defineComponent({
  name: 'MainLayout',
  setup() {
    const leftDrawerOpen = ref(false);

    return { leftDrawerOpen };
  },
  components: {
    BaseNavbar,
    BaseFooter,
  },
  methods: {
    hideNavbar() {
      console.log('hide');
    },
    showNavbar() {
      console.log('show');
    },
  },
  // created() {
  //   this.$on('hide-navbar', () => {
  //     console.log('hide');
  //   });

  //   this.$on('show-navbar', () => {
  //     console.log('showed');
  //   });
  // },
});
</script>
