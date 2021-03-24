<template>
  <q-btn
    flat
    rounded
    class="text-white"
  >
    {{ caption }}
  </q-btn>
</template>

<script>
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'TheNavbar',
  props: {
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
