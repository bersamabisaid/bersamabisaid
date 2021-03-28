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
          <q-btn
            label="Tambah program"
            icon="add"
            flat
            rounded
            class="bg-blue-100 text-dark"
            :to="{name: $route.query.donation ? 'AdminEventAddDonation' : 'AdminEventAdd'}"
          />
        </div>

        <q-responsive
          :ratio="16/7"
          class="w-full"
        >
          <q-table
            :columns="columns"
            :data="data"
            row-key="title"
            :filter="search"
            :pagination="{rowsPerPage: 20}"
            selection="multiple"
            :selected.sync="selection"
            class="bg-info text-white"
            card-class="w-full rounded-xl shadow-md"
            table-header-class="sticky bg-info text-white"
            table-class="bg-white text-dark"
            bordered
          />
        </q-responsive>
      </div>
    </q-scroll-area>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import fbs from 'src/services/firebaseService';
import type { QTable } from 'quasar';
import type fb from 'firebase';
import type { Event } from 'shared/types/modelData';
import type { Model } from 'shared/types/model';

type ColumnDefinition<T = Record<string, unknown>> = Omit<
  NonNullable<QTable['columns']>[number],
  'field' | 'format' | 'sort' | 'name' | 'align'
> & {
  name: keyof T;
  field: ((row: T) => string) | keyof T;
  format?: (val: T[keyof T], row: T) => string;
  sort?: (a: T[keyof T], b: T[keyof T], rowA: T, rowB: T) => number;
  align?: 'left' | 'center' | 'right';
}

export default defineComponent({
  name: 'PageAdminEventIndex',
  data() {
    return {
      search: '',
      selection: [],

      columns: [
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
          field: 'Bersamabisa.ID',
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
      ] as ColumnDefinition<Model<Event>>[],
      data: Array.from(Array(10), (el, i) => ({
        title: `Uyghur ${i}`,
        image: 'https://picsum.photos/200',
        _created: fbs.firestore.Timestamp.now(),
        _updated: fbs.firestore.Timestamp.now(),
      } as Model<Event>)),
    };
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
