<template>
  <q-toolbar :class="['p-6 md:p-10 flex flex-col', transparent ? 'bg-transparent' : 'bg-white']">
    <q-toolbar-title class="w-full relative flex justify-between gap-x-4">
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

      <div :class="['flex flex-row', transparent ? 'text-white' : 'text-primary']">
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
          @click="toggleNavbar()"
        />
      </div>
    </q-toolbar-title>

    <div
      class="w-full bg-white md:hidden"
      :class="{'hidden': !showMenu, 'block': showMenu}"
    >
      <ul class="list-none">
        <li
          v-for="navItem in navItems"
          :key="navItem.title"
        >
          <q-btn
            :label="navItem.title"
            flat
            text-color="black"
            v-bind="navItem"
          />
        </li>
      </ul>
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
      showMenu: false,
    };
  },
  computed: {
    brandLogoSrc(): string {
      return this.transparent
        ? bbidLogoOnlyWhite as unknown as string
        : bbidLogoOnly as unknown as string;
    },
  },
  methods: {
    toggleNavbar() {
      this.showMenu = !this.showMenu;
    },
  },
});
</script>
