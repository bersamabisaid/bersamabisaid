<template>
  <q-item class="p-4 bg-white rounded-xl">
    <q-item-section avatar>
      <q-avatar
        color="secondary"
        text-color="white"
      >
        {{ name.charAt(0) }}
      </q-avatar>
    </q-item-section>

    <q-item-section>
      <q-item-label>
        <span class="font-medium">{{ name }}</span>
        <span class="ml-4 font-light text-xs text-gray-400 italic">{{ computedTimestamp }}</span>
      </q-item-label>
      <q-item-label caption>
        <p>{{ message }}</p>
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

const LOCALE_DATE_OPTIONS = { day: 'numeric', month: 'long', year: 'numeric' };

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
      return this.timestamp.toDate().toLocaleString('ID', LOCALE_DATE_OPTIONS);
    },
  },
});
</script>
