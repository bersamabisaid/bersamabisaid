<template>
  <q-list padding>
    <q-item
      v-for="choice in choices"
      :key="choice.title"
      v-ripple
      tag="label"
    >
      <q-item-section avatar>
        <q-radio
          v-model="amount"
          :val="choice.amount"
        />
      </q-item-section>
      <q-item-section>
        <q-item-label class="font-bold text-lg !text-primary">
          {{ toIdr(choice.amount) }}
        </q-item-label>
        <q-item-label caption>
          {{ choice.title }}
        </q-item-label>
      </q-item-section>
    </q-item>
  </q-list>

  <span class="mx-4 font-semibold">
    Nominal Lainnya
  </span>

  <q-input
    v-model="amount"
    label="Masukkan nominal"
    filled
    mask="Rp ### ### ### ###"
    unmasked-value
    input-class="font-bold text-lg text-right !text-primary"
  />
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
import { toIdr } from 'shared/utils/browser/formatter';

interface Choice {
  title: string;
  amount: number;
}

const choices: Choice[] = [
  {
    title: 'Semua bisa sedekah',
    amount: 50_000,
  },
  {
    title: 'Sedekah pilihan',
    amount: 100_000,
  },
  {
    title: 'Sedekah terbaik',
    amount: 250_000,
  },
  {
    title: 'Sedekah berkah',
    amount: 500_000,
  },
  {
    title: 'Sedekah spesial',
    amount: 1000_000,
  },
];

export default defineComponent({
  name: 'PayFormAmount',
  props: {
    modelValue: {
      type: Number,
      default: 0,
    },
  },
  setup() {
    const state = reactive({
      amount: 0,
    });

    return {
      ...toRefs(state),
      choices,
      // utils
      toIdr,
    };
  },
});
</script>
