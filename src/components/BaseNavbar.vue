<template>
  <q-toolbar class="p-10 bg-transparent">
    <q-toolbar-title class="flex flex-row items-center gap-x-4">
      <router-link
        :to="{name: 'Home'}"
        class="flex flex-row items-center gap-x-4"
      >
        <q-img
          :src="require('assets/logo/Bbid-logo-only-white.png')"
          class="w-14"
          alt="bersamabisa.id logo"
        />

        <h3 class="font-bold text-2xl text-white">
          BERSAMABISA.ID
        </h3>
      </router-link>
    </q-toolbar-title>

    <div class="text-white">
      <q-btn
        v-for="{ title } in navItems"
        :key="title"
        :label="title"
        flat
        rounded
      />
    </div>
  </q-toolbar>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

const navItems = [
  {
    title: 'HOME',
    link: '/#',
  },
  {
    title: 'PROGRAM',
    link: '/#',
  },
  {
    title: 'DONASI',
    link: '/#',
  },
  {
    title: 'PROFIL',
    link: '/#',
  },
  {
    title: 'KONTAK',
    link: '/#',
  },
];

export default defineComponent({
  name: 'BaseNavbar',
  data() {
    return {
      navItems,
    };
  },
});
</script>
