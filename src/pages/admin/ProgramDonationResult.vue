<template>
  <q-page class="program-donation-result bg-blue-50 flex">
    <q-scroll-area class="self-stretch w-full px-4 py-6">
      <div class=" flex flex-col gap-y-4">
        <div class="px-6 flex justify-between">
          <q-input
            v-model="search"
            label="Cari donatur disini..."
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
import { defineComponent, computed } from '@vue/composition-api';
import useGuardAuth from 'src/composables/useGuardAuth';
import useCollectionPaginated from 'src/composables/useCollectionPaginated';
import firestoreCollection, { modelToObject } from 'src/firestoreCollection';
import type fb from 'firebase';
import type { qComponent } from 'src/models';
import type { ModelInObject, Model } from 'shared/types/model';
import type { Donation } from 'shared/types/modelData';

const columns = [
  {
    label: 'Nama donatur',
    required: true,
    name: 'donaturName',
    align: 'left',
    field: (row) => row._ui.donatorName.value.data,
    sortable: true,
  },
  {
    label: 'Besaran',
    required: true,
    name: 'amount',
    align: 'left',
    field: (row) => row.amount,
    sortable: true,
  },
  {
    label: 'Tanggal donasi',
    required: true,
    name: 'time',
    align: 'right',
    field: (row) => row._created,
    format: (val) => (val as fb.firestore.Timestamp).toDate().toLocaleString(),
    sortable: true,
  },
] as qComponent.ColumnDefinition<ModelInObject<Model<Donation>>>[];

export default defineComponent({
  name: 'PageAdminProgramDonationResult',
  setup(props, { root }) {
    useGuardAuth();

    const programURL = computed(() => root.$route.params.programURL);
    const programRef = computed(() => firestoreCollection.Programs.doc(programURL.value));
    const collectionRef = computed(() => firestoreCollection.Donations(programRef.value));
    const [
      { data },
      { isLoading },
    ] = useCollectionPaginated(collectionRef, {
      orderBy: '_created',
      perPage: 20,
      mapper: modelToObject,
    });

    return {
      data,
      isDataLoading: isLoading,
      columns,
    };
  },
  data() {
    return {
      search: '',
      selection: [],
    };
  },
});
</script>

<style lang="scss">

@layer components {
  .program-donation-result {
    thead tr th {
      @apply sticky top-0 z-10;
    }

    .q-responsive {
      max-height: 70vh;
    }
  }
}</style>
