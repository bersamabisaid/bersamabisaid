<template>
  <q-toolbar :class="['p-6 md:p-10', transparent ? 'bg-transparent' : 'bg-white']">
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

        <h3 :class="['hidden lg:inline-block font-extrabold text-2xl', transparent ? 'text-white' : 'text-primary']">
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
        class="hidden md:inline-block"
      />

      <q-btn
        :icon="evaMenu"
        unelevated
        round
        class="inline-block md:hidden"
        @click="$emit('toggle-sidebar')"
      />
    </div>
  </q-toolbar>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { evaMenu } from '@quasar/extras/eva-icons';
import bbidLogoOnlyWhite from 'assets/logo/Bbid-logo-only-white.png';
import bbidLogoOnly from 'assets/logo/Bbid-logo-only.png';
import type { RawLocation } from 'vue-router';

interface NavItem {
  title: string;
  to: RawLocation;
}

const navItems: NavItem[] = [
  {
    title: 'HOME',
    to: { name: 'Home' },
  },
  {
    title: 'PROGRAM',
    to: { name: 'ProgramList' },
  },
  {
    title: 'DONASI',
    to: { name: 'ProgramList', query: { category: 'donasi' } },
  },
  {
    title: 'PROFIL',
    to: '/#',
  },
  {
    title: 'KONTAK',
    to: '/#',
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
        ? bbidLogoOnlyWhite as unknown as string
        : bbidLogoOnly as unknown as string;
    },
  },
});
</script>
