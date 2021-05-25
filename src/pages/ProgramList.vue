<template>
  <q-page
    padding
    class="min-h-screen"
  >
    <section class="relative flex flex-col sm:flex-row sm:justify-center content-center items-stretch gap-6 sm:gap-12">
      <card-program
        v-for="(el, i) in programData"
        :key="`${i}-${el.title}`"
        :title="el.title"
        :caption="extractTextFromHTML(el.description)"
        :img-url="el.image.URL"
        :url="el.URL"
        v-bind="el"
        :action-label="el.donation ? 'Donasi sekarang' : 'Selengkapnya'"
      />
    </section>

    <q-inner-loading :showing="isDataLoading" />
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CardProgram from 'components/CardProgram.vue';
import useCollection from 'composables/useCollection';
import { firestoreClient, storageClient } from 'src/firebaseClientService';
import { extractTextFromHTML } from 'shared/utils/browser/dom';
import { getStorageFile } from 'shared/firebase/storageClient';

export default defineComponent({
  name: 'PageProgramList',
  components: {
    CardProgram,
  },
  setup() {
    const [programData, isDataLoading] = useCollection(
      firestoreClient.collections.Programs
        .where('_deleted', '==', null)
        .orderBy('orderPriority', 'desc'),
      {
        async mapper(snapshot) {
          const { image, ...data } = firestoreClient.utils.modelToObject(snapshot);

          return {
            ...data,
            image: await getStorageFile(storageClient.storage.ref(image)),
          };
        },
      },
    );

    return {
      programData,
      isDataLoading,
      extractTextFromHTML,
    };
  },
  meta() {
    return {
      title: 'Daftar Program BersamaBisa.ID',
    };
  },
});
</script>
