<template>
  <div class="max-w-xs mx-auto bg-white rounded-lg shadow-lg dark:bg-gray-800 mt-20">
    <div class="flex justify-center -mt-16 md:justify-end">
      <q-icon
        class="object-cover w-20 h-20 border-2 border-black rounded-full dark:border-indigo-400"
        :name="icon"
        size="lg"
      />
    </div>
    <div class="px-4 py-2">
      <h1 class="text-3xl font-bold text-gray-800 uppercase dark:text-white">
        {{ title }}
      </h1>
    </div>

    <div class="px-4 py-2">
      <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
        {{ description }}
      </p>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'CardTeam',
  props: {
    title: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      default: 'print',
    },
  },
});
</script>
