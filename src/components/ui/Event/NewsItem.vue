<template functional>
  <div class="flex">
    <q-img
      v-if="props.imgURL"
      :src="props.imgURL"
      :alt="props.title"
      class="w-20 h-20 rounded-lg"
    />
    <p class="px-3 py-1 text-sm text-blue-gray-600">
      {{ props.description }}
    </p>
  </div>
</template>
