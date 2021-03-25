<template>
  <q-page padding>
    <section class="flex flex-col sm:flex-row sm:justify-center items-center gap-6 sm:gap-12">
      <card-program
        v-for="i in 10"
        :key="i"
        title="Card title"
        caption="lorem ipsum dolor sit amet"
      />
    </section>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import CardProgram from 'components/CardProgram.vue';

export default defineComponent({
  name: 'PageEvent',
  components: {
    CardProgram,
  },
});
</script>
