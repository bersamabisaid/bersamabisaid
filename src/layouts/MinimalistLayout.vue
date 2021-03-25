<template>
  <q-layout view="lHh Lpr lff">
    <q-header
      reveal
      elevated
      class="bg-white"
    >
      <q-toolbar class="p-4">
        <q-toolbar-title>
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
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'MinimalistLayout',
});
</script>
