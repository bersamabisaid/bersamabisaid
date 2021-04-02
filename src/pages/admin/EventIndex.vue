<template>
  <q-page class="event-index bg-blue-50 flex">
    <q-scroll-area class="self-stretch w-full px-4 py-6">
      <div class=" flex flex-col gap-y-4">
        <div class="px-6 flex justify-between">
          <q-input
            v-model="search"
            label="Cari program"
            dense
            clearable
          >
            <template #append>
              <q-btn
                icon="search"
                flat
                round
              />
            </template>
          </q-input>

          <transition-group
            appear
            enter-active-class="animated fadeIn"
            leave-active-class="animated fadeOut"
            class="flex gap-x-2"
          >
            <template v-if="selection.length">
              <q-btn
                key="Hapus program"
                label="Hapus program"
                icon="delete"
                flat
                rounded
                class="bg-red-100 text-dark"
                @click="deleteSelected"
              />
            </template>

            <q-btn
              key="Tambah program"
              label="Tambah program"
              icon="add"
              :to="{name: $route.query.donation ? 'AdminEventAddDonation' : 'AdminEventAdd'}"
              flat
              rounded
              class="bg-green-100 text-dark"
            />
          </transition-group>
        </div>

        <q-responsive
          :ratio="16/7"
          class="w-full"
        >
          <q-table
            :columns="columns"
            :data="data"
            row-key="title"
            :loading="isDataLoading"
            :filter="search"
            :pagination="{rowsPerPage: 20}"
            selection="multiple"
            :selected.sync="selection"
            class="bg-info text-white"
            card-class="w-full rounded-xl shadow-md"
            table-header-class="sticky bg-info text-white"
            table-class="bg-white text-dark"
            bordered
          >
            <template #body-cell-title="props">
              <q-td :props="props">
                <div class="group flex items-center">
                  <!-- eslint-disable max-len -->
                  <router-link
                    class="cursor-pointer max-w-sm font-semibold text-sm text-primary truncate border-b-0 border-primary transition-all group-hover:border-b-2"
                    :to="{name: 'AdminEventEdit', params: {programURL: props.row.url}}"
                  >
                    {{ props.value }}
                  </router-link>
                  <span class="opacity-0 ml-3 font-medium text-xs text-primary text-opacity-60 tracking-tight transition-opacity group-hover:opacity-100">
                    Lihat detail/Edit
                  </span>
                  <!-- eslint-enable max-len -->
                </div>
              </q-td>
            </template>

            <template #loading>
              <q-inner-loading showing>
                <div class="flex flex-col items-center gap-y-3">
                  <q-spinner
                    size="lg"
                    color="accent"
                  />
                  <span>Loading data...</span>
                </div>
              </q-inner-loading>
            </template>
          </q-table>
        </q-responsive>
      </div>
    </q-scroll-area>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, watch, computed } from '@vue/composition-api';
import firestoreCollection from 'src/firestoreCollection';
import useCollection from 'src/composables/useCollection';
import { notifyError } from 'src/composables/useNotification';
import type { QTable } from 'quasar';
import type fb from 'firebase';
import type { Event, EventDonation } from 'shared/types/modelData';
import type { Model } from 'shared/types/model';

type ColumnDefinition<T = Record<string, unknown>> = Omit<
  NonNullable<QTable['columns']>[number],
  'field' | 'format' | 'sort' | 'name' | 'align'
> & {
  name: keyof T | string;
  field: ((row: T) => string) | keyof T;
  format?: (val: T[keyof T], row: T) => string;
  sort?: (a: T[keyof T], b: T[keyof T], rowA: T, rowB: T) => number;
  align?: 'left' | 'center' | 'right';
}

const baseColumnDefinition = [
  {
    label: 'Nama Program',
    required: true,
    name: 'title',
    align: 'left',
    field: (row) => row.title,
    sortable: true,
  },
  {
    label: 'Penyelenggara',
    name: 'organizer',
    align: 'left',
    field: (row) => row.organizer,
    sortable: true,
  },
  {
    label: 'Ditambahkan pada',
    name: '_created',
    align: 'left',
    field: (row) => row._created,
    format: (val) => (val as fb.firestore.Timestamp).toDate().toLocaleString(),
    sortable: true,
  },
  {
    label: 'Terakhir diperbarui pada',
    name: '_updated',
    align: 'left',
    field: (row) => row._updated,
    format: (val) => (val as fb.firestore.Timestamp).toDate().toLocaleString(),
    sortable: true,
  },
] as ColumnDefinition<Model<Event>>[];

const donationPageColumnDefinition = [
  {
    label: 'Presentase Ketercapaian',
    name: 'achieved',
    align: 'right',
    // use optional chaining to handle transition between column definition
    field: (row) => `${row?._ui?.progress.value || 0}%`,
    sortable: true,
  },
] as ColumnDefinition<Model<EventDonation>>[];

export default defineComponent({
  name: 'PageAdminEventIndex',
  props: {
    donation: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const dbRef = computed(() => firestoreCollection.Events.where('donation', '==', props.donation));
    const [data, isDataLoading, error] = useCollection(dbRef);
    const columnDefinition = computed(() => (props.donation
      ? [...baseColumnDefinition, ...donationPageColumnDefinition]
      : baseColumnDefinition));

    watch(error, () => error && notifyError(error));

    return {
      data,
      isDataLoading,
      columns: columnDefinition,
    };
  },
  data() {
    return {
      search: '',
      selection: [],
    };
  },
  methods: {
    deleteSelected() {
      console.log(this.selection);
    },
  },
});
</script>

<style lang="scss">
@layer components {
  .event-index {
    thead tr th {
      @apply sticky top-0 z-10;
    }

    .q-responsive {
      max-height: 70vh;
    }
  }
}
</style>
