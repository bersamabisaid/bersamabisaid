<template>
  <q-item class="p-4 bg-white rounded-xl">
    <q-item-section avatar>
      <q-avatar
        color="secondary"
        text-color="white"
      >
        {{ name.charAt(0).toUpperCase() }}
      </q-avatar>
    </q-item-section>

    <q-item-section>
      <q-item-label>
        <span class="font-medium">{{ name }}</span>
        <span class="ml-4 font-light text-xs text-gray-400 italic tracking-tight">{{ computedTimestamp }}</span>
      </q-item-label>
      <q-item-label caption>
        <p class="font-medium text-xs text-dark tracking-tight">
          {{ message }}
        </p>
      </q-item-label>
    </q-item-section>

    <q-item-section
      side
      top
      class="font-bold text-primary"
    >
      {{ computedAmount }}
    </q-item-section>
  </q-item>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api';
import { toIdr } from 'shared/utils/formatter';
import type { DonationUI } from 'shared/types/modelData';

export type DonationItemProps = DonationUI;

export default defineComponent({
  name: 'DonationItem',
  props: {
    name: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Object as PropType<DonationItemProps['timestamp']>,
      required: true,
    },
  },
  computed: {
    computedAmount(): string {
      return toIdr(this.amount, 0);
    },
    computedTimestamp(): string {
      const date = this.timestamp.toDate();
      const secondAgo = (Date.now() - date.getTime()) / 1000;

      if (secondAgo < 60) {
        return `${secondAgo} detik yang lalu`;
      }

      const minuteAgo = secondAgo / 60;
      if (minuteAgo < 60) {
        return `${Math.round(minuteAgo)} menit yang lalu`;
      }

      const hourAgo = minuteAgo / 60;
      if (hourAgo < 24) {
        return `${Math.round(hourAgo)} jam yang lalu`;
      }

      const dayAgo = hourAgo / 24;
      if (dayAgo < 7) {
        return `${Math.round(dayAgo)} hari yang lalu`;
      }

      const weekAgo = hourAgo / 7;
      if (weekAgo < 7) {
        return `${Math.round(weekAgo)} pekan yang lalu`;
      }

      return date
        .toLocaleString('ID', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        });
    },
  },
});
</script>
