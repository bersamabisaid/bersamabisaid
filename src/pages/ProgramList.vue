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
import { defineComponent, ref } from 'vue';
import CardProgram from 'components/CardProgram.vue';
import { extractTextFromHTML } from 'shared/utils/browser/dom';
import type { Model, ModelInObject } from 'shared/types/model';
import type { Program } from 'shared/types/schema';
import type { Storage } from 'shared/types/firebase';

interface IProgramData extends Omit<ModelInObject<Model<Program>>, 'image'> {
  image: {
    URL: string;
    metadata: Storage.metadata;
  }
}

export default defineComponent({
  name: 'PageProgramList',
  components: {
    CardProgram,
  },
  setup() {
    const programData = ref<IProgramData[]>([]);

    return {
      programData,
      isDataLoading: ref(true),
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
