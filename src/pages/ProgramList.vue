<template>
  <q-page
    padding
    class="min-h-screen"
  >
    <section class="relative flex flex-col sm:flex-row sm:justify-center items-stretch gap-6 sm:gap-12">
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
import {
  defineComponent, computed, watch, ref,
} from '@vue/composition-api';
import CardProgram from 'components/CardProgram.vue';
import firestoreCollection, { modelToObject } from 'src/firestoreCollection';
import { resolveProgramCollectionImage } from 'src/firestoreApis';
import useCollection from 'src/composables/useCollection';
import { StorageFileMetadata } from 'src/composables/useStorage';
import { extractTextFromHTML } from 'shared/utils/dom';
import type { Model, ModelInObject } from 'shared/types/model';
import type { Program } from 'shared/types/modelData';

interface IProgramData extends Omit<ModelInObject<Model<Program>>, 'image'> {
  image: {
    URL: string;
    metadata: StorageFileMetadata;
  }
}

export default defineComponent({
  name: 'PageProgramList',
  setup(props, { root }) {
    const isDonation = computed(() => root.$route.query.category === 'donasi');
    const query = computed(() => (isDonation.value
      ? firestoreCollection.Programs.where('donation', '==', true)
      : firestoreCollection.Programs).limit(10));
    const [programs, isDataLoading] = useCollection(query, { mapper: modelToObject });
    const programData = ref<IProgramData[]>([]);

    watch(programs, async () => {
      programData.value = await resolveProgramCollectionImage(programs.value);
    });

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
  components: {
    CardProgram,
  },
});
</script>
