<template>
  <q-card class="card-program">
    <q-card-section tag="article">
      <div class="card-program__img-container">
        <q-responsive
          v-if="loading"
          :ratio="4/3"
        >
          <q-skeleton class="w-full h-full rounded-xl" />
        </q-responsive>

        <q-img
          v-else
          :src="imgUrl"
          class="card-program__img"
          :ratio="4/3"
        />
      </div>

      <div class="px-2 pt-6 flex flex-col items-start">
        <q-skeleton
          v-if="loading"
          class="w-4/5 h-5 rounded-lg"
        />
        <dt
          v-else
          class="card-program__title"
        >
          <router-link
            :to="toLocation"
            target="_blank"
          >
            {{ title }}
          </router-link>
        </dt>

        <div
          v-if="loading"
          class="mt-2 w-full"
        >
          <q-skeleton
            type="text"
            class="w-full rounded-lg"
          />
          <q-skeleton
            type="text"
            class="w-3/5 rounded-lg"
          />
        </div>

        <dd
          v-else
          class="card-program__description"
        >
          {{ caption }}
        </dd>
      </div>
    </q-card-section>

    <q-card-actions
      v-if="!noAction"
      align="right"
      class="px-6 pt-1 pb-6"
    >
      <q-btn
        :label="actionLabel"
        :to="toLocation"
        no-caps
        unelevated
        class="px-5 py-1 bg-positive text-white capitalize ring-1 ring-inset ring-gray-200 rounded-lg shadow"
      />
    </q-card-actions>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import defaultImage from 'assets/logo/Bbid-logo-only.png';
import type { RouteLocationRaw } from 'vue-router';

export type CardProgramProps = {
  title: string;
  caption: string;
  actionLabel?: string;
  imgUrl?: string;
  loading?: boolean;
} & (
  { url: string }
  | { to: RouteLocationRaw }
)

export default defineComponent({
  name: 'ProgramCard',
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
      type: [String, Object] as PropType<RouteLocationRaw>,
      default: '',
    },
    imgUrl: {
      type: String,
      default: defaultImage,
    },
    noAction: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    toLocation(): RouteLocationRaw {
      // it means prior to 'to' property
      return this.to || this.url;
      // return this.to
      //   || (this.url
      //     ? { name: 'Program', params: { programURL: this.url } }
      //     : { name: 'ProgramList', query: { notFound: 'true' } });
    },
  },
});
</script>

<style lang="scss" scoped>
.card-program {
  @apply w-72 rounded-2xl border-t border-gray-100 shadow-lg flex flex-col transition-shadow;

  &:hover {
    @apply shadow-2xl;
  }

  &__img-container {
    @apply relative w-full;
  }

  &__img {
    @apply w-full h-full bg-blue-gray-200 rounded-2xl;
  }

  &__title {
    @apply mb-1 cursor-pointer relative font-bold text-lg text-primary line-clamp-2 leading-tight;

    &:hover {
      @apply underline;
    }
  }

  &__description {
    @apply flex-grow pt-1.5 text-sm text-secondary line-clamp-3;
    min-height: calc(theme('padding[1.5]') + theme('height.5') * 3);
  }

  .q-card {
    &__section {
      @apply flex-grow;
    }
  }
}
</style>
