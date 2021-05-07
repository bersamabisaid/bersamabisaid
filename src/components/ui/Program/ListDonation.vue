<template>
  <q-list class="flex flex-col gap-y-4">
    <template v-if="data.length">
      <item-donation
        v-for="(el, i) in data"
        :key="`${i}-${el.name}`"
        v-bind="el"
      />
    </template>

    <div
      v-else
      class="p-4 bg-white text-center rounded-xl flex flex-col gap-y-2"
    >
      <span class="text-gray-400">Belum ada donatur untuk sementara ini,</span>
      <span class="text-gray-400">Jadilah yang pertama sebagai donatur</span>
      <b class="text-lg text-primary">{{ programName }}</b>
      <q-btn
        label="donasi sekarang"
        :to="donateUrl"
        flat
        class="self-center bg-positive text-white rounded-lg"
      />
    </div>
  </q-list>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api';
import ItemDonation from 'components/ui/Program/ItemDonation.vue';
import type { RawLocation } from 'vue-router';
import type { DonationUI } from 'shared/types/modelData';

export default defineComponent({
  props: {
    programName: {
      type: String,
      required: true,
    },
    donateUrl: {
      type: [String, Object] as PropType<RawLocation>,
      required: true,
    },
    data: {
      type: Array as PropType<DonationUI[]>,
      required: true,
    },
  },
  components: {
    ItemDonation,
  },
});
</script>
