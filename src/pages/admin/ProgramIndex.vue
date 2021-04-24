<template>
  <q-page class="program-index bg-blue-50 flex">
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
              :to="{name: donation ? 'AdminProgramAddDonation' : 'AdminProgramAdd'}"
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
              <q-td
                class="group"
                :props="props"
              >
                <div class="flex items-center">
                  <!-- eslint-disable max-len -->
                  <router-link
                    class="cursor-pointer max-w-sm font-semibold text-sm text-primary truncate border-b-0 border-primary transition-all flex items-center gap-x-1 group-hover:border-b-2"
                    :to="{
                      name: 'Program',
                      params: {programURL: props.row.URL}
                    }"
                    target="_blank"
                  >
                    <span>{{ props.value }}</span>
                    <q-icon
                      :name="roundOpenInNew"
                      class="opacity-0 font-medium text-xs text-primary transition-opacity group-hover:opacity-100"
                    />
                  </router-link>
                  <q-btn
                    label="Edit"
                    :icon="roundEdit"
                    :to="{
                      name: donation ? 'AdminProgramDonationEdit' : 'AdminProgramEdit',
                      params: {programURL: props.row._uid}
                    }"
                    flat
                    no-caps
                    size="sm"
                    class="opacity-0 ml-3 bg-opacity-80 font-medium text-blue-500 transition-opacity group-hover:opacity-100"
                  />
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
import { roundOpenInNew, roundEdit } from '@quasar/extras/material-icons-round';
import firestoreCollection from 'src/firestoreCollection';
import useCollection from 'src/composables/useCollection';
import { notifyError } from 'src/composables/useNotification';
import type { QTable } from 'quasar';
import type fb from 'firebase';
import type { Program, ProgramDonation } from 'shared/types/modelData';
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
] as ColumnDefinition<Model<Program>>[];

const donationPageColumnDefinition = [
  {
    label: 'Presentase Ketercapaian',
    name: 'achieved',
    align: 'right',
    // use optional chaining to handle transition between column definition
    field: (row) => `${row?._ui?.progress.value || 0}%`,
    sortable: true,
  },
] as ColumnDefinition<Model<ProgramDonation>>[];

export default defineComponent({
  name: 'PageAdminProgramIndex',
  props: {
    donation: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const dbRef = computed(() => firestoreCollection.Programs.where('donation', '==', props.donation));
    const [data, isDataLoading, error] = useCollection(dbRef);
    const columnDefinition = computed(() => (props.donation
      ? [...baseColumnDefinition, ...donationPageColumnDefinition]
      : baseColumnDefinition));

    watch(error, () => error && notifyError(error));

    return {
      data,
      isDataLoading,
      columns: columnDefinition,

      roundOpenInNew,
      roundEdit,
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
  .program-index {
    thead tr th {
      @apply sticky top-0 z-10;
    }

    .q-responsive {
      max-height: 70vh;
    }
  }
}
</style>