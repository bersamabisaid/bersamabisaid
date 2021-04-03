<template>
  <q-card class="card-program">
    <q-card-section tag="article">
      <div class="card-program__img-container">
        <q-img
          src="https://cdn.quasar.dev/img/mountains.jpg"
          class="card-program__img"
        />
      </div>

      <div class="px-2 pt-6 flex flex-col">
        <dt class="card-program__title">
          {{ title }}
        </dt>

        <dd class="card-program__description">
          {{ caption }}
        </dd>
      </div>
    </q-card-section>

    <q-card-actions
      v-if="!noAction"
      class="px-6 pt-1 pb-6"
    >
      <q-btn
        :label="actionLabel"
        no-caps
        unelevated
        :to="toLocation"
        class="px-5 py-1 capitalize ring-1 ring-inset ring-gray-200 rounded-lg shadow-md"
      />
    </q-card-actions>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api';
import type { RawLocation } from 'vue-router';

export type CardProgramProps = {
  title: string;
  caption: string;
  actionLabel?: string;
} & (
  { url: string }
  | { to: RawLocation }
)

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
    actionLabel: {
      type: String,
      default: 'action',
    },
    url: {
      type: String,
      default: '',
    },
    to: {
      type: [String, Object] as PropType<RawLocation>,
      default: '',
    },
    noAction: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    toLocation(): RawLocation {
      // it means prior to 'to' property
      return this.to
        || (this.url
          ? { name: 'Program', params: { programURL: this.url } }
          : { name: 'ProgramList', query: { notFound: 'true' } });
    },
  },
});
</script>

<style lang="scss" scoped>
@layer components {
  .card-program {
    @apply w-72 rounded-2xl border-t border-gray-100 shadow-lg transition-shadow;

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
      @apply font-bold text-xl text-primary line-clamp-1;
    }

    &__description {
      @apply pt-1.5 text-sm text-secondary line-clamp-3;
    }
  }
}
</style>
