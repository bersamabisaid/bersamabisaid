<template>
  <div class="flex">
    <q-img
      v-if="imgUrl"
      :src="imgUrl"
      :alt="title"
      class="w-20 h-20 rounded-lg"
    >
      <template #loading>
        <q-skeleton class="w-full h-full" />
      </template>
    </q-img>
    <p class="px-3 py-1 text-sm text-blue-gray-600">
      {{ desc }}
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'NewsItem',
  props: {
    title: {
      type: String,
      default: '',
    },
    imgUrl: {
      type: String,
      default: '',
    },
    desc: {
      type: String,
      default: '',
    },
  },
});
</script>
