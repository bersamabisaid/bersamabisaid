<template>
  <q-card
    flat
    class="w-full max-w-sm rounded-2xl border-t border-gray-100 shadow-lg"
  >
    <q-card-section>
      <div class="relative w-full h-60">
        <q-img
          src="https://cdn.quasar.dev/img/mountains.jpg"
          class="w-full h-full rounded-2xl"
        />
      </div>

      <article class="px-4 pt-6 pb-2 flex flex-col">
        <div class="font-semibold text-h6 text-primary">
          {{ title }}
        </div>
        <div class="q-pt-sm text-subtitle2 text-secondary">
          {{ caption }}
        </div>
      </article>
    </q-card-section>

    <q-card-actions class="px-6 pt-2 pb-6">
      <q-btn
        :label="actionLabel"
        no-caps
        unelevated
        class="px-5 py-1 capitalize ring-1 ring-inset ring-gray-200 rounded-lg shadow-md"
      />
    </q-card-actions>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api';
import { Route } from 'vue-router';

export default defineComponent({
  name: 'ProgramCard',
  data() {
    return {
      lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
    };
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    caption: {
      type: String,
      default: '',
    },
    to: {
      type: Object as PropType<Route>,
      default: '',
    },
    actionLabel: {
      type: String,
      default: 'action',
    },
  },
});
</script>
