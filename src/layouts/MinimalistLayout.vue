<template>
  <q-layout view="lHh Lpr lff">
    <q-header
      reveal
      elevated
      class="bg-white"
    >
      <q-toolbar>
        <slot name="nav-top-left" />

        <q-toolbar-title class="p-4">
          <router-link
            :to="{name: 'Home'}"
            class="flex flex-row justify-center items-center gap-x-4"
          >
            <q-img
              :src="require('assets/logo/Bbid-logo-only.png')"
              class="w-10"
              alt="bersamabisa.id logo"
            />
            <h3 class="font-extrabold text-2xl text-primary">
              BERSAMABISA.ID
            </h3>
          </router-link>
        </q-toolbar-title>

        <slot name="nav-top-right" />
      </q-toolbar>
    </q-header>

    <slot name="drawer" />

    <q-page-container>
      <slot>
        <router-view />
      </slot>
    </q-page-container>

    <q-footer>
      <q-toolbar>
        Copyright © 2021 All rights reserved
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'MinimalistLayout',
});
</script>
