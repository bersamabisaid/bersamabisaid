<template>
  <q-toolbar :class="['p-6 sm:p-10', transparent ? 'bg-transparent' : 'bg-white']">
    <q-toolbar-title class="flex flex-row items-center gap-x-4">
      <router-link
        :to="{name: 'Home'}"
        class="flex flex-row items-center gap-x-4"
      >
        <q-img
          :src="brandLogoSrc"
          class="w-14"
          alt="bersamabisa.id logo"
        />

        <h3 :class="['hidden sm:inline-block font-extrabold text-2xl', transparent ? 'text-white' : 'text-primary']">
          BERSAMABISA.ID
        </h3>
      </router-link>
    </q-toolbar-title>

    <div :class="transparent ? 'text-white' : 'text-primary'">
      <q-btn
        v-for="navItem in navItems"
        :key="navItem.title"
        :label="navItem.title"
        flat
        rounded
        v-bind="navItem"
        class="hidden sm:inline-block"
      />

      <q-btn
        :icon="evaMenu"
        unelevated
        round
      />
    </div>
  </q-toolbar>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { evaMenu } from '@quasar/extras/eva-icons';

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
  props: {
    transparent: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    return {
      navItems,
      evaMenu,
    };
  },
  computed: {
    brandLogoSrc(): string {
      return this.transparent
        ? require('assets/logo/Bbid-logo-only-white.png') as string
        : require('assets/logo/Bbid-logo-only.png') as string;
    },
  },
});
</script>
