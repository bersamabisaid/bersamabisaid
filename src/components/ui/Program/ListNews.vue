<template>
  <article>
    <q-timeline color="secondary">
      <template v-if="loading">
        <q-timeline-entry
          v-for="i in 3"
          :key="i"
        >
          <div class="flex gap-x-3">
            <q-skeleton
              type="rect"
              class="w-20 h-20"
            />
            <div class="flex-grow flex flex-col">
              <q-skeleton type="rect" />
              <q-skeleton type="text" />
              <q-skeleton
                type="text"
                class="max-w-xs"
              />
            </div>
          </div>
        </q-timeline-entry>
      </template>

      <template v-else>
        <template v-if="data.length">
          <q-timeline-entry
            v-for="(el, i) in data"
            :key="`${i}-${el.title}`"
            :title="el.title"
            :subtitle="el.timestamp.toDate().toLocaleString()"
          >
            <ItemNews v-bind="el" />
          </q-timeline-entry>
        </template>

        <div
          v-else
          class="p-4 bg-white text-center text-blue-gray-800 rounded-xl"
        >
          Tidak ada berita untuk program ini
        </div>
      </template>
    </q-timeline>
  </article>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import ItemNews from 'components/ui/Program/ItemNews.vue';
import type { ProgramNews } from 'shared/types/schema';

export default defineComponent({
  name: 'NewsList',
  components: {
    ItemNews,
  },
  props: {
    data: {
      type: Array as PropType<ProgramNews[]>,
      required: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
});
</script>
