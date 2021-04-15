<template>
  <minimalist-layout class="admin-layout">
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
          <span class="flex-grow font-semibold text-lg text-white tracking-tighter">
            Admin Dashboard
          </span>
        </div>

        <q-scroll-area class="flex-grow w-full bg-warning">
          <q-list padding>
            <template
              v-for="{ label, icon, children, onClick = () => {}, ...item } in drawerItems"
            >
              <q-expansion-item
                v-if="children && children.length"
                :key="label"
                :label="label"
                :icon="icon"
                default-opened
                active-class="bg-yellow-500"
                :content-inset-level=".25"
                v-bind="item"
              >
                <q-list class="bg-yellow-500 bg-opacity-30">
                  <q-item
                    v-for="{label: childLabel, icon: childIcon, onClick: childOnClick = () => {}, ...child} in children"
                    :key="childLabel"
                    v-ripple
                    clickable
                    class="pl-4 py-3"
                    active-class="bg-yellow-500"
                    v-bind="child"
                    @click="childOnClick"
                  >
                    <q-item-section
                      avatar
                      class="text-yellow-900 text-opacity-95"
                    >
                      <q-icon :name="childIcon" />
                    </q-item-section>

                    <q-item-section class="font-medium text-sm text-white">
                      {{ childLabel }}
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-expansion-item>

              <q-item
                v-else
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
            </template>
          </q-list>
        </q-scroll-area>
      </q-drawer>
    </template>

    <template #default>
      <transition :enter-active-class="routeTransitionName">
        <router-view />
      </transition>
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
import useGuardAuth from 'src/composables/useGuardAuth';
import { auth } from 'src/services/firebaseService';

interface IRouteMeta {
  transitionName?: string;
}

type NavItem = Pick<QItem, 'to' | 'exact'> & {
  label: string;
  icon: string;
  onClick?: () => void;
  children?: Omit<NavItem, 'children'>[];
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
    children: [
      {
        label: 'Program donasi',
        icon: 'attach_money',
        to: { name: 'AdminEventDonation' },
        exact: true,
      },
    ],
  },
  {
    label: 'Postingan',
    icon: roundFeed,
  },
  {
    label: 'Keluar',
    icon: roundLogout,
    onClick: () => auth.signOut(),
  },
];

export default defineComponent({
  name: 'DashboardLayout',
  setup() {
    useGuardAuth();

    return {
      drawerItems,
    };
  },
  data() {
    return {
      routeTransitionAnimationName: 'slideInLeft',
      isDrawerOpen: false,
    };
  },
  computed: {
    routeTransitionName() {
      return ['animated', this.routeTransitionAnimationName].join(' ');
    },
  },
  beforeRouteUpdate(to, from, next) {
    this.routeTransitionAnimationName = (to.meta as IRouteMeta)?.transitionName || 'slideInLeft';
    return next();
  },
  components: {
    MinimalistLayout,
  },
});
</script>

<style lang="scss">
// @layer components {
  // quasar override
  .admin-layout {
    .q-expansion-item {
      .q-item {
        @apply py-5;

        &__section--main {
          @apply font-medium text-base text-white;
        }
        &__section--avatar,
        &__section--side {
          @apply text-yellow-900 text-opacity-95;
        }
      }
    }
  }
// }
</style>
