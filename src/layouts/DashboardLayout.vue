<template>
  <minimalist-layout>
    <template #nav-top-left>
      <q-btn
        icon="menu"
        flat
        round
        class="text-primary"
        @click="isDrawerOpen = !isDrawerOpen"
      />
    </template>

    <template #drawer>
      <q-drawer
        v-model="isDrawerOpen"
        show-if-above
        bordered
        content-class="flex flex-col"
      >
        <div class="p-4 bg-red-500 border-b-4 border-negative flex items-center gap-x-4">
          <q-img
            :src="require('assets/logo/Bbid-logo-only-white.png')"
            class="flex-shrink w-9"
            alt="bersamabisa.id logo"
          />
          <span class="flex-grow font-semibold text-lg text-white">
            Admin Dashboard
          </span>
        </div>

        <q-scroll-area class="flex-grow w-full bg-warning">
          <q-list padding>
            <q-item
              v-for="{ label, icon, onClick = () => {}, ...item } in drawerItems"
              :key="label"
              v-ripple
              clickable
              class="py-5"
              active-class="bg-yellow-500"
              v-bind="item"
              @click="onClick"
            >
              <q-item-section
                avatar
                class="text-yellow-900 text-opacity-95"
              >
                <q-icon :name="icon" />
              </q-item-section>

              <q-item-section class="font-medium text-base text-white">
                {{ label }}
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>
      </q-drawer>
    </template>
  </minimalist-layout>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import {
  roundHome, roundEvent, roundFeed, roundLogout,
} from '@quasar/extras/material-icons-round';
import MinimalistLayout from 'layouts/MinimalistLayout.vue';
import type { QItem } from 'quasar';

type NavItem = Pick<QItem, 'to' | 'exact'> & {
  label: string;
  icon: string;
  onClick?: () => void;
}

const drawerItems: NavItem[] = [
  {
    label: 'Overview',
    icon: roundHome,
    to: { name: 'AdminDashboard' },
    exact: true,
  },
  {
    label: 'Program',
    icon: roundEvent,
    to: { name: 'AdminEventIndex' },
    exact: true,
  },
  {
    label: 'Postingan',
    icon: roundFeed,
  },
  {
    label: 'Keluar',
    icon: roundLogout,
    onClick: () => alert?.('sdadsasd'),
  },
];

export default defineComponent({
  name: 'DashboardLayout',
  setup() {
    return {
      drawerItems,
    };
  },
  data() {
    return {
      isDrawerOpen: false,
    };
  },
  components: {
    MinimalistLayout,
  },
});
</script>
