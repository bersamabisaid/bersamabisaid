<template>
  <q-list class="flex flex-col gap-y-4">
    <template v-if="data.length">
      <ItemDonation
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

  <q-btn
    v-if="data.length && !isMaximumReached"
    label="Lihat lebih banyak"
    unelevated
    class="self-center bg-primary text-white rounded-lg"
    @click="next"
  />

  <q-inner-loading :showing="isLoading" />
</template>

<script lang="ts">
import {
  defineComponent, ref, computed, watch, PropType,
} from 'vue';
import ItemDonation from 'components/ui/Program/ItemDonation.vue';
import useCollectionPaginated from 'composables/useCollectionPaginated';
import { firestoreClient } from 'src/firebaseClientService';
import type { RouteLocationRaw } from 'vue-router';
import type { DonationUI } from 'shared/types/schema';

export default defineComponent({
  name: 'DonationList',
  components: {
    ItemDonation,
  },
  props: {
    programName: {
      type: String,
      required: true,
    },
    donateUrl: {
      type: [String, Object] as PropType<RouteLocationRaw>,
      required: true,
    },
    programRef: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const programRef = computed(() => firestoreClient.collections.Programs.doc(props.programRef));
    const donationCollectionRef = computed(() => firestoreClient.collections
      .Donations(programRef.value)
      .where('_deleted', '==', null));
    const dataPool = ref<DonationUI[]>([]);
    const {
      data,
      isLoading,
      done: isMaximumReached,
      error,
      next,
    } = useCollectionPaginated(donationCollectionRef, {
      orderBy: '_created',
      perPage: 5,
      mapper(el) {
        const {
          _ui, amount, message, _created,
        } = el.data();
        return {
          name: _ui.donatorName.value.data,
          amount,
          message,
          timestamp: _created,
        } as DonationUI;
      },
    });

    watch(data, (newVal) => dataPool.value.push(...newVal));

    return {
      data: dataPool,
      isLoading,
      isMaximumReached,
      error,
      next,
    };
  },
});
</script>
