<template>
  <q-page
    padding
    class="min-h-screen"
  >
    <section class="relative flex flex-col sm:flex-row sm:justify-center items-stretch gap-6 sm:gap-12">
      <card-program
        v-for="(el, i) in eventData"
        :key="`${i}-${el.title}`"
        :title="el.title"
        :caption="extractTextFromHTML(el.description)"
        :img-url="el.image.URL"
        :url="el.URL"
        v-bind="el"
        action-label="Lihat detail"
      />
    </section>

    <q-inner-loading :showing="isDataLoading" />
  </q-page>
</template>

<script lang="ts">
import {
  defineComponent, computed, watch, ref,
} from '@vue/composition-api';
import CardProgram from 'components/CardProgram.vue';
import firestoreCollection from 'src/firestoreCollection';
import useCollection from 'src/composables/useCollection';
import { extractTextFromHTML } from 'shared/utils/dom';
import { getStorageFile, StorageFileMetadata } from 'src/composables/useStorage';
import { storageRef } from 'src/services/firebaseService';
import { Model } from 'shared/types/model';
import { Event } from 'shared/types/modelData';

interface IEventData extends Omit<Model<Event>, 'image'> {
  image: {
    URL: string;
    metadata: StorageFileMetadata;
  }
}

export default defineComponent({
  name: 'PageEventList',
  setup(props, { root }) {
    const isDonation = computed(() => root.$route.query.category === 'donasi');
    const query = computed(() => (isDonation.value
      ? firestoreCollection.Events.where('donation', '==', true)
      : firestoreCollection.Events));
    const [events, isDataLoading] = useCollection(query);
    const eventData = ref<IEventData[]>([]);

    watch(events, async () => {
      eventData.value = await Promise.all(
        events.value.map(async ({ image, ...event }) => ({
          ...event,
          image: await getStorageFile(storageRef.root.child(image)),
        })),
      ) as typeof eventData['value'];
    });

    return {
      eventData,
      isDataLoading,
      extractTextFromHTML,
    };
  },
  components: {
    CardProgram,
  },
});
</script>
