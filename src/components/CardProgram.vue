<template>
  <q-card class="my-card">
    <img src="https://cdn.quasar.dev/img/mountains.jpg">

    <div class="q-ml-md">
      <q-card-section>
        <div class="text-h6">
          {{ title }}
        </div>
        <div class="text-subtitle2 q-pt-sm">
          {{ caption }}
        </div>
      </q-card-section>

      <q-card-actions class="q-pb-md">
        <q-btn>
          Go ->
        </q-btn>
      </q-card-actions>
    </div>
  </q-card>
</template>

<script>
import { defineComponent } from '@vue/composition-api';

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
    link: {
      type: String,
      default: '',
    },
  },
});
</script>
