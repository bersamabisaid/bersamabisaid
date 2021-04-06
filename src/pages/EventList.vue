<template>
  <q-page
    padding
    class="min-h-screen"
  >
    <section class="relative flex flex-col sm:flex-row sm:justify-center items-stretch gap-6 sm:gap-12">
      <card-program
        v-for="(el, i) in events"
        :key="`${i}-${el.title}`"
        :title="el.title"
        :caption="extractTextFromHTML(el.description)"
        :url="el.URL"
        v-bind="el"
        action-label="Lihat detail"
      />
    </section>

    <q-inner-loading :showing="isDataLoading" />
  </q-page>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api';
import CardProgram from 'components/CardProgram.vue';
import firestoreCollection from 'src/firestoreCollection';
import useCollection from 'src/composables/useCollection';

const extractTextFromHTML = (input: string | HTMLElement) => {
  const isElement = input instanceof HTMLElement;
  const vElement = isElement ? (input as HTMLElement) : document.createElement('div');

  if (!isElement) {
    vElement.innerHTML = input as string;
  }

  return vElement.textContent;
};

export default defineComponent({
  name: 'PageEventList',
  setup(props, { root }) {
    const isDonation = computed(() => root.$route.query.category === 'donasi');
    const query = computed(() => (isDonation.value
      ? firestoreCollection.Events.where('donation', '==', true)
      : firestoreCollection.Events));
    const [events, isDataLoading] = useCollection(query);

    return {
      events,
      isDataLoading,
      extractTextFromHTML,
    };
  },
  components: {
    CardProgram,
  },
});
</script>
