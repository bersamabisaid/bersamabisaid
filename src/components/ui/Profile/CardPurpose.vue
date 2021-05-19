<template>
  <q-card
    flat
    bordered
    class="w-full max-w-xs bg-blue-gray-50 rounded-lg"
  >
    <q-card-section class="bg-info">
      <div class="row items-center no-wrap">
        <div class="col">
          <h6 class="text-h6 text-white">
            {{ title }}
          </h6>
        </div>

        <div class="col-auto">
          <q-btn
            round
            flat
            icon="arrow_forward"
            class="text-white"
          />
        </div>
      </div>
    </q-card-section>

    <q-card-section>
      {{ description }}
    </q-card-section>
  </q-card>
</template>

<script>
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'CardPurpose',
  props: {
    title: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
  },
});
</script>
