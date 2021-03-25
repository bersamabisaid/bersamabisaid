<template>
  <q-card class="my-card rounded-lg">
    <img :src="url">

    <q-card class="card-program">
      <q-card-section tag="article">
        <div class="card-program__img-container">
          <q-img
            src="https://cdn.quasar.dev/img/mountains.jpg"
            class="card-program__img"
          />
        </div>

        <div class="px-4 pt-6 pb-2 flex flex-col">
          <dt class="card-program__title">
            {{ title }}
          </dt>

          <dd class="card-program__description">
            {{ caption }}
          </dd>
        </div>
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
  </q-card>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api';
import { RawLocation } from 'vue-router';

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
      type: [String, Object] as PropType<RawLocation>,
      default: '/',
    },
    actionLabel: {
      type: String,
      default: 'action',
    },
    url: {
      type: String,
      default: '',
    },
  },
});
</script>

<style lang="scss" scoped>
@layer components {
  .card-program {
    @apply w-80 rounded-2xl border-t border-gray-100 shadow-lg transition-shadow;

    &:hover {
      @apply shadow-2xl;
    }

    &__img-container {
      @apply relative w-full h-60;
    }

    &__img {
      @apply w-full h-full rounded-2xl;
    }

    &__title {
      @apply font-bold text-xl text-primary;
    }

    &__description {
      @apply pt-1.5 text-sm text-secondary;
    }
  }
}
</style>
