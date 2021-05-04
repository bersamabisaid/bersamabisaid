<template>
  <q-toolbar :class="['p-6 md:px-7 md:py-6 flex flex-col', transparent ? 'bg-transparent' : 'bg-white', visible && 'backdrop-filter backdrop-blur-xl']">
    <q-toolbar-title class="w-full relative flex justify-between gap-x-4">
      <router-link
        :to="{name: 'Home'}"
        class="flex flex-row items-center gap-x-4"
      >
        <q-img
          :src="brandLogoSrc"
          class="w-12"
          alt="bersamabisa.id logo"
        />

        <h3 :class="['hidden lg:inline-block font-extrabold text-xl', transparent ? 'text-white' : 'text-primary']">
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
          @click="toggleNavbar"
        />
      </div>
    </q-toolbar-title>

    <q-slide-transition>
      <div
        v-show="visible"
        :class="['w-screen px-10 backdrop-filter backdrop-blur-xl md:hidden']"
      >
        <ul :class="['list-none pb-96 filter grid grid-cols gap-1', transparent ? 'pt-4' : 'mt-4']">
          <li
            v-for="navItem in navItems"
            :key="navItem.title"
            :class="['border-t-2 border-black', transparent && 'border-white']"
          >
            <q-btn
              :class="['w-full', transparent ? 'text-white' : 'text-black']"
              align="left"
              :label="navItem.title"
              flat
              v-bind="navItem"
            />
          </li>
        </ul>
      </div>
    </q-slide-transition>
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
    to: { name: 'Profile' },
  },
  {
    title: 'KONTAK',
    to: { name: 'Home', hash: '#contact', replace: true },
  },
];

export default defineComponent({
  name: 'BaseNavbar',
  props: {
    transparent: {
      type: Boolean,
      default: false,
    },
    visible: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    return {
      navItems,
      evaMenu,
      showMenu: false,
      visible: false,
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
      this.visible = !this.visible;
    },
  },
});
</script>

<style lang="scss" scoped>
  // quasar override
  .q-toolbar {
    &__title {
      @apply p-0;
    }
  }
</style>
