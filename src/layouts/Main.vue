<template>
  <q-layout view="lHh Lpr lFf">
    <!-- <the-navbar /> -->

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
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';
import TheNavbar from 'components/BaseNavbar.vue';

export default defineComponent({
  name: 'MainLayout',
  setup() {
    const leftDrawerOpen = ref(false);

    return { leftDrawerOpen };
  },
  components: {
    TheNavbar,
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
